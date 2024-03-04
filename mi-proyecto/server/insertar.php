<?php

include 'includes/db.php'; // Incluye el archivo de conexión a la base de datos

// Verifica si se recibieron datos por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtén los datos del formulario
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Consulta SQL para insertar el usuario en la base de datos
    $sql = "INSERT INTO test (nombre, pass) VALUES ('$username', '$password')";

    // Ejecuta la consulta
    if ($conexion->query($sql) === TRUE) {
        echo "Registro exitoso";
    } else {
        echo "Error: " . $sql . "<br>" . $conexion->error;
    }
}

// Cierra la conexión a la base de datos
$conexion->close();

?>
