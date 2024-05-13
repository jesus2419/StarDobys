-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-03-2024 a las 08:23:38
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dobby`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nomU` varchar(30) DEFAULT NULL,
  `emU` varchar(50) DEFAULT NULL,
  `passwU` varchar(15) DEFAULT NULL,
  `nomCompleto` varchar(70) DEFAULT NULL,
  `rol` enum('Usuario','Administrador','Superadministrador') DEFAULT 'Usuario',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nomU`, `emU`, `passwU`, `nomCompleto`, `rol`, `fecha_creacion`, `estado`) VALUES
(1, 'Nick', 'Vxi@gmail.com', 'P@ssw0rd', 'Klaus Cebrian', 'Usuario', '2024-03-03 06:24:14', 1),
(2, 'Lina', 'PTLina@gmail.com', 'P@ssw0rd', 'Lina Parras Torres', 'Usuario', '2024-03-03 06:24:41', 1),
(3, '3rika', 'Erika@gmail.com', 'P@ssw0rd', 'Erika Patricia ', 'Usuario', '2024-03-03 07:04:14', 1),
(4, 'Alex', 'Carma@gmail.com', 'P@ssw0rd', 'Alejandro Carmona', 'Usuario', '2024-03-03 07:17:34', 1),
(5, 'Ludy', 'LudTG@gmail.com', 'P@ssw0rd', 'Ludres Torres Garza', 'Usuario', '2024-03-03 07:21:24', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
