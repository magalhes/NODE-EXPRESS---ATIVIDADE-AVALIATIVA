const express = require("express")
var morganBody = require('morgan-body')
const bodyParser=require('body-parser')
const app = express()
app.use(express.json());
const alunos = require("./alunos")
const fs = require('fs')
const path = require('path')


app.use(bodyParser.json())

const log = fs.createWriteStream(
  path.join( __dirname,"acess.log"), {flags:'a'}
);
morganBody(app ,{
  noColors: true,
  stream:log
} )

app.get("/",(req,res)=>{
 res.send(alunos)
})


app.get("/alunos" , (req,res)=>{
    const { nome, media} = req.query
    const novoAluno = {nome:nome, media:media}
    alunos.push(novoAluno)
    //  res.status(201).json({message:`Usuario adicionado ${nome} ${media}`})
    const encontrarAluno = alunos.find((el) => el.nome === nome && el.media === media)
    if(encontrarAluno){
        res.json(encontrarAluno)
    }else{
        res.status(400)
    }
})

app.post("/aluno/novo", (req, res) => {    
    const { matricula, nome, media } = req.body;
    
    if(matricula !== undefined && nome !== undefined && media !== undefined){
        const novoAluno = {matricula: matricula, nome:nome, media:media}
        alunos.push(novoAluno)
        res.status(200).json(`Recebido: ${matricula}, ${nome}, ${media}`);
    }else{
        res.status(400).json({Message: "Dados invalidos"})
    }
   
  });

  app.delete("/aluno/deletar/:index",(req,res)=>{    
    const index = Number(req.params.index)
    alunos[index] = null
    alunosDeletado = alunos[index]
   
    if (!alunosDeletado) {
        let id = alunos.splice(1,1,index)
        res.status(200).json({message: "Usuario apagado com sucesso"})
      } else {
        // Not Found = 404
        res.status(404).json({ message: "Não foi encontrado um usuario para deletar, tente novamente" });
      }
  })
  app.put("/aluno/atualizar/:index",(req,res)=>{
    const { nome, media } = req.body;   
    const index = Number(req.params.index)
    const alunoAtualizado = alunos[index]
    
    if(alunoAtualizado){    
      const novoAluno = { nome:nome, media:media}
      let adicionarAluno = alunos.splice(1,1,novoAluno)  
        
       res.status(200).json(`Recebido: ${nome}, ${media} `);
    }else{
        res.status(400).json({menssagem : "Dados invalidos"})
    }
  })

    function salvarDados(alunos) {      
        if(alunos !== alunos){
          fs.writeFileSync('db.json', JSON.stringify(alunos));
        }   
    }
    salvarDados(alunos)
  



app.listen(3000, () => {
    // roda sempre que o servidor inicia com sucesso
    console.log("Servidor rodando em http://localhost:3000/");
  });