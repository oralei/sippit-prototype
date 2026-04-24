const dailyStats = {
	dailyGoalProgress: 0, // ml
	totalToday: 0, // ml
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

  render();
}

function refillWater()
{
	setBottleStates(bottleState.totalWater);
}

function dailyGoalTest(waterDrank)
{
  // add to daily goal:
	dailyStats.dailyGoalProgress += waterDrank;
	let goalPercent = Math.min(100, ((dailyStats.dailyGoalProgress / setSettings.dailyGoal) * 100));

	// add to daily total:
	dailyStats.totalToday += waterDrank;

  // debug
	console.log(bottleState.remainingWater);
	console.log(bottleState.remainingPercent);
	console.log(bottleState.remainingOz);

	console.log(goalPercent.toFixed(1) + "%");

	document.getElementById("daily-goal").innerHTML = "Daily Goal: " + goalPercent.toFixed(1) + "%";
	document.getElementById("total-today").innerHTML = "Total today: " + dailyStats.totalToday + " ml";
}