const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                mensaje: "La contraseña debe tener al menos 6 caracteres"
            });
        }

        const usuarioExistente = db
            .prepare("SELECT id FROM users WHERE email = ?")
            .get(email);

        if (usuarioExistente) {
            return res.status(400).json({
                mensaje: "El correo ya está registrado"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const resultado = db
            .prepare(`
                INSERT INTO users (name, email, password_hash)
                VALUES (?, ?, ?)
            `)
            .run(name, email, passwordHash);

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: {
                id: resultado.lastInsertRowid,
                name,
                email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al registrar usuario"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Correo y contraseña son obligatorios"
            });
        }

        const usuario = db
            .prepare("SELECT * FROM users WHERE email = ?")
            .get(email);

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password_hash
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                name: usuario.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            mensaje: "Login exitoso",
            token,
            usuario: {
                id: usuario.id,
                name: usuario.name,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al iniciar sesión"
        });
    }
};

module.exports = {
    register,
    login
};