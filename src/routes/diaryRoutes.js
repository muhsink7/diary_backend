const express = require("express");
const res = require("express/lib/response");
const { deleteDiary, updateDiary, createDiary, getDiary } = require("../controllers/diaryController");
const auth = require("../middlewares/auth");
const diaryRouter = express.Router();

diaryRouter.get("/", auth, getDiary);

diaryRouter.post("/", auth, createDiary);

diaryRouter.delete("/:id", auth, deleteDiary);

diaryRouter.put("/:id", auth, updateDiary);

module.exports = diaryRouter;
