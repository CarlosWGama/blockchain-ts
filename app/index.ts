import { Blockchain } from './classes/blockchain';
import { Bloco } from './classes/bloco';

let bc = new Blockchain();

//Cria 1 Bloco
let bloco = new Bloco(bc.tamanho, bc.ultimoHash(), bc.dificuldade);

//Insere as informações
bloco.adicionarInformacao("Carlos W. Gama", "Olá Mundo"); 
bloco.adicionarInformacao("Carlos W. Gama", "Hello World"); 
bloco.criarHash();
    
bc.adicionarBloco(bloco);

console.log(bc);