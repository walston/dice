import peg from 'peggy'
import TROLL_GRAMMAR from './troll.peggy?raw'

let languageParser: peg.Parser;

try {
  languageParser = peg.generate(TROLL_GRAMMAR);
} catch (e) {
  console.error(e);
}

export function parse(script: string) {
  try {
    const ast = languageParser.parse(script);
    return ast;
  } catch (e) {
    return null;
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