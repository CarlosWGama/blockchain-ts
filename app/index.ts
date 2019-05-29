import express from 'express';
import bodyParser from 'body-parser';
import { Blockchain } from './classes/blockchain';
import { Bloco } from './classes/bloco';


let bc = new Blockchain();

let app = express();
app.use(bodyParser.json());

//Exibe os dados da Blockchain
app.get('/blockchain', (req, res) => {
    res.send(bc);
})

//insere dados na Blockchain
app.post('/dados', (req, res) => {
    let bloco = new Bloco(bc.tamanho, bc.ultimoHash(), bc.dificuldade);
    
    //Recupera todas informações enviadas e salva no bloco
    req.body.forEach(info => {
       bloco.adicionarInformacao(info.autor, info.mensagem); 
    })
    bloco.criarHash();
    
    bc.adicionarBloco(bloco);
    res.send("OK!");
})

app.listen(80, () => {
    console.log('iniciado');
})