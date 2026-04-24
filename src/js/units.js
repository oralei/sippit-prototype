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