const chainLexer = require('chain-lexer');

let lexer = chainLexer.cLexer;

module.exports = class Lexer {
  operators = [];
  operands = [];
  parsedTokens = [];
  stream;
  constructor() {

  }
  addToOperators(str) {
    if (str == ")" || str == "}" || str == "]") return;
    let index = this.operators.findIndex(o => o.operator == str);
    if (index < 0)
      this.operators.push({
        operator: str,
        counter: 1
      });
    else
      this.operators[index].counter++;

  }
  addToOperand(str) {
    let index = this.operands.findIndex(o => o.operand == str);
    if (index < 0)
      this.operands.push({
        operand: str,
        counter: 1
      });
    else
      this.operands[index].counter++;

  }
  async calculate(stream) {
    lexer.start(stream);
    this.parsedTokens = lexer.DFA.result.tokens;
    for (let i = 0; i < this.parsedTokens.length; i++) {

      let token = this.parsedTokens[i];
      if (token.type == "Symbol" || token.type == "Keyword" || token.type == "Operator" || token.type == "DoubleOperator")
        this.addToOperators(token.value);
      else if (token.type == "Identifier" || token.type == "Number" || token.type == "String" ||
        token.type == "Float" || token.type == "Char")
        this.addToOperand(token.value);
    }

  }
  getOperands() {
    return this.operands;
  }
  getOperators() {
    return this.operators;
  }
}