import { Dado } from "./Dado";
import sha256 from 'sha256';

export class Bloco {
    public nonce: number = 0;
    public dados: Dado[] = [];
    public hash: string = '';

    constructor(public index: number, public hashAnterior:string, public dificuldade: string) {  }

    /**
     * Informa os valores que vão ser adicionados nos dados do bloco
     * @param {string} autor 
     * @param {string} msg 
     */
    adicionarInformacao(autor:string, msg:string) {
        this.dados.push(new Dado(autor, msg));
    }

    /**
     * Retorna todos os dados que devem compor o hash
     * @return string
     */
    key() {
        return JSON.stringify(this.dados) + this.index + this.hashAnterior + this.dificuldade + this.nonce;
    }

    /**
     * Realiza a prova de trabalho para Gerar um Hash com a dificuldade informada
     */
    criarHash() {
        do {
            this.nonce++;
            this.hash = sha256(this.key());
        } while (!this.hash.startsWith(this.dificuldade));   
    }

}