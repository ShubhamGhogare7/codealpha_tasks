let display = document.getElementById("display");
let isResultShown = false;

function press(value) {
  if (isResultShown && !isNaN(value)) {
    display.value = value;
    isResultShown = false;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = "";
  isResultShown = false;
}

function calculate() {
  try {
    display.value = eval(display.value);
    isResultShown = true;
  } catch (error) {
    display.value = "Error";
    isResultShown = true;
  }
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (
    (key >= 0 && key <= 9) ||
    key === "." ||
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/"
  ) {
    press(key);
  }

  if (key === "Enter") {
    calculate();
  }

  if (key === "Escape") {
    clearDisplay();
  }
});
