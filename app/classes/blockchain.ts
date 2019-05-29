import { Bloco } from "./bloco";
import sha256 from 'sha256';

export class Blockchain {
    public dificuldade:string = '0';
    public blocos: Bloco[] = [];
    public tamanho: number = 0;

    constructor() {
        let genesis = new Bloco(this.tamanho, '', this.dificuldade);
        genesis.criarHash();
        this.adicionarBloco(genesis);
    }

    /**
     * Adiciona o bloco a Blockchain caso válido
     * @param { Bloco } bloco 
     */
    adicionarBloco(bloco:Bloco) {
        if (this.validarBloco(bloco)) {
            this.blocos.push(bloco);
            this.tamanho++;
        }
    }

    /**
     * Retorna TRUE caso o Bloco seja válido
     * @param {Bloco} bloco
     * @return boolean  
     */
    validarBloco(bloco:Bloco): Boolean {
        if (!bloco.hash.startsWith(this.dificuldade)) return false;
        if (sha256(bloco.key()) != bloco.hash) return false;
        if (bloco.index != this.tamanho) return false;
        return true;
    }

    /**
     * Retorna o Hash do Ultimo bloco que deve ser adicionado no próximo
     * @return string
     */
    ultimoHash():string {
        return this.blocos[this.blocos.length - 1].hash;
    }
}