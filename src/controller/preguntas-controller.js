import express from "express";
import preguntaService from "../services/preguntas-services.js";


const PreguntaService = new preguntaService();


const router = express.Router();

router.get('/azar', async (request, response) => {
    try {
        const pregunta = await PreguntaService.getPreguntaAlAzar();
        if (!pregunta) {
            return response.status(404).json({ error: 'No hay preguntas disponibles.' });
        }
        return response.status(200).json(pregunta);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Ocurrió un error en el servidor.' });
    }
});

router.delete('/:id', async (request, response) => {
    const { id } = request.params;
console.log(id + "holi");
    try {
        const pregunta = await PreguntaService.getPreguntaById(id);
        if (!pregunta) {
            return response.status(404).json({ error: "Pregunta no encontrada." });
        }

        const resultado = await PreguntaService.deletePregunta(id);
        return response.status(200).json({ message: "Pregunta eliminada correctamente." });
    } catch (error) {
        console.error("Error al eliminar la pregunta:", error);
        return response.status(500).json({ error: "Ocurrió un error en el servidor." });
    }
});

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

router.put("/:id", async (request, response) => {
    const { id } = request.params;
    const { pregunta, opcion1, opcion2, opcion3, opcion4, respuestaCorrecta } = request.body;


    if (pregunta && typeof pregunta !== 'string') {
        return response.status(400).json({ error: "El campo 'pregunta' debe ser una cadena de texto." });
    }
    if (opcion1 && typeof opcion1 !== 'string') {
        return response.status(400).json({ error: "El campo 'opcion1' debe ser una cadena de texto." });
    }
    if (opcion2 && typeof opcion2 !== 'string') {
        return response.status(400).json({ error: "El campo 'opcion2' debe ser una cadena de texto." });
    }
    if (opcion3 && typeof opcion3 !== 'string') {
        return response.status(400).json({ error: "El campo 'opcion3' debe ser una cadena de texto." });
    }
    if (opcion4 && typeof opcion4 !== 'string') {
        return response.status(400).json({ error: "El campo 'opcion4' debe ser una cadena de texto." });
    }
    if (respuestaCorrecta && typeof respuestaCorrecta !== 'string') {
        return response.status(400).json({ error: "El campo 'respuestaCorrecta' debe ser una cadena de texto." });
    }


    const Pregunta = {};
    if (pregunta) Pregunta.pregunta = pregunta;
    if (opcion1) Pregunta.opcion1 = opcion1;
    if (opcion2) Pregunta.opcion2 = opcion2;
    if (opcion3) Pregunta.opcion3 = opcion3;
    if (opcion4) Pregunta.opcion4 = opcion4;
    if (respuestaCorrecta) Pregunta.respuestaCorrecta = respuestaCorrecta;


    try {
        const existingPregunta = await PreguntaService.getPreguntaById(id);
   
        if (existingPregunta) {
            const opcionesExistentes = [existingPregunta.opcion1, existingPregunta.opcion2, existingPregunta.opcion3, existingPregunta.opcion4];
            if (respuestaCorrecta) {
                if (!opcionesExistentes.includes(respuestaCorrecta)) {
                    return response.status(400).json({ error: "La respuesta correcta debe ser una de las opciones." });
                }
            }
        } else {
            return response.status(404).json({ error: 'Pregunta no encontrada.' });
        }


        const result = await PreguntaService.updatePregunta(id, Pregunta);
        if (result) {
            return response.status(200).json({ message: 'Pregunta actualizada correctamente.', result });
        } else {
            return response.status(404).json({ error: 'Pregunta no encontrada.' });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Ocurrió un error en el servidor.' });
    } 

    router.get('/', async (request, response) => {
        const { palabraClave, ordenarPorFecha } = request.query;
    
        try {
            const preguntas = await PreguntaService.getPreguntas({ palabraClave, ordenarPorFecha });
            return response.status(200).json(preguntas);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Ocurrió un error en el servidor.' });
        }
    });
    
    
});

export default router;


/*

GET http://localhost:3100/preguntas/azar
DELETE http://localhost:3100/preguntas/6
POST http://localhost:3100/preguntas
{
    "pregunta": "¿Cuál es el idioma más hablado en el mundo?",
    "opcion1": "Español",
    "opcion2": "Inglés",
    "opcion3": "Mandarín",
    "opcion4": "Hindi",
    "respuestaCorrecta": "Mandarín"
}

PUT http://localhost:3100/preguntas/6
para actualizar todos los campos:
{ 
    "pregunta": "¿Cuál es la capital de Argentina?",
    "opcion1": "Buenos Aires",
    "opcion2": "Córdoba",
    "opcion3": "Rosario",
    "opcion4": "Mendoza",
    "respuestaCorrecta": "Buenos Aires"
}

GET http://localhost:3100/preguntas
GET http://localhost:3100/preguntas?ordenarPorFecha=desc
*/
