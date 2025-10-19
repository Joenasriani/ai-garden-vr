// ai_sim.js - handles feeding tokens and training examples
export class AISim {
    constructor(){
        this.tokens = [];
        this.examples = [];
    }

    feedTokens(tokens){
        this.tokens.push(...tokens);
        console.log("Tokens fed:", tokens);
    }

    addExample(label, text){
        this.examples.push({label, text});
        console.log("Example added:", label, text);
    }
}