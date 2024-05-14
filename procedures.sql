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


DELIMITER //

CREATE PROCEDURE CrearGrupoYAgregarMiembro(
    IN nombre_grupo VARCHAR(50),
    IN categoria_id INT,
    IN usuario_creador_id INT,
    IN descripcion VARCHAR(150),
    IN foto LONGTEXT
)
BEGIN
    -- Insertar en la tabla Grupo
    INSERT INTO Grupo (Nombre, Categoria_ID, UsuarioCreador_ID, Descripción, Fecha_de_creación, Foto, Estado)
    VALUES (nombre_grupo, categoria_id, usuario_creador_id, descripcion, NOW(), foto, TRUE);
    
    -- Obtener el ID del grupo insertado
    SET @nuevo_grupo_id = LAST_INSERT_ID();

    -- Insertar al usuario creador en la tabla Miembros_grupo
    INSERT INTO Miembros_grupo (Grupo_ID, Usuario_ID, Fecha_agregado, Estado)
    VALUES (@nuevo_grupo_id, usuario_creador_id, NOW(), TRUE);
END //

DELIMITER ;

 SELECT 
        Grupo.ID,
        Grupo.Categoria_ID,
        Grupo.Nombre AS NombreGrupo,
        Categoria.Nombre AS NombreCategoria,
        Usuarios.nomU AS NombreUsuarioCreador,
        Usuarios.base64 as Fotousuario,
        Grupo.Descripción,
        Grupo.Fecha_de_creación,
        Grupo.Foto,
        Grupo.Estado
    FROM 
        Grupo
    JOIN
        Categoria ON Grupo.Categoria_ID = Categoria.ID
    JOIN
        Usuarios ON Grupo.UsuarioCreador_ID = Usuarios.ID

