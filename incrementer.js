const incrementerCost = [5,5,5,50,100,100,250,NaN,NaN,NaN,NaN,NaN]
const incrementerCostMult = [2,2,2,2,5,5,5,5,10,10,10,10]

function incrementer(x) {
  let incMult = getIncMult().times(x/1000)
  for (let i in game.incrementer) {
    const k=game.incrementer[i]
    let k1=k[1].bought.pow(1+game.fupgrades.includes(8))
    let k2=k[2].bought.pow(1+game.fupgrades.includes(8))
    let k3=k[3].bought.pow(1+game.fupgrades.includes(8))
    k[0].prod=k[0].prod.add(k[1].prod.times(k1).times(incMult))
    k[0].prod=k[0].prod.add(k[2].prod.times(k1).times(k2).times(incMult.pow(2)).div(2))
    k[0].prod=k[0].prod.add(k[3].prod.times(k1).times(k2).times(k3).times(incMult.pow(3)).div(6))
    k[1].prod=k[1].prod.add(k[2].prod.times(k2).times(incMult))
    k[1].prod=k[1].prod.add(k[3].prod.times(k2).times(k3).times(incMult.pow(2)).div(2))
    k[2].prod=k[2].prod.add(k[3].prod.times(k3).times(incMult))
  }
  [2,3,4].forEach(a => [1,2,3,4].forEach(b => inc(b,a,1)))
}

function inc(x,y,spectate=0) {
  get(`inc${x}${y}`).classList.add("locked")
  get(`inc${x}${y}`).classList.remove("canbuy")
  if (game.factorials.gte(EN(incrementerCost[x+4*y-9]).times(EN(incrementerCostMult[x+4*y-9]).pow(game.incrementer[x-1][y-1].bought)))) {
    get(`inc${x}${y}`).classList.remove("locked")
    get(`inc${x}${y}`).classList.add("canbuy")
    if (spectate==0) {
      game.factorials=game.factorials.minus(EN(incrementerCost[x+4*y-9]).times(EN(incrementerCostMult[x+4*y-9]).pow(game.incrementer[x-1][y-1].bought)))
      game.incrementer[x-1][y-1].bought=game.incrementer[x-1][y-1].bought.add(1)
    }
  }
  get(`inc${x}${y}`).innerHTML=["Diagonalizer","Factor","Product","Omega Factor "][x-1] + " Incrementer " + ["I","II","III"][y-2] + "<br>" +
    beautify(game.incrementer[x-1][y-1].prod) + " x " +  beautify(game.incrementer[x-1][y-1].bought.pow(1+game.fupgrades.includes(8))) + "<br>" +
    beautify(game.incrementer[x-1][y-1].bought.pow(1+game.fupgrades.includes(8)).times(game.incrementer[x-1][y-1].prod).times(getIncMult())) + " above/sec<br>" + 
    beautify(EN(incrementerCost[x+4*y-9]).times(EN(incrementerCostMult[x+4*y-9]).pow(game.incrementer[x-1][y-1].bought))) + " Factorials"
}

function getIncMult() {
  return EN(1).times(game.mostFactorizedOnce.gte(2)?omegaFactorMult.times(5):1).times(game.fupgrades.includes(9)?game.factorials.add(10).log10():1)
}