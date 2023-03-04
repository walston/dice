import peg from 'peggy'
import TROLL_GRAMMAR from './troll.peggy?raw'

let languageParser: peg.Parser;

try {
  languageParser = peg.generate(TROLL_GRAMMAR, { trace: true });
} catch (e) {
  console.error(e);
}

export function roll(script: string) {
  try {
    const ast = languageParser.parse(script);
    console.log(ast)
  } catch (e) {
    console.log(e)
  }
}

export function validate(script: string) {
  try {
    languageParser.parse(script);
    return true;
  } catch (e) {
    console.log(e)
    return false;
  }
}