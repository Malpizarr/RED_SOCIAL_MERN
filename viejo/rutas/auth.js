import express from "express";
import { login } from "../controllers/auth.js";

const enrutador = express.Router();

enrutador.post("/login", login);

export default enrutador;