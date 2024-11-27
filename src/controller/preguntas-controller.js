import express from "express";
import preguntaService from "../services/preguntas-services.js";

const PreguntaService = new preguntaService();

const router = express.Router();



export default router;