const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let previousInput = "";
let operator = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const value = button.textContent;

        // Clear
        if (value === "C") {
            currentInput = "";
            previousInput = "";
            operator = "";
            display.textContent = "0";
        }

        // Number or decimal
        else if (!isNaN(value) || value === ".") {

            if (value === "." && currentInput.includes(".")) {
                return;
            }

            currentInput += value;
            display.textContent = currentInput;
        }

        // Operator
        else if (["+", "−", "×", "÷", "%"].includes(value)) {

            if (currentInput === "") {
                return;
            }

            previousInput = currentInput;
            currentInput = "";
            operator = value;
        }

        // Equals
        else if (value === "=") {

            if (previousInput === "" || currentInput === "" || operator === "") {
                return;
            }

            const num1 = parseFloat(previousInput);
            const num2 = parseFloat(currentInput);

            let result;

            if (operator === "+") {
                result = num1 + num2;
            }
            else if (operator === "−") {
                result = num1 - num2;
            }
            else if (operator === "×") {
                result = num1 * num2;
            }
            else if (operator === "÷") {
                if (num2 === 0) {
                    display.textContent = "Error";
                    currentInput = "";
                    previousInput = "";
                    operator = "";
                    return;
                }

                result = num1 / num2;
            }
            else if (operator === "%") {
                result = num1 % num2;
            }

            display.textContent = result;

            currentInput = result.toString();
            previousInput = "";
            operator = "";
        }
    });
});
