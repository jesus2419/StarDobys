DELIMITER //

CREATE PROCEDURE InsertarGrupo(
    IN p_Nombre VARCHAR(50),
    IN p_Categoria_ID INT,
    IN p_UsuarioCreador_ID INT,
    IN p_Descripcion VARCHAR(150),
    IN p_Foto LONGTEXT
)
BEGIN
    INSERT INTO Grupo (Nombre, Categoria_ID, UsuarioCreador_ID, Descripción, Fecha_de_creación, Foto, Estado)
    VALUES (p_Nombre, p_Categoria_ID, p_UsuarioCreador_ID, p_Descripcion, NOW(), p_Foto, TRUE);
END //

DELIMITER ;
