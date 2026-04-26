function render() {
  document.getElementById('welcome-name').innerHTML = "Welcome, " + setSettings.name + "!";
  // Water fill visual
  renderWaterFill();
  // remaining-ml text and remaining-oz text
  setRemainingText();
  // daily-goal bar and text
  renderDailyProgress();
  // total-today text

  // streak text

  // slider visual if fill menu is open

  // Stat Blocks
  document.getElementById('total-today').innerHTML = dailyStats.totalToday + " ml";
  document.getElementById('average-sip').innerHTML = dailyStats.avgSip + " ml";
  document.getElementById('grand-total').innerHTML = dailyStats.grandTotal + " ml";
  document.getElementById('hours-total').innerHTML = dailyStats.hoursActive + " hrs";

  // Editable settings
  document.getElementById('reminder-input').value = setSettings.reminderSeconds;
  document.getElementById('goal-input').value = setSettings.dailyGoal;
  document.getElementById('capacity-input').value = bottleState.totalWater;

  // sip menu use last
  const lastSipIndex = (sipsBuffer.head - 1 + sipsBuffer.size) % sipsBuffer.size;
  document.getElementById('sip-amount-input').value = (sipsBuffer.buffer[lastSipIndex]).toFixed(2) ?? 0;

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

  document.getElementById("goal-ml").innerHTML = Math.min(setSettings.dailyGoal, dailyStats.totalToday) + " / " + (setSettings.dailyGoal) + " ml";
}