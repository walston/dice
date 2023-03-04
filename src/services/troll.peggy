start
  = command

_ "optional whitespace"
  = [ \t]*

__ "required whitespace"
  = [ \t]+

number "number"
  = digits:[0-9]+
  { return parseInt(digits.join(""), 10); }

die "die"
  = [dD] sides:number
  { return {
    type: "die",
    sides,
  }; }
  / [zZ] sides:number
  { return {
    type: "zero-based die",
    sides,
  }; }

multiset "set of dice"
  = count:number? dice:die
  { return {
    type: "set",
    count: count || 1,
    dice,
  }; }

////////////////////////////////////////
// COMMANDS
////////////////////////////////////////

command
  = sum
  / largest

sum
  = "sum" __ multiset:multiset _ modifier:([+-] _ number)?
  { return {
    type: "sum",
    multiset,
    modifier: modifier ? parseInt(modifier.join(""), 10) : 0
  }; }

largest
  = "largest" __ counter:number __ multiset:multiset
  { return {
    type: "largest",
    counter,
    multiset,
  }; }