// Event handlers for registered events from eventRegister.js
console.log("Testing, testing, I'm just suggesting. You and I might not be the best thing!"); 

const bottleState = {
	totalWater: 1182.94, // ml
	remainingWater: 1182.94, // ml
	remainingPercent: 100, 
	remainingOz: 40,
	percent: 15,
};

const setSettings = {
	reminderMinutes: 60,
	reminderSeconds: 0,
	dailyGoal: 2000, // ml
	averageSip: 0, // ml
};

const dailyStats = {
	dailyGoalProgress: 0, // ml
	totalToday: 0, // ml
}

var sipMenuOpen = false;

function exitApp()
{
	console.log("does this work?");
	window.electronAPI.closeApp();
}

function minimizeApp()
{
	window.electronAPI.minimizeApp();
}

function activateInfoMenu(event)
{
	if (event.target.checked) {
			window.electronAPI.unfoldInfo();
			document.getElementById("background2").style.visibility = "visible";
			console.log("flip"); 
	} else {
			window.electronAPI.foldInfo();
			document.getElementById("background2").style.visibility = "hidden";
			console.log("flop"); 
	}
}

function openSipMenu()
{
	let sipMenu = document.getElementById("sip-menu");
	sipMenuOpen = true;

	sipMenu.style.bottom = "0px";
}

function closeSip()
{
	let sipMenu = document.getElementById("sip-menu");
	sipMenuOpen = false;

	sipMenu.style.bottom = "-200px";
}

//  ------------------------------ SIP FUNCTION ------------------------------



