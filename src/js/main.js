setBottleStates(bottleState.totalWater);
startCountdown(setSettings.reminderSeconds); // countdown from reminder settings

render();

function saveData() {
  const fullData = {
    userSettings: {
      name: setSettings.name,
      reminderTimeSeconds: setSettings.reminderSeconds,
      dailyGoalMl: setSettings.dailyGoal,
      bottleCapacityMl: bottleState.totalWater,
      fillMenuUnit: "ml"
    },
    userStats: {
      totalWaterMl: dailyStats.grandTotal,
      totalTimeOpened: dailyStats.hoursActive
    },
    sipBufferInfo: {
      lastSips: sipsBuffer.buffer,
      head: sipsBuffer.head,
      tail: sipsBuffer.tail
    }
  };

  electronAPI.writeFile("src/main.json", JSON.stringify(fullData, null, 2));
}