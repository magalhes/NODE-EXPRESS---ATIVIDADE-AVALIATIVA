const app = express()
app.use(express.json());
const alunos = require("./alunos")



app.get("/tu",(req,res)=>{
    res.send("<h1>Oi</h1>")
})