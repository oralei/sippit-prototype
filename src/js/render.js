

function render() {
  // Water fill visual
  renderWaterFill();
  // remaining-ml text and remaining-oz text
  setRemainingText();
  // daily-goal
  renderDailyProgress();
  // total-today text
  // streak text
  // timer display (reminders.js updates this separately)
  // slider visual if fill menu is open


  document.getElementById('reminder-input').value = setSettings.reminderSeconds;
  document.getElementById('capacity-input').value = bottleState.totalWater;
}

function renderWaterFill()
{
	var waterFill = document.getElementById("water-fill");
	// apply the new clip-path css
	waterFill.style.clipPath = `inset(${bottleState.visualFillPercent}% 0 0 0)`;
}

function setRemainingText()
{
  document.getElementById("remaining-ml").innerHTML = bottleState.remainingWater.toFixed(1) + " ml";
	document.getElementById("remaining-oz").innerHTML = mlToOz(bottleState.remainingWater).toFixed(1) + " oz";
}

function renderDailyProgress()
{
  let progressFill = document.getElementById("daily-progress-fill");
  progressFill.style.width = dailyStats.dailyGoalProgress + "%";

  document.getElementById("goal-ml").innerHTML = Math.min(setSettings.dailyGoal, dailyStats.totalToday) + " / " + (setSettings.dailyGoal);
}