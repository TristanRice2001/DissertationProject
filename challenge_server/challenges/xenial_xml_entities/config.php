<?php
function get_database() {
	$db = new SQLite3("database.db");
	return $db;
}
?>
