import preguntasRepo from "../repos/preguntas-repo.js"
const PreguntasRepo= new preguntasRepo();


export default class respuestaService {


    async createPregunta(Pregunta,fechaCreacion)
    {
      const createPreguntaS = await PreguntasRepo.createPregunta(Pregunta,fechaCreacion);
      return createPreguntaS;
    }
   


}
