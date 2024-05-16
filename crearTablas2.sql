CREATE database dobbys2;

CREATE TABLE Rol (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    Estado BOOLEAN
);


select * from usuarios;
-- id, nomU, emU, passwU, nomCompleto, rol, fecha_creacion, estado, base64
CREATE TABLE Usuarios (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    rol INT,
    nomU VARCHAR(50),
    nomCompleto VARCHAR(50),
    emU VARCHAR(50),
    passwU VARCHAR(15),
    Fecha_de_creación DATETIME,
    base64 LONGTEXT,
    Estado BOOLEAN,
    FOREIGN KEY (RolID) REFERENCES Rol(ID)
);


CREATE TABLE Categoria (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    Estado BOOLEAN
);

-- Insertar las categorías
INSERT INTO Categoria (Nombre, Estado) VALUES ('Rock', true);
INSERT INTO Categoria (Nombre, Estado) VALUES ('K-Pop', true);
INSERT INTO Categoria (Nombre, Estado) VALUES ('Jazz', true);
INSERT INTO Categoria (Nombre, Estado) VALUES ('Electrónica', true);
INSERT INTO Categoria (Nombre, Estado) VALUES ('Corridos tumbados', true);
INSERT INTO Categoria (Nombre, Estado) VALUES ('Pop', true);

select * from categoria;



CREATE TABLE Grupo (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    Categoria_ID INT,
    UsuarioCreador_ID INT,
    Descripción VARCHAR(150),
    Fecha_de_creación DATETIME,
    Foto LONGTEXT,
    Estado BOOLEAN,
    FOREIGN KEY (Categoria_ID) REFERENCES Categoria(ID),
    FOREIGN KEY (UsuarioCreador_ID) REFERENCES Usuarios(ID)
);




CREATE TABLE Miembros_grupo (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Grupo_ID INT,
    Usuario_ID INT,
    Fecha_agregado DATETIME,
    Estado BOOLEAN,
    FOREIGN KEY (Grupo_ID) REFERENCES Grupo(ID),
    FOREIGN KEY (Usuario_ID) REFERENCES Usuarios(ID)
);


CREATE TABLE Publicacion (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Usuario_ID INT,
    Grupo_ID INT,
    Contenido VARCHAR(255),
    Fecha_de_creación DATETIME,
    Estado BOOLEAN,
    FOREIGN KEY (Usuario_ID) REFERENCES Usuarios(ID),
    FOREIGN KEY (Grupo_ID) REFERENCES Grupo(ID)
);

CREATE TABLE Foto_p (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_publicacion INT,
    Archivo LONGTEXT,
    Estado BOOLEAN,
    FOREIGN KEY (ID_publicacion) REFERENCES Publicacion(ID)
);


CREATE TABLE Video_p (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_publicacion INT,
    Archivo LONGTEXT,
    Estado BOOLEAN,
    FOREIGN KEY (ID_publicacion) REFERENCES Publicacion(ID)
);



CREATE TABLE Audio_p (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_publicacion INT,
    Archivo LONGTEXT,
    Estado BOOLEAN,
    FOREIGN KEY (ID_publicacion) REFERENCES Publicacion(ID)
);


CREATE TABLE Comentario (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_publicacion INT,
    Usuario_ID INT,
    Contenido VARCHAR(255),
    Fecha_de_creación DATETIME,
    Estado BOOLEAN,
    FOREIGN KEY (ID_publicacion) REFERENCES Publicacion(ID),
    FOREIGN KEY (Usuario_ID) REFERENCES Usuarios(ID)
);


CREATE TABLE LikePublicacion (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Usuario_ID INT,
    ID_publicacion INT,
    Estado BOOLEAN,
    FOREIGN KEY (Usuario_ID) REFERENCES Usuario(ID),
    FOREIGN KEY (ID_publicacion) REFERENCES Publicacion(ID)
);

CREATE TABLE LikeComentario (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Usuario_ID INT,
    ID_comentario INT,
    Estado BOOLEAN,
    FOREIGN KEY (Usuario_ID) REFERENCES Usuario(ID),
    FOREIGN KEY (ID_comentario) REFERENCES Comentario(ID)
);
