<?php
// The flag is X3n14l_xml_entiti3s
function get_database() {
	$db = new SQLite3("database.db");
	return $db;
}
?>
