const GK = require("global-keypress");
const gk = new GK();
const fs = require("fs");

// Define the key press log file & log file path
const participant = "ghhgh"; // Replace with the participant's name
const logFile = {};
const logFilePath = __dirname + "/logs/" + `${Date.now()}_${participant}.json`;
var initialize = true;

// Launch keypress daemon process
gk.start();

// Emitted events by press
gk.on("press", key => {
  // Abort the first entrye
  if (initialize) {
    initialize = false;
    return;
  }

  // Record the key press with timestamp
  const log = key.data;
  const dateTime = new Date();
  const timestamp = dateTime.getTime();
  const dateTimeString = dateTime.toLocaleString("en-US");

  console.log(`${timestamp}, ${dateTimeString}, ${log}`);
  logFile[timestamp] = `${dateTimeString}, ${log}`;
});

// Emitted events by close
gk.on("close", () => {
  fs.writeFileSync(logFilePath, JSON.stringify(logFile));
});
