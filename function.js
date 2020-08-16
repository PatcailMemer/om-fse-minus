function getOFCost(x) {
  return EN(10).pow((x+1)*(game.omegaFactorize[x]+1)).div(game.incrementer[3][0].prod)
  //return EN("E"+(10**x*10)+"#"+(game.omegaFactorize[x]+1)).log10().log10()
}

function buyOmegaFactorWithFactorials(x) {
  if (game.factorials.gte(getOFCost(x))) {
    game.factorials=game.factorials.minus(getOFCost(x))
    game.omegaFactorize[x]++
  }
}

function commafy(n) {
  let nr=Math.round(n);
  let raw=nr.toString();
  if (raw.split("").includes("e")) {
    let dig=Number(raw.split("+")[1])+1;
    raw=raw.split("e")[0].split("").filter(x => x != ".");
    let digNeed=dig-raw.length;
    for (let i=0;i<digNeed;i++) raw.push(0);
  } else {
    raw=raw.split("")
  }
  let out=[]
  while (raw.length>0) {
    out.push(raw[0])
    raw.shift()
    if (raw.length % 3 == 0 && raw.length>0) out.push(",")
  }
  return out.join("")
}

function getFactorialGain(x=game.diagonalUp[0]) {
  if (x.lt(1000000)) return EN(0)
  return EN.factorial(x.div(1000000)).pow(1+game.fupgrades.includes(6)).times(getIncMult()>=10?omegaFactorMult:1).floor()
}

function getNextFactorial() {
  if (getFactorialGain(game.diagonalUp[0].add(1)).gte(getFactorialGain().add(0.5))) {
    return 1
  }
  let doubler = 524288
  let adder = 0
  while (doubler>=0.75) {
    doubler = Math.round(doubler)
    adder += doubler
    if (getFactorialGain(game.diagonalUp[0].add(adder)).gte(getFactorialGain().add(0.5))) {adder -= doubler}
    doubler = doubler / 2
  }
  return adder+1
}

function getDiagSlowdown() {
  let k=EN(game.pupgrades.includes(4)?game.products.add(1e10).log10().div(10):1)
  //if (k.gte(5)) k=k.times(5).sqrt()
  return k.times(game.fupgrades.includes(7)?1.2:1)
}

function getSumOF() {
  return game.omegaFactors[0]+game.omegaFactors[1]+game.omegaFactors[2]+game.omegaFactors[3]+game.omegaFactors[4]
}