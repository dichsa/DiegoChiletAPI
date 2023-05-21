const express = require('express');
const bodyparser = require('body-parser')
const mysql = require('mysql2')
const app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

const conexion = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'Diego1234',
    database:'blog'
});

app.listen(3000, function () {
    console.log('La aplicación está escuchando en el puerto 3000!');
});

  // Obtener todos los posts
app.get('/api/posts', (req, res) => {
    const sql = 'SELECT *,  autores.nombre AS autor_nombre, autores.email AS autor_email, autores.imagen AS autor_imagen FROM posts JOIN autores';


    conexion.query(sql, (error, results) => {
        if(error) {
            console.log('Error recuperando posts:', error);
            res.status(500).json({ message: 'Error recuperando posts' });
            return;
        }
        res.status(200).json({ posts: results });
    });
});

// Obtener todos los autores
app.get('/api/autores', (req, res) => {
    const sql = 'SELECT * FROM autores';

    conexion.query(sql, (error, results) => {
        if(error) {
            console.log('Error recuperando autores:', error);
            res.status(500).json({ message: 'Error recuperando autores' });
            return;
        }
        res.status(200).json({ autores: results });
    });
});

// Obtener un post
app.get('/api/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT posts.*, autores.nombre AS autor_nombre, autores.email AS autor_email, autores.imagen AS autor_imagen FROM posts JOIN autores ON posts.id_autor = autores.id_autor WHERE posts.id_post = ?';

    conexion.query(sql, [id], (error, results) => {
        if(error) {
            console.log('Error recuperando post:', error);
            res.status(500).json({ message: 'Error recuperando post' });
            return;
        }
        if(results.length === 0) {
            res.status(404).json({ message: 'Post no encontrado' });
            return;
        }
        res.status(200).json({ post: results[0] });
    });
});
