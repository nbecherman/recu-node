import { DBConfig } from './db.js';

export default class RespuestasRepo {
    async createRespuesta(userId, preguntaId, respuestaSeleccionada, esCorrecta, fechaCreacion) {
        try {
            const sql = `
                INSERT INTO respuestas (user_id, pregunta_id, respuesta_seleccionada, es_correcta, fecha_creacion)
                VALUES ($1, $2, $3, $4, $5) RETURNING *;
            `;
            const values = [userId, preguntaId, respuestaSeleccionada, esCorrecta, fechaCreacion];
            const result = await this.DBClient.query(sql, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error al crear la respuesta:", error);
            throw new Error("Error al registrar la respuesta en la base de datos.");
        }
    }
        
    async getRespuestas(filters) {
            try {
                let sql = `SELECT * FROM respuestas`;
                const values = [];
    
                if (filters.preguntaId) {
                    sql += ` WHERE pregunta_id = $1`;
                    values.push(filters.preguntaId);
                }
    
                if (filters.userId) {
                    sql += values.length > 0 ? ` AND user_id = $2` : ` WHERE user_id = $1`;
                    values.push(filters.userId);
                }
    
                const result = await this.DBClient.query(sql, values);
                return result.rows;
            } catch (error) {
                console.error("Error al obtener respuestas:", error);
                throw new Error("Error al obtener las respuestas desde la base de datos.");
            }
        }
    }
    

