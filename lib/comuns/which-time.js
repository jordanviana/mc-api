

export class WhichTime {
   
    start(){
        this.inicio = Date.now();
    }

    show(funcao = "Função", desc = ""){
        if(!this.inicio)
            return console.log(`Contador não iniciado!`);

        let fim = Date.now();
        let milli = fim - this.inicio;
        let secundos = milli / 1000;
        let secundosResumido = secundos.toFixed(1);
        this.inicio = Date.now();
        switch(desc){
            case "m":
                return console.log(`${funcao}: ${milli}`);
            default:
                return console.log(`${funcao}: ${secundosResumido}`);
        }
    }
}