<?php

$hostname = "localhost:3308";
$username = "root";
$password = "maria3809";
$db = "simondice";

$dbconnect=mysqli_connect($hostname,$username,$password,$db);

if ($dbconnect->connect_error) {
  die("Database connection failed: " . $dbconnect->connect_error);
}