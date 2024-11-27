import express from "express";
import respuestaService from "../services/respuestas-services.js";

const RespuestaService = new respuestaService();

const router = express.Router();



export default router;