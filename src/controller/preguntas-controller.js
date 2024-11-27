import express from "express";
import preguntaService from "../services/preguntas-services.js";


const PreguntaService = new preguntaService();


const router = express.Router();


router.post("/", async (request, response) => {
    const { pregunta, opcion1, opcion2, opcion3, opcion4, respuestaCorrecta } = request.body;


    if (typeof pregunta !== 'string' ||typeof opcion1 !== 'string' ||typeof opcion2 !== 'string' ||typeof opcion3 !== 'string' ||typeof opcion4 !== 'string' ||typeof respuestaCorrecta !== 'string'
    ) {
        return response.status(400).json({ error: "Todos los campos deben ser cadenas de texto." });
    }


    const Pregunta = { pregunta, opcion1, opcion2, opcion3, opcion4, respuestaCorrecta };
    if (![opcion1, opcion2, opcion3, opcion4].includes(respuestaCorrecta)) {
        return response.status(400).json({ error: "La respuesta correcta debe ser una de las opciones proporcionadas." });
    }


    try {
        if (!pregunta || !opcion1 || !opcion2 || !opcion3 || !opcion4 || !respuestaCorrecta) {
            return response.status(400).json({ error: "Todos los campos son obligatorios." });
        }
        const fechaCreacion = new Date().toISOString(); // Fecha y hora actual
        const result = await PreguntaService.createPregunta(Pregunta, fechaCreacion);
        return response.status(201).json({ message: 'Inscripción exitosa.', result });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Ocurrió un error en el servidor.' });
    }
});






export default router;
