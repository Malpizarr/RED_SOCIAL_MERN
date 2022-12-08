import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const enrutador = express.Router();

enrutador.get("/:id", auth, getUser);

enrutador.get("/:id/fiends", auth, getUserFriends);

/* UPDATE USER */

enrutador.patch("/:id/:friendId", auth, addRemoveFriend);

export default enrutador;