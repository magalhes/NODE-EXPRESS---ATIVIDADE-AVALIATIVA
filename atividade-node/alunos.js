const alunos = [
    { matricula:1, nome: "José", media: 7.5 },
    { matricula:2, nome: "Gabriel", media: 8.5 },
    { matricula:3, nome: "Carlos", media: 6.0 },
  ];
  const express = require("express")
  const app = express()
app.use(express.json());
  function home (){
    app.get("/",(req,res)=>{
      res.send(alunos)
  })
 }
  

   

module.exports =  alunos 
