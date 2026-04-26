// Event handlers for registered events from eventRegister.js
console.log("Testing, testing, I'm just suggesting. You and I might not be the best thing!"); 

var sipMenuOpen = false;

function exitApp()
{
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


// ---------------------- Fill Menu ---------------------- 

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

	setBottleStates(percentAsMl);
	bottleState.remainingOz = mlToOz(percentAsMl);
	bottleState.remainingPercent = slider.value;

	toggleOverlay();

	console.log("\nBottle State:")
	console.log(bottleState.remainingWater);
	console.log(bottleState.remainingPercent);
	console.log(bottleState.remainingOz);

	render();
}

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