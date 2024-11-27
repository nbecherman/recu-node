import express from "express";
import cors from "cors"; 

import PreguntasController from "./src/controller/preguntas-controller.js";
import RespuestasController from "./src/controller/respuestas-controller";

const app = express(); 
app.use(cors()); 
app.use(express.json()); 
const port = 3100;

app.use("/api/preguntas", PreguntasController );
app.use("/api/respuestas", RespuestasController );

 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  