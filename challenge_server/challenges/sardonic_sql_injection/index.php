<?php
error_reporting(0);
function get_username_taken() {
	if ($_SERVER["REQUEST_METHOD"] !== "POST") {
		return;
	}

	if (!isset($_POST["username"]) || empty($_POST["username"])) {
		return;
	}

	$username = $_POST["username"];
	try {
		$db = new SQLite3("./database.db");
		$res = $db->query("SELECT * FROM usernames WHERE username='".$username."';");
		$rows = $res->fetchArray(SQLITE3_ASSOC);
		$numRows = $rows ? count($rows): 0;

		return $numRows > 0 ? "Username is already taken": "Username is not taken";
	} catch (Exception $e) {
		return;
	} catch (\Throwable $th) {
		return;
	}
}
?>

<html lang="en">
	<head>
		<title>Username availability checker</title>
		<link rel="stylesheet" href="style.css">
	</head>
	<body>
		<div class="container">
			
			<form class="form-box" action="" method="POST">
				<h1 class="form-title">Check username availability</h1>
				<label for="username">Enter username</label>
				<input type="text" id="username" name="username" />
				<input type="submit" />
				<?=get_username_taken();?>
			</form>
		</div>
	</body>
</html>