function sipWater() 
{
	var waterFill = document.getElementById("water-fill");
	var ml = parseFloat(document.getElementById("sip-amount-input").value);

	if (isNaN(ml))
		ml = 0;

	var currentClip = getComputedStyle(waterFill).clipPath;

	// ml to percent
	let percent = ((ml / bottleState.totalWater) * (0.85 / 1)) * 100;
	
	// get current percent from regex
	let currentPercent = currentClip.match(/inset\(([\d.]+)%/);
	if (!currentPercent) return;

	let currentTop = parseFloat(currentPercent[1]);

	// add new sip to clip path percent
	let newTop = currentTop + percent;

	// make sure it cant go over 100
	newTop = Math.min(newTop, 100);

	let waterDrank = Math.min(bottleState.remainingWater, ml);

	bottleState.remainingWater -= ml;
	bottleState.remainingWater = Math.max(0, bottleState.remainingWater); // prevent negative

	bottleState.remainingPercent = parseFloat((bottleState.remainingWater / bottleState.totalWater) * 100);
	bottleState.remainingPercent = Math.max(0, bottleState.remainingPercent); // prevent negative

	bottleState.remainingOz = mlToOz(bottleState.remainingWater);
	bottleState.remainingOz = Math.max(0, bottleState.remainingOz); // prevent negative

	setWaterLevel(newTop, bottleState.remainingWater);

	// add to daily goal:
	dailyStats.dailyGoalProgress += waterDrank;
	let goalPercent = Math.min(100, ((dailyStats.dailyGoalProgress / setSettings.dailyGoal) * 100));

	// add to daily total:
	dailyStats.totalToday += waterDrank;

	console.log(bottleState.remainingWater);
	console.log(bottleState.remainingPercent);
	console.log(bottleState.remainingOz);

	console.log(goalPercent.toFixed(1) + "%");

	document.getElementById("daily-goal").innerHTML = "Daily Goal: " + goalPercent.toFixed(1) + "%";
	document.getElementById("total-today").innerHTML = "Total today: " + dailyStats.totalToday + " ml";
}


function setWaterLevel(percent, ml)
{
	var waterFill = document.getElementById("water-fill");
	var currentClip = getComputedStyle(waterFill).clipPath;
	ml = parseFloat(ml);

	// apply the new clip-path css
	waterFill.style.clipPath = `inset(${percent}% 0 0 0)`;

	bottleState.percent = percent;
	bottleState.remainingWater = ml;

	document.getElementById("remaining-ml").innerHTML = ml.toFixed(1) + " ml";
	document.getElementById("remaining-oz").innerHTML = mlToOz(ml).toFixed(1) + " oz";
}

function getTopToPercent()
{
	var waterFill = document.getElementById("water-fill");
	var currentClip = getComputedStyle(waterFill).clipPath;

	let currentPercent = currentClip.match(/inset\(([\d.]+)%/);
	if (!currentPercent) return;

	let currentTop = parseFloat(currentPercent[1]);

	console.log(currentTop);
	return currentTop * 0.01;
}

function refillWater()
{
	setWaterLevel(15, bottleState.totalWater);
}

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
	setWaterLevel(newPercent, bottleState.remainingWater);
	updateSlider();

	editBtn.style.display = "block";
	yesBtn.style.display = "none";
	noBtn.style.display = "none";

	input.disabled = true;
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

// ---------------------- Fill Menu Things ---------------------- 



const slider = document.getElementById("fill-slider");
const fillPercent = document.getElementById("fill-percent");

// update number on input
slider.addEventListener("input", updateSlider);
	
function updateSlider() {
	const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(to right, #7FE2E2 ${val}%, #5c5964 ${val}%)`;

	let percent = slider.value;
	let ml = (percent / 100) * bottleState.totalWater;
	let oz = mlToOz(ml);

	if (fillUnitSelection == '%')
		fillPercent.textContent = parseFloat(slider.value).toFixed(1) + "%";
	else if (fillUnitSelection == 'ml')
		fillPercent.textContent = ml.toFixed(1) + " ml";
	else if (fillUnitSelection == 'oz')
		fillPercent.textContent = oz.toFixed(1) + " oz";
}

const overlay = document.getElementById("darkscreen1");
const fillMenu = document.getElementById("fill-menu");

var overlayOn = false;

function toggleOverlay() {
	if (overlayOn)
		hideOverlay();
	else
		showOverlay();
}

function showOverlay() {
	overlay.classList.add("active");
	fillMenu.classList.add("active");

	fillPercent.textContent = parseFloat(bottleState.remainingPercent).toFixed(1) + "%";
	const val = (bottleState.remainingWater / bottleState.totalWater) * 100;
	slider.value = val;
  slider.style.background = `linear-gradient(to right, #7FE2E2 ${val}%, #5c5964 ${val}%)`;

	fillUnitSelection = '%';
	overlayOn = true;
}

function hideOverlay() {
	overlay.classList.remove("active");
	fillMenu.classList.remove("active");
	overlayOn = false;
}

function setMenuFill() {
	let sliderValue = parseFloat(slider.value); // out of 100
	percentAsMl = (sliderValue / 100) * bottleState.totalWater;
	console.log(percentAsMl);
	offsetPercent = 100 - ((sliderValue / 100) * 85); // maps to 100–15

	setWaterLevel(offsetPercent, percentAsMl);
	bottleState.remainingOz = mlToOz(percentAsMl);
	bottleState.remainingPercent = slider.value;

	toggleOverlay();

	console.log("\nBottle State:")
	console.log(bottleState.remainingWater);
	console.log(bottleState.remainingPercent);
	console.log(bottleState.remainingOz);
}

// ---------------------- Notification/Reminder ---------------------- 



function toSeconds(minutes, seconds)
{
	return ((minutes * 60) ?? 0) + (seconds ?? 0);
}

function setReminder() {
	setSettings.reminderSeconds = parseFloat(document.getElementById('time-input').value);
	setSettings.reminderMinutes = 0;
}

function startCountdown(durationSeconds) {
  const endTime = Date.now() + durationSeconds * 1000;
	const display = document.getElementById('timer');

  function update() {
    const remaining = Math.max(0, endTime - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    
    display.textContent = `${minutes}:${seconds}`;

    if (remaining <= 0) {
      clearInterval(timer);
			window.electronAPI.showNotification();
			startCountdown(toSeconds(setSettings.reminderMinutes, setSettings.reminderSeconds));
			return;
    }
  }

  update(); // Run immediately
  const timer = setInterval(update, 250); // More responsive + still efficient
}

startCountdown(toSeconds(setSettings.reminderMinutes, setSettings.reminderSeconds)); // countdown from reminder settings
document.getElementById('time-input').value = toSeconds(setSettings.reminderMinutes, setSettings.reminderSeconds);

document.getElementById('capacity-input').value = bottleState.totalWater;

setWaterLevel(15, bottleState.totalWater);

// ---------------------- Unit Selector  ---------------------- 



// Current Fill Unit Selection:
var fillUnitSelection = '%'; // defaulted to percent

const unitSelector = document.getElementById('unitSelector');
let currentTarget = null;
let lastMousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Default center

// Track mouse position globally
document.addEventListener('mousemove', (e) => {
	lastMousePosition = { x: e.pageX, y: e.pageY };
});

function openUnitSelector(targetEl, unitList, currentUnit, position = null) {
  currentTarget = targetEl;
  unitSelector.innerHTML = '';
  unitList.forEach(unit => {
    const btn = document.createElement('button');
    btn.textContent = unit;
    btn.addEventListener('click', () => {
      // Extract just the number from the text
      const currentText = currentTarget.textContent.trim();
      
      // Regex to get just the number at the start
      const match = currentText.match(/^(\d+(\.\d+)?)/);
      
      if (match) {
        const currentValue = parseFloat(match[1]);
        
        // Convert with bottleState passed
        const convertedValue = convertUnit(currentValue, currentUnit, unit);
        currentTarget.textContent = convertedValue + ' ' + unit;
				if (unit == '%')
					currentTarget.textContent = convertedValue + unit;
        
        // Update the global unit selection if this is the fill percent element
        if (currentTarget === fillPercent) {
          fillUnitSelection = unit;
        }
      } else {
        console.error('Could not parse number from: ', currentText);
      }
      
      unitSelector.style.display = 'none';
    });
    unitSelector.appendChild(btn);
  });
  
  // Position and show...
  const pos = position || lastMousePosition;
  unitSelector.style.left = pos.x + 'px';
  unitSelector.style.top = pos.y + 'px';
  unitSelector.style.display = 'block';
}

const dummyTarget = document.querySelector('.unit-button') || document.body;

// Press 'J' to open unit menu at last mouse position 
document.addEventListener('keydown', (e) => {
	if (e.key.toLowerCase() === 'j') {
		// Use first unit-button as dummy target
		openUnitSelector(dummyTarget, ['ml', 'oz', 'L']);
	}
});

function selectUnitFill(target) {
  try {
    openUnitSelector(target, ['ml', 'oz', '%'], fillUnitSelection);
    console.log("openUnitSelector completed");
  } catch (error) {
    console.error("Error in selectUnitFill:", error);
  }
}

// Hide if clicking outside
document.addEventListener('click', (e) => {
	if (!unitSelector.contains(e.target) && !e.target.classList.contains('unit-button')) {
		unitSelector.style.display = 'none';
	}
});

// -----------  Convertion Functions ---------------



function convertUnit(value, fromUnit, toUnit) {
  // Normalize fromUnit to ml
  let mlValue;
  
  if (fromUnit === 'ml') {
    mlValue = value;
  } 
	else if (fromUnit === 'oz') {
    mlValue = ozToMl(value);
  } 
	else if (fromUnit === 'L') {
    mlValue = value * 1000;
  } 
	else if (fromUnit === '%') {
    mlValue = (value / 100) * bottleState.totalWater;
  }
	else {
		console.log("wtf did u do?");
	}
  
  // Then convert from ml to the target unit
  if (toUnit === 'ml') {
    return mlValue.toFixed(1);
  } 
	else if (toUnit === 'oz') {
    return mlToOz(mlValue).toFixed(1);
  } 
	else if (toUnit === 'L') {
    return (Math.round(mlValue * 0.001 * 1000) / 1000).toFixed(1);
  } 
	else if (toUnit === '%') {
    return ((mlValue / bottleState.totalWater) * 100).toFixed(1);
  }
  
  return value;
}

function ozToMl(oz)
{
	return (oz * 29.5735);
}

function mlToOz(ml)
{
	return (ml / 29.5735);
}