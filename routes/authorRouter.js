import express from "express";
import {
    getAuthors,
    getAuthor,
    createNewAuthor,
    updateExistingAuthor,
    deleteExistingAuthor
} from "../controllers/authorController.js";

import { admin, authenticated } from '../utils/middleware/index.js';

const authorRouter = express.Router();

authorRouter.get("/", authenticated, getAuthors);
authorRouter.get("/:id", authenticated, getAuthor);
authorRouter.post("/", authenticated, admin, createNewAuthor);
authorRouter.put("/:id", authenticated, admin, updateExistingAuthor);
authorRouter.delete("/:id", authenticated, admin, deleteExistingAuthor);

export default authorRouter;