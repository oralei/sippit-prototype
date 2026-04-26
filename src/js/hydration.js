let loadGrandTotal = parsedSettingsData.userStats.totalWaterMl;
let loadHours = parsedSettingsData.userStats.totalTimeOpened;
let sips = parsedSettingsData.sipBufferInfo.lastSips;

// ------------------------------ MAIN SIP FUNCTIONS ------------------------------

function sipWater() 
{
	var ml = parseFloat(document.getElementById("sip-amount-input").value);

	if (isNaN(ml))
		ml = 0;

	let waterDrank = Math.min(bottleState.remainingWater, ml);
	sipsBuffer.enqueue(waterDrank);
	dailyStats.avgSip = getAverageSips(sipsBuffer.buffer); // update average

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
  saveData();
}

function updateTotalDrank(waterDrank)
{
	dailyStats.grandTotal += waterDrank;
	document.getElementById("grand-total").innerHTML = dailyStats.grandTotal + " ml";
}

function averageSip(lastSip)
{
	dailyStats.avgSip = lastSip;
}

// ---------------- Helper functions ----------------

class CircularBuffer {
  constructor() {
    this.buffer = new Array(10); // Main array
    this.size = 10;              // Array size (we are doing 10)
    this.head = 0;               // Pointer for next/last added value
    this.tail = 0;               // Pointer for the first value to dequeue/remove
    this.isFull = false;         // Tracks if the array is full
  }

	// Add data
  enqueue(val) {
    if (this.isFull) {
      console.log("Overwriting data in " + this.head);
    }
    this.buffer[this.head] = val; // add value
    this.head = (this.head + 1) % this.size; // Move to the next spot
    // If head catches up to tail, the array is full
    if (this.head === this.tail) {
      this.isFull = true;
      this.tail = (this.tail + 1) % this.size; // Move tail forward
    }
  }

  // Remove data
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("The array is empty, no values to remove.");
    }
    const val = this.buffer[this.tail]; // Get the value at the tail
    this.buffer[this.tail] = null;      // Remove the tail value
    this.tail = (this.tail + 1) % this.size; // Move tail forward
    this.isFull = false;               // Once we remove a value, it's not full
    return val;
  }

  // Check if the array is empty
  isEmpty() {
    return !this.isFull && this.head === this.tail;
  }

  // debug print
  printBuffer() {
    console.log(this.buffer);
  }
}

function getAverageSips(array) 
{
  const filled = array.filter(item => item !== null && item !== undefined);
  if (filled.length === 0) return 0;
  return (filled.reduce((a, b) => a + b, 0) / filled.length).toFixed(2);
}

const sipsBuffer = new CircularBuffer();
sipsBuffer.buffer = sips;
sipsBuffer.head = parsedSettingsData.sipBufferInfo.head;
sipsBuffer.tail = parsedSettingsData.sipBufferInfo.tail;

const dailyStats = {
	dailyGoalProgress: 0, // percent
	totalToday: 0, // ml
	avgSip: getAverageSips(sipsBuffer.buffer),
	grandTotal: loadGrandTotal,
	hoursActive: loadHours,
}