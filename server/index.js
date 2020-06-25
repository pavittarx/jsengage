const express = require('express');
const app = express();
const db = require("./connect");

app.get("/", (req, res)=>{
  res.send("Hello World!!");
});

app.post("/api/signup", (req, res)=>{

})

app.listen(process.env.PORT || 3000);