let reminderTimeSetting = parsedSettingsData.userSettings.reminderTimeSeconds;
let dailyGoalSetting = parsedSettingsData.userSettings.dailyGoalMl;
let nameSetting = parsedSettingsData.userSettings.name;

// settings of popup menu
const setSettings = {
	name: nameSetting, 
	reminderSeconds: reminderTimeSetting,
	dailyGoal: dailyGoalSetting, // ml
};

// EDIT CAPACITY

function editTotalCapacity(target) {
	let input = document.getElementById('capacity-input');
	let yesBtn = document.getElementById('capacity-change-yes');
	let noBtn = document.getElementById('capacity-change-no');

	if (input.disabled == true)
	{	 
		yesBtn.style.display = "block";
		noBtn.style.display = "block";

		input.disabled = false;
		target.style.display = "none";
	}
	else{
		input.disabled = true;
	}
}

function updateTotalCapacity() {
	let input = document.getElementById('capacity-input');
	let editBtn = document.getElementById("capacity-change");
	let yesBtn = document.getElementById('capacity-change-yes');
	let noBtn = document.getElementById('capacity-change-no');

	bottleState.totalWater = document.getElementById('capacity-input').value;
	bottleState.remainingPercent = ((bottleState.remainingWater / bottleState.totalWater) * 100);
	if (bottleState.remainingWater > bottleState.totalWater) {
			bottleState.remainingWater = bottleState.totalWater;
			bottleState.remainingPercent = 100;
	}

	let newPercent = (100 - (((bottleState.remainingWater / bottleState.totalWater)) * 85));
	setBottleStates(bottleState.totalWater);
	updateSlider();

	editBtn.style.display = "block";
	yesBtn.style.display = "none";
	noBtn.style.display = "none";

	input.disabled = true;

	render();
}

function cancelCapacityChange() {
	let input = document.getElementById('capacity-input');
	let editBtn = document.getElementById("capacity-change");
	let yesBtn = document.getElementById('capacity-change-yes');
	let noBtn = document.getElementById('capacity-change-no');

	editBtn.style.display = "block";
	yesBtn.style.display = "none";
	noBtn.style.display = "none";

	input.disabled = true;
}

// EDIT DAILY GOAL

function editDailyGoal(target) {
	let input = document.getElementById('goal-input');
	let yesBtn = document.getElementById('goal-change-yes');
	let noBtn = document.getElementById('goal-change-no');

	if (input.disabled == true)
	{	 
		yesBtn.style.display = "block";
		noBtn.style.display = "block";

		input.disabled = false;
		target.style.display = "none";
	}
	else{
		input.disabled = true;
	}
}

function updateDailyGoal() {
	let input = document.getElementById('goal-input');
	let editBtn = document.getElementById("goal-change");
	let yesBtn = document.getElementById('goal-change-yes');
	let noBtn = document.getElementById('goal-change-no');

	setSettings.dailyGoal = document.getElementById('goal-input').value;

	editBtn.style.display = "block";
	yesBtn.style.display = "none";
	noBtn.style.display = "none";

	input.disabled = true;

	render();
}

function cancelDailyGoal() {
	let input = document.getElementById('goal-input');
	let editBtn = document.getElementById("goal-change");
	let yesBtn = document.getElementById('goal-change-yes');
	let noBtn = document.getElementById('goal-change-no');

	editBtn.style.display = "block";
	yesBtn.style.display = "none";
	noBtn.style.display = "none";

	input.disabled = true;
}

// EDIT REMINDER 

function editReminder(target) {
	let input = document.getElementById('reminder-input');
	let yesBtn = document.getElementById('reminder-change-yes');
	let noBtn = document.getElementById('reminder-change-no');

	if (input.disabled == true)
	{	 
		yesBtn.style.display = "block";
		noBtn.style.display = "block";

		input.disabled = false;
		target.style.display = "none";
	}
	else{
		input.disabled = true;
	}
}

function updateReminder() {
	let input = document.getElementById('reminder-input');
	let editBtn = document.getElementById("reminder-change");
	let yesBtn = document.getElementById('reminder-change-yes');
	let noBtn = document.getElementById('reminder-change-no');

	setSettings.reminderSeconds = input.value;

	editBtn.style.display = "block";
	yesBtn.style.display = "none";
	noBtn.style.display = "none";

	input.disabled = true;

	startCountdown(setSettings.reminderSeconds);
}

function cancelReminder() {
	let input = document.getElementById('reminder-input');
	let editBtn = document.getElementById("reminder-change");
	let yesBtn = document.getElementById('reminder-change-yes');
	let noBtn = document.getElementById('reminder-change-no');

	editBtn.style.display = "block";
	yesBtn.style.display = "none";
	noBtn.style.display = "none";

	input.disabled = true;
}
