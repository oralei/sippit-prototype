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

let submitTimer = document.getElementById("time-start");
submitTimer.addEventListener("click", setReminder);

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