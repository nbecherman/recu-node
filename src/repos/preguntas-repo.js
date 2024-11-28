import pg from "pg";
import { DBConfig } from "./db.js";
export default class preguntasRepo
{
    constructor()
    {
        const {Client} = pg;
        this.DBClient = new Client(DBConfig);
        this.DBClient.connect();
    }
    async createPregunta(Pregunta,fechaCreacion) {
        try {
            const sql = `
                INSERT INTO preguntas
                (pregunta, opcion1, opcion2, opcion3, opcion4, respuesta_correcta, fecha_creacion)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
            const values = [
                Pregunta.pregunta,
                Pregunta.opcion1,
                Pregunta.opcion2,
                Pregunta.opcion3,
                Pregunta.opcion4,
                Pregunta.respuestaCorrecta,
                fechaCreacion
            ];
            const result = await this.DBClient.query(sql, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error al crear la pregunta:", error);
            throw new Error("Error al insertar la pregunta en la base de datos.");
        }
      }  
      async getPreguntaById(id) {
        const query = "SELECT * FROM preguntas WHERE id = $1";
        let returnEntity = null;
        try {
          const values = [id];
          const result = await this.DBClient.query(query, values);
          console.log(result.rows.length)
          if (result.rows.length > 0) {
            returnEntity = result.rows[0];
          }
        } catch (error) {
          console.log(error);
        }
        console.log(returnEntity);
        return returnEntity;
      }


      async updatePregunta(id, Pregunta) {
        try {
            const sql = `
                UPDATE preguntas
                SET
                    pregunta = COALESCE($1, pregunta),
                    opcion1 = COALESCE($2, opcion1),
                    opcion2 = COALESCE($3, opcion2),
                    opcion3 = COALESCE($4, opcion3),
                    opcion4 = COALESCE($5, opcion4),
                    respuesta_correcta = COALESCE($6, respuesta_correcta)
                WHERE id = $7
                RETURNING *;
            `;
           
            const values = [Pregunta.pregunta,Pregunta.opcion1,Pregunta.opcion2,Pregunta.opcion3,Pregunta.opcion4,Pregunta.respuestaCorrecta,id];
                const result = await this.DBClient.query(sql, values);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error al actualizar la pregunta:", error);
            throw new Error("Error al actualizar la pregunta en la base de datos.");
        }
    }

    //continuar
    async getPreguntaAlAzar() {
        try {
                const sql = "SELECT * FROM preguntas ORDER BY RANDOM() LIMIT 1";
                const result = await this.DBClient.query(sql);
                return result.rows[0] || null;
            } catch (error) {
                console.error("Error al obtener una pregunta al azar:", error);
                throw new Error("Error al obtener una pregunta al azar.");
            }
        }
    
    async getPreguntas({ palabraClave, ordenarPorFecha }) {
        try {
            let sql = `SELECT * FROM preguntas`;
            const values = [];
    
            if (palabraClave) {
                sql += ` WHERE pregunta ILIKE $1`;
                values.push(`%${palabraClave}%`);
            }
    
            if (ordenarPorFecha) {
                sql += ` ORDER BY fecha_creacion ${ordenarPorFecha === 'asc' ? 'ASC' : 'DESC'}`;
            }
    
            const result = await this.DBClient.query(sql, values);
            return result.rows;
        } catch (error) {
            console.error("Error al obtener preguntas:", error);
            throw new Error("Error al obtener preguntas.");
        }
    }

    async deletePregunta(id) {
        try {
            const sql = `DELETE FROM preguntas WHERE id = $1 RETURNING *`;
            const values = [id];
            const result = await this.DBClient.query(sql, values);
            return result.rows[0] || null;
        } catch (error) {
            console.error("Error al eliminar la pregunta:", error);
            throw new Error("Error al eliminar la pregunta.");
        }

    }
    
    

}
