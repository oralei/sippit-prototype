const parsedSettingsData = window.electronAPI.readSettings();

let bottleSizeSetting = parsedSettingsData.userSettings.bottleCapacityMl;
let userName = parsedSettingsData.userSettings.name;

// This is the main interactive bottle state. Mostly dynamic values
const bottleState = {
	totalWater: bottleSizeSetting, // ml
	remainingWater: bottleSizeSetting, // ml
	remainingPercent: 100, // ← percent of actual water left 0-100
	remainingOz: 40,
  visualFillPercent: 15,   // ← the clip-path value, 15–100, 15 = full
};

function setBottleStates(remainingMl) {
    bottleState.remainingWater = Math.max(0, remainingMl);

    bottleState.remainingPercent = parseFloat((bottleState.remainingWater / bottleState.totalWater) * 100);
    bottleState.remainingPercent = Math.max(0, bottleState.remainingPercent); // prevent negative

    bottleState.remainingOz = mlToOz(bottleState.remainingWater);
    bottleState.remainingOz = Math.max(0, bottleState.remainingOz); // prevent negative

    bottleState.visualFillPercent = calculateVisualFill(bottleState.remainingWater)
}

// This function is needed to map the remaining water in ml, to the visual fill bar where the clipPath of 15 = 100% and 100 = 0%
function calculateVisualFill(remainingWater)
{
  const FULL = 15;   // clip-path value when bottle is 100% full
  const EMPTY = 100; // clip-path value when bottle is 0% full

  let fillRatio = remainingWater / bottleState.totalWater; // 0.0 to 1.0
  let newTop = EMPTY - (fillRatio * (EMPTY - FULL));       // maps to 100 down to 15

  return Math.min(Math.max(newTop, FULL), EMPTY); // clamp between 15 and 100
}