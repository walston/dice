_ "optional whitespace"
  = [ \t]*

number "number"
  = digits:[0-9]+
  { return parseInt(digits.join(""), 10); }

additive
  = left:number _ [+-] _ right:number
  = left:set _ [+-] _ right:number
  { return {
    type: "add",
    left: left,
    right: right,
  }}

set "set of dice"
  = count:number? [dD] d:number
  { return {
    type: "set",
    count: count || 1,
    d,
    modifier: modifier || 0,
    damage_type: damage_type.join(""),
  } }
