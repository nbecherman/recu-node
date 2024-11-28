import express from "express";
import respuestaService from "../services/respuestas-services.js";

const RespuestaService = new respuestaService();

const router = express.Router();

router.post("/", async (request, response) => {
    const {preguntaId, respuestaSeleccionada } = request.body;

    if (!preguntaId || !respuestaSeleccionada) {
        return response.status(400).json({ error: "Faltan campos obligatorios:preguntaId, respuestaSeleccionada." });
    }

    try { //existe?
        const pregunta = await PreguntaService.getPreguntaById(preguntaId);
        if (!pregunta) {
            return response.status(404).json({ error: "Pregunta no encontrada." });
        }

        //es correcta?
        const esCorrecta = pregunta.respuesta_correcta === respuestaSeleccionada;

        
        const fechaCreacion = new Date().toISOString();

        const respuesta = await RespuestaService.createRespuesta(userId, preguntaId, respuestaSeleccionada, esCorrecta, fechaCreacion);

        return response.status(201).json({ message: "Respuesta registrada correctamente.", result: respuesta });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Ocurrió un error al registrar la respuesta." });
    }
});


router.get("/", async (request, response) => {
    const { preguntaId, userId } = request.query; 

    try {
        const respuestas = await RespuestaService.getRespuestas({ preguntaId, userId });
        return response.status(200).json(respuestas);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Ocurrió un error al obtener las respuestas." });
    }
});



export default router;


/*
POST http://localhost:3100/respuestas
{
    "preguntaId": 6,
    "respuestaSeleccionada": "Mandarín"
}

GET http://localhost:3100/respuestas
GET http://localhost:3100/respuestas?preguntaId=6
GET http://localhost:3100/respuestas?userId=1


*/