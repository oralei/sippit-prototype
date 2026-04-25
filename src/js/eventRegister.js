let exitButton = document.getElementById("exitButton");
exitButton.addEventListener("click", exitApp);

let minimizeButton = document.getElementById("minimizeButton");
minimizeButton.addEventListener("click", minimizeApp);

let checkButton = document.getElementById("info-btn");
checkButton.addEventListener("change", activateInfoMenu);

let sipButton  = document.getElementById("sip-btn");
sipButton.addEventListener("click", openSipMenu);

let confirmButton  = document.getElementById("yes-btn");
confirmButton.addEventListener("click", closeSip);
confirmButton.addEventListener("click", sipWater);

let noButton = document.getElementById("no-btn");
noButton.addEventListener("click", closeSip);

let noFillButton = document.getElementById("no-btn2");
noFillButton.addEventListener("click", toggleOverlay);

let confirmSetFill = document.getElementById("yes-btn2");
confirmSetFill.addEventListener("click", setMenuFill);

// ---------- CAPACITY CHANGE BUTTONS -----------

let editCapacity = document.getElementById("capacity-change");
editCapacity.addEventListener("click", (event) => {
  const button = event.currentTarget; // always refers to the button, not inner <img>
  editTotalCapacity(button);
});

let submitCapacity = document.getElementById("capacity-change-yes");
submitCapacity.addEventListener("click", updateTotalCapacity);

let cancelCapacity = document.getElementById("capacity-change-no");
cancelCapacity.addEventListener("click", cancelCapacityChange);

document.addEventListener("keydown", (event) => {
  if (event.key === "o" || event.key === "O") {
    toggleOverlay(); 
  }
});

// ---------- DAILY GOAL CHANGE BUTTONS -----------

let editGoal = document.getElementById("goal-change");
editGoal.addEventListener("click", (event) => {
  const button = event.currentTarget; // always refers to the button, not inner <img>
  editDailyGoal(button);
});

let submitGoal = document.getElementById("goal-change-yes");
submitGoal.addEventListener("click", updateDailyGoal);

let cancelGoal = document.getElementById("goal-change-no");
cancelGoal.addEventListener("click", cancelDailyGoal);

// ---------- REMINDER CHANGE BUTTONS -----------

let editReminderBtn = document.getElementById("reminder-change");
editReminderBtn.addEventListener("click", (event) => {
  const button = event.currentTarget; // always refers to the button, not inner <img>
  editReminder(button);
});

let submitReminder = document.getElementById("reminder-change-yes");
submitReminder.addEventListener("click", updateReminder);

let cancelReminderBtn = document.getElementById("reminder-change-no");
cancelReminderBtn.addEventListener("click", cancelReminder);

// ----------------------------------------------------

let bottlePress = document.getElementById("bottle-container");
bottlePress.addEventListener("click", toggleOverlay);

let darkScreen = document.getElementById("darkscreen1");
darkScreen.addEventListener("click", toggleOverlay);

let fillUnitSelect = document.getElementById("fill-percent");
fillUnitSelect.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent bubbling
  selectUnitFill(e.target);
});

/* inputFilter(document.getElementById("sip-amount-input"), function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
}); */