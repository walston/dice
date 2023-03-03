start
  = set / _ set

_ "optional whitespace"
  = [ \s\t]*

number "number"
  = digits:[0-9]+
  { return parseInt(digits.join(""), 10); }

modifier
  = pos:[+-] _ number:number
  { return pos === "+" ? number : -number }

set
  = count:number? [dD] d:number _ modifier:modifier? _ damage_type:[a-zA-Z]?
  { return {
    type: "Set",
    count: count || 1,
    d,
    modifier: modifier || 0,
    damage_type,
  } }
