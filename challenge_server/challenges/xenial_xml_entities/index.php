<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ E_DEPRECATED);

include("config.php");

$success_msg = null;
$error_msg = null;
function get_blog_posts($limit=10) {
	$db = get_database();
	$stmt = $db->prepare("SELECT id, title FROM posts ORDER BY id DESC LIMIT :limit");
	$stmt->bindValue(":limit", $limit, SQLITE3_INTEGER);
	$result = $stmt->execute();
	
	return $result;
}

function make_blog_post($title, $content) {
	$db = get_database();
	$stmt = $db->prepare("INSERT INTO posts (title, content) VALUES (:title, :content)");
	$stmt->bindValue(":title", $title, SQLITE3_TEXT);
	$stmt->bindValue(":content", $content, SQLITE3_TEXT);
	$result = $stmt->execute();
}

function parse_xml($xml) {
	return simplexml_load_string($xml, "SimpleXMLElement", LIBXML_DTDLOAD | LIBXML_NOENT);
}

if (isset($_POST["xml_data"])) {
	libxml_disable_entity_loader(false);
	$xml = $_POST["xml_data"];
	$data = (array) parse_xml($xml);
	if (!$data || !array_key_exists("title", $data) || empty($data["title"]) || !array_key_exists("content", $data) || empty($data["content"])) {
		$error_msg = "Incorrect XML";	
	} else {
		make_blog_post($data["title"], $data["content"]);
		$success_msg = "Blog posted successfully";
	}

}
$recent_posts = get_blog_posts();
?>

<html lang="en">
	<head>
		<title>Xenial blog</title>
		<link rel="stylesheet" href="style.css">
	</head>
	<body>
	<div class="container">
	<p class="error-msg"><?=$error_msg; ?></p>
	<p class="success-msg"><?=$success_msg; ?></p>
	<form id="form" method="POST">
		<label for="title">Title</label>
		<input type="text" name="title" id="title" />
		<label for="content">Content</label>
		<textarea rows=6 cols=50 type="text" name="content" id="content"></textarea>
		
		<input type="submit" />
		<input type="hidden" name="xml_data" id="xml-data" />
	</form>
	<div class="recent-posts">
	<h1>Recent blog posts</h1>
	<?php
		while ($arr = $recent_posts->fetchArray(SQLITE3_ASSOC)) {
			?><a href="/blog.php?id=<?=$arr["id"]?>"><?=$arr["title"]?></a>
	<?php } ?>
	
	</div>
	</div>
	</body>
	<script>
		function onSubmit(e) {
			e.preventDefault();
			const title = document.getElementById("title").value;
			const content = document.getElementById("content").value;
			console.log("here");		
			const data = `<blogPost><title>${title}</title><content>${content}</content></blogPost>`;
			console.log(data);
			document.getElementById("xml-data").value = data;
			document.forms[0].submit();
		}

		document.getElementById("form").addEventListener("submit", onSubmit);
	</script>
</html>
