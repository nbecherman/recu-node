import express from "express";
import respuestaService from "../services/respuestas-services";

const RespuestaService = new respuestaService();

const router = express.Router();



export default router;