const db = require("../config/db");

const getDeals = (req, res) => {
    try {
        const deals = db
            .prepare(`
                SELECT
                    id,
                    client_name,
                    company,
                    email,
                    value,
                    stage,
                    created_at
                FROM deals
                WHERE user_id = ?
                ORDER BY created_at DESC
            `)
            .all(req.usuario.id);

        res.json(deals);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener las oportunidades"
        });
    }
};

const createDeal = (req, res) => {
    try {
        const {
            client_name,
            company,
            email,
            value,
            stage
        } = req.body;

        if (
            !client_name ||
            value === undefined ||
            !stage
        ) {
            return res.status(400).json({
                mensaje: "Cliente, valor y etapa son obligatorios"
            });
        }

        const etapasValidas = [
            "Nuevo",
            "Contactado",
            "Propuesta",
            "Ganado",
            "Perdido"
        ];

        if (!etapasValidas.includes(stage)) {
            return res.status(400).json({
                mensaje: "Etapa inválida"
            });
        }

        const resultado = db
            .prepare(`
                INSERT INTO deals (
                    user_id,
                    client_name,
                    company,
                    email,
                    value,
                    stage
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `)
            .run(
                req.usuario.id,
                client_name,
                company || null,
                email || null,
                Number(value),
                stage
            );

        const deal = db
            .prepare(`
                SELECT *
                FROM deals
                WHERE id = ?
            `)
            .get(resultado.lastInsertRowid);

        res.status(201).json({
            mensaje: "Oportunidad creada correctamente",
            deal
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al crear la oportunidad"
        });
    }
};

module.exports = {
    getDeals,
    createDeal
};