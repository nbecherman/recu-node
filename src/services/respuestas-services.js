import respuestasRepo from "../repos/respuestas-repo.js";

const RespuestasRepo = new respuestasRepo();

export default class RespuestaService {
    async createRespuesta(preguntaId, respuestaSeleccionada, esCorrecta, fechaCreacion) {
        return await RespuestasRepo.createRespuesta(userId, preguntaId, respuestaSeleccionada, esCorrecta, fechaCreacion);
    }
    async getRespuestas(filters)
    {
    return await RespuestasRepo.getRespuestas(filters);
    }
    
    
}
