<?php

require "mariadbconnect.php";

//if ($_SERVER["REQUEST_METHOD"] == "POST") {
if (isset($_GET["na"]) && isset($_GET["le"]) && isset($_GET["pu"])) {

    $name = $_GET['na'];
    $rating = $_GET['pu'];
    $level = $_GET['le'];

    $query = "INSERT INTO puntaje (nombre, puntaje, nivel)
    VALUES ('$name', '$rating', '$level')";

    if (!mysqli_query($dbconnect, $query)) {
        die('Ha ocurrido un error. No se ha registrado el puntaje.');
    } else {
        echo "Puntaje Registrado.";
    }

    $result = mysqli_query($dbconnect, "SELECT * FROM simondice");

    echo "<table border='1'>
<tr>
<th>Nombre</th>
<th>Puntaje</th>
<th>Nivel</th>
</tr>";

    while ($row = mysqli_fetch_array($result)) {
        echo "<tr>";
        echo "<td>" . $row['nombre'] . "</td>";
        echo "<td>" . $row['puntaje'] . "</td>";
        echo "<td>" . $row['nivel'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";

    mysqli_close($con);

}
