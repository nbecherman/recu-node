import express from "express";
import cors from "cors";


import PreguntasController from "./src/controller/preguntas-controller.js";
import RespuestasController from "./src/controller/respuestas-controller.js";


const app = express();
app.use(cors());
app.use(express.json());
const port = 3100;


app.use("/preguntas", PreguntasController );
app.use("/respuestas", RespuestasController );


 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


 
