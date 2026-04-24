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