const dailyStats = {
	dailyGoalProgress: 0, // percent
	totalToday: 0, // ml
	grandTotal: 0, // test
}

// ------------------------------ MAIN SIP FUNCTIONS ------------------------------

function sipWater() 
{
	var ml = parseFloat(document.getElementById("sip-amount-input").value);

	if (isNaN(ml))
		ml = 0;

	let waterDrank = Math.min(bottleState.remainingWater, ml);

  // the actual drink water part (minus sip amount from remaining water) !
	bottleState.remainingWater -= waterDrank;

	setBottleStates(bottleState.remainingWater);
  dailyGoalTest(waterDrank);
}

function refillWater()
{
	setBottleStates(bottleState.totalWater);
}

function dailyGoalTest(waterDrank)
{
  // add to daily goal:
	dailyStats.dailyGoalProgress += waterDrank;
	
	// add to daily total:
	dailyStats.totalToday += waterDrank;

	let goalPercent = Math.min(100, ((dailyStats.totalToday / setSettings.dailyGoal) * 100));

  // debug
	console.log(bottleState.remainingWater);
	console.log(bottleState.remainingPercent);
	console.log(bottleState.remainingOz);
	console.log(goalPercent.toFixed(1) + "%");

	dailyStats.dailyGoalProgress = goalPercent;
	document.getElementById("total-today").innerHTML = dailyStats.totalToday + " ml";

	updateTotalDrank(waterDrank);
	render();
}

function updateTotalDrank(waterDrank)
{
	dailyStats.grandTotal += waterDrank;
	document.getElementById("grand-total").innerHTML = dailyStats.grandTotal + " ml";
}