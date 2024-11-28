import preguntasRepo from "../repos/preguntas-repo.js"
const PreguntasRepo= new preguntasRepo();


export default class respuestaService {


    async createPregunta(Pregunta,fechaCreacion)
    {
      const createPreguntaS = await PreguntasRepo.createPregunta(Pregunta,fechaCreacion);
      return createPreguntaS;
    }
   
    async updatePregunta(id, Pregunta)
    {
      const createPreguntaS = await PreguntasRepo.updatePregunta(id, Pregunta);
      return createPreguntaS;
    }


    async getPreguntaById(id)
    {
      const getPreguntaS = await PreguntasRepo.getPreguntaById(id);
      return getPreguntaS;
    }


    async getPreguntaAlAzar() {
        try {
            return await PreguntasRepo.getPreguntaAlAzar();
            } catch (error) {
                console.error("Error en getPreguntaAlAzar:", error.message);
                throw error;
            }
        }
 async getPreguntas(palabraClave, ordenarPorFecha) {
    try {
        return await PreguntasRepo.getPreguntas(palabraClave, ordenarPorFecha);
    } catch (error) {
        console.error("Error en getPreguntas:", error.message);
        throw error;
    }
}

async deletePregunta(id) {
    try {
        return await PreguntasRepo.deletePregunta(id);
    } catch (error) {
        console.error("Error en deletePregunta:", error.message);
        throw error;
    }
}






}
