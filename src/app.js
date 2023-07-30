const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const diaryRouter = require('./routes/diaryRoutes');
const app = express();
const port = 8000;

app.use(express.json());

app.use("/users", userRouter);
app.use("/diary", diaryRouter);

app.get('/', (req, res) => {
  res.send('Hello world');
})

const uri = "mongodb+srv://muhasink444:musi1022@cluster0.78yds4w.mongodb.net/diary"

mongoose.connect(uri).then(()=>{
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})
})
.catch((error)=>{
  console.log(error);
})
