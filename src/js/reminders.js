// ---------------------- Notification/Reminder ---------------------- 

let timerInterval = null; // track the active interval

function secondsToMinutes(seconds)
{
	return (seconds / 60);
}

function setReminder() {
	setSettings.reminderSeconds = parseFloat(document.getElementById('reminder-input').value);
}

function startCountdown(durationSeconds) {
  if (timerInterval !== null) {
      clearInterval(timerInterval);
      timerInterval = null;
    }

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
			startCountdown(setSettings.reminderSeconds);
			return;
    }
  }

  update(); // Run immediately
  timerInterval = setInterval(update, 250);
}