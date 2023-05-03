<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ E_DEPRECATED);

if (!isset($_GET["id"])) {
	header("Location: /");
	die();
}

include("config.php");

$db = get_database();
$stmt = $db->prepare("SELECT * FROM posts WHERE id=:id");
$stmt->bindValue(":id", $_GET["id"], SQLITE3_INTEGER);
$result = $stmt->execute();
?>
<html lang="en">
	<head>
		<title>Blog Post</title>
		<link rel="stylesheet" href="style.css">
	</head>

	<body>
		<div class="container">
		<?php
			while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
				echo "<h1>".$row["title"]."</h1>";
				echo "<p>".$row["content"]."</p>";
			}
?>
</div>
	</body>
</html>
