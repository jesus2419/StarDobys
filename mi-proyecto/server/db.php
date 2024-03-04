<?php

// Configuración de la conexión a la base de datos
$host = "localhost"; // Cambia esto si tu base de datos no está en localhost
$usuario = "root"; // Usuario de la base de datos
$password = ""; // Contraseña de la base de datos (en XAMPP por defecto no tiene contraseña)
$base_datos = "stardobys"; // Nombre de tu base de datos

// Conexión a la base de datos
$conexion = new mysqli($host, $usuario, $password, $base_datos);

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

?>
