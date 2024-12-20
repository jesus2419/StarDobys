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


DELIMITER //

CREATE PROCEDURE UpdateGrupo(
    IN p_grupoID INT,
    IN p_nombre VARCHAR(50),
    IN p_categoriaID INT,
    IN p_descripcion VARCHAR(150),
    IN p_foto LONGTEXT
)
BEGIN
    UPDATE Grupo
    SET 
        Nombre = p_nombre,
        Categoria_ID = p_categoriaID,
        Descripción = p_descripcion,
        Foto = p_foto
    WHERE ID = p_grupoID;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE InsertarMiembroGrupo(
    IN p_Grupo_ID INT,
    IN p_Usuario_ID INT
)
BEGIN
    INSERT INTO Miembros_grupo (Grupo_ID, Usuario_ID, Fecha_agregado, Estado)
    VALUES (p_Grupo_ID, p_Usuario_ID, NOW(), TRUE);
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE EliminarMiembroGrupo(
    IN p_Grupo_ID INT,
    IN p_Usuario_ID INT
)
BEGIN
    DELETE FROM Miembros_grupo 
    WHERE Grupo_ID = p_Grupo_ID AND Usuario_ID = p_Usuario_ID;
END //

DELIMITER ;



DELIMITER //
CREATE PROCEDURE InsertarPublicacion(
    IN p_UsuarioID INT,
    IN p_GrupoID INT,
    IN p_Contenido VARCHAR(255),
    IN p_Foto LONGTEXT,
    IN p_Video LONGTEXT,
    IN p_Audio LONGTEXT
)
BEGIN
    DECLARE v_PublicacionID INT;

    -- Insertar en la tabla de Publicacion
    INSERT INTO Publicacion (Usuario_ID, Grupo_ID, Contenido, Fecha_de_creación, Estado)
    VALUES (p_UsuarioID, p_GrupoID, p_Contenido, NOW(), TRUE);
    
    -- Obtener el ID de la publicación insertada
    SET v_PublicacionID = LAST_INSERT_ID();

    -- Insertar en la tabla de Foto_p si se proporciona una foto
    IF p_Foto IS NOT NULL THEN
        INSERT INTO Foto_p (ID_publicacion, Archivo, Estado)
        VALUES (v_PublicacionID, p_Foto, TRUE);
    END IF;

    -- Insertar en la tabla de Video_p si se proporciona un video
    IF p_Video IS NOT NULL THEN
        INSERT INTO Video_p (ID_publicacion, Archivo, Estado)
        VALUES (v_PublicacionID, p_Video, TRUE);
    END IF;

    -- Insertar en la tabla de Audio_p si se proporciona un audio
    IF p_Audio IS NOT NULL THEN
        INSERT INTO Audio_p (ID_publicacion, Archivo, Estado)
        VALUES (v_PublicacionID, p_Audio, TRUE);
    END IF;
    
END //
DELIMITER ;
CALL InsertarPublicacion(
    40,
    4,
    'valor_p_Contenido',
    'valor_p_Foto',
    'valor_p_Video',
    'valor_p_Audio'
);


DELIMITER //

CREATE PROCEDURE InsertarComentario (
    IN p_ID_publicacion INT,
    IN p_Usuario_ID INT,
    IN p_Contenido VARCHAR(255)
)
BEGIN
    DECLARE p_Fecha_de_creacion DATETIME;
    DECLARE p_Estado BOOLEAN;

    SET p_Fecha_de_creacion = NOW();
    SET p_Estado = TRUE;

    INSERT INTO Comentario (ID_publicacion, Usuario_ID, Contenido, Fecha_de_creación, Estado)
    VALUES (p_ID_publicacion, p_Usuario_ID, p_Contenido, p_Fecha_de_creacion, p_Estado);
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE ModificarUsuario(
    IN p_nomU VARCHAR(50),
    IN p_email VARCHAR(50),
    IN p_base64 LONGTEXT,
    IN p_passwU VARCHAR(15),
    IN p_nombre VARCHAR(50)
)
BEGIN
    DECLARE v_id INT;

    -- Obtener el ID del usuario basado en el nombre de usuario
    SELECT ID INTO v_id FROM Usuarios WHERE nomU = p_nomU;

    IF v_id IS NOT NULL THEN
        -- Comprobar y actualizar el correo electrónico si no es nulo
        IF p_email IS NOT NULL THEN
            UPDATE Usuarios SET emU = p_email WHERE ID = v_id;
        END IF;

        -- Comprobar y actualizar la imagen base64 si no es nula
        IF p_base64 IS NOT NULL THEN
            UPDATE Usuarios SET base64 = p_base64 WHERE ID = v_id;
        END IF;

        -- Comprobar y actualizar la contraseña si no es nula
        IF p_passwU IS NOT NULL THEN
            UPDATE Usuarios SET passwU = p_passwU WHERE ID = v_id;
        END IF;

        -- Comprobar y actualizar el nombre si no es nulo
        IF p_nombre IS NOT NULL THEN
            UPDATE Usuarios SET nomCompleto = p_nombre WHERE ID = v_id;
        END IF;

        -- Confirmar que se ha realizado la actualización
        SELECT 'Usuario actualizado exitosamente' AS mensaje;

    ELSE
        -- El usuario no existe, devolver un mensaje de error
        SELECT 'El usuario no existe' AS mensaje;
    END IF;
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
        Usuarios ON Grupo.UsuarioCreador_ID = Usuarios.ID;


SELECT 
    Miembros_grupo.ID AS MiembroID,
    Miembros_grupo.Grupo_ID,
    Miembros_grupo.Usuario_ID,
    Miembros_grupo.Fecha_agregado,
    Miembros_grupo.Estado AS MiembroEstado,
    Usuarios.nomU AS NombreUsuario,
    Usuarios.base64 AS Base64Usuario,
    Usuarios.Estado AS UsuarioEstado
FROM 
    Miembros_grupo
JOIN
    Usuarios ON Miembros_grupo.Usuario_ID = Usuarios.ID;
    
    SELECT * FROM usuarios;
    SELECT 
        Grupo.ID,
        Grupo.Nombre AS NombreGrupo,
        Categoria.Nombre AS NombreCategoria,
        Usuarios.nomU AS NombreUsuarioCreador,
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
	WHERE Grupo.Categoria_ID = 1

