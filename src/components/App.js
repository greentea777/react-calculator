import "./App.css";
// import { calculatorButtons } from "../data/calculator-base-button-data";
import { calculatorButtons } from "../data/calculator-bonus-03-button-data";

import Button from "./Button";
import { useState } from "react";
import Display from "./Display";
import Big from "big.js";

function App() {
  const [displayStr, setDisplayStr] = useState("0");
  const [mathStr, setMathStr] = useState("0");
  const [operator, setOperator] = useState(null);
  // const [isOperatorClicked, setIsOperatorClicked] = useState(false);
  const [isEqual, setIsEqual] = useState(false);
  const [memoryValue, setMemoryValue] = useState(null);

  const [prevDisplayStr, setPrevDisplayStr] = useState("");

  const handleDisplay = (value, type, text) => {
    switch (type) {
      case "number":
        if (isEqual) {
          // rest calculator
          setPrevDisplayStr("");
          setDisplayStr(text.toString());
          setMathStr(value.toString());
          setIsEqual(false);
          return;
        }

        // avoid user clicking multi zero
        let lastDigit = displayStr.charAt(displayStr.length - 1);

        let lastTwolastDigit = displayStr.charAt(displayStr.length - 2);

        if (displayStr === "0") {
          setDisplayStr(text.toString());
          setMathStr(value.toString());
        } else if (
          isNaN(parseInt(lastTwolastDigit)) &&
          lastDigit === "0" &&
          lastTwolastDigit !== "."
        ) {
          if (text.toString() === "0") {
            return;
          } else {
            // replace last char to new input
            let newText = displayStr.substring(0, displayStr.length - 1);
            let newValue = mathStr.substring(0, mathStr.length - 1);
            newText = newText + text.toString();
            newValue = newValue + value.toString();
            setDisplayStr(newText);
            setMathStr(newValue);
          }
        } else {
          setDisplayStr(`${displayStr}${text}`);
          setMathStr(`${mathStr}${value}`);
        }
        break;
      case "operator":
        switch (value) {
          case "Multiply":
            value = "*";
            break;
          case "Divide":
            value = "/";
            break;
          case "Add":
            value = "+";
            break;
          case "Subtract":
            value = "-";
            break;
          case "Percent":
            value = "%";
            break;
          case "Square Root":
            break;
        }
        setIsEqual(false);
        if (value === "%") {
          let [input, index] = findOperator(displayStr);
          if (input !== null) {
            if (input && input !== "0") {
              input = new Big(input);
              input = input.div(100);
              if (index !== -1) {
                let subMathString = mathStr.substring(0, index);
                let subDisplayString = displayStr.substring(0, index);
                setDisplayStr(`${subDisplayString}${input.toString()}`);
                setMathStr(`${subMathString}${input.toString()}`);
              } else {
                setDisplayStr(input.toString());
                setMathStr(input.toString());
              }
            }
          }
          return;
        }
        if (value === "Square Root") {
          let [input, index] = findOperator(displayStr);
          if (input !== null) {
            if (input && input !== "0") {
              try {
                input = new Big(input);
                input = input.sqrt();
              } catch (err) {
                input = "NaN";
              }
              // input = Math.sqrt(input);
              if (index !== -1) {
                let subMathString = mathStr.substring(0, index);
                let subDisplayString = displayStr.substring(0, index);
                setDisplayStr(`${subDisplayString}${input.toString()}`);
                setMathStr(`${subMathString}${input.toString()}`);
              } else {
                setDisplayStr(input.toString());
                setMathStr(input.toString());
              }
            }
          }
          return;
        }

        let last = displayStr.charAt(displayStr.length - 1);
        let lastTwo = displayStr.charAt(displayStr.length - 2);
        if (isNaN(last) && last !== ".") {
          // console.log(lastTwo);
          if (!isNaN(lastTwo) || lastTwo === ".") {
            let subText = displayStr.substring(0, displayStr.length - 1);
            let subValue = mathStr.substring(0, mathStr.length - 1);
            setDisplayStr(`${subText}${text}`);
            setMathStr(`${subValue}${value}`);
            setOperator(value);
          }
        } else {
          if (operator) {
            if (last !== ".") {
              let outputArr = displayStr.split("");
              let lastOperator = outputArr.reverse().find((item) => {
                return isNaN(parseInt(item)) === true && item !== ".";
              });

              let index = displayStr.lastIndexOf(lastOperator);
              let before;
              let after;
              if (
                isNaN(displayStr[index - 1]) &&
                displayStr[index - 1] !== "."
              ) {
                before = displayStr.substring(0, index - 1);
                after = displayStr.substring(index, displayStr.length);
                index = index - 1;
              } else {
                before = displayStr.substring(0, index);
                after = displayStr.substring(index + 1, displayStr.length);
              }

              console.log(before);
              console.log(displayStr[index]);
              console.log(after);
              let test;
              let result;
              switch (displayStr[index]) {
                case "+":
                  test = new Big(before);
                  result = test.plus(after);
                  console.log(result);
                  console.log(result.valueOf());
                  break;
                case "-":
                  test = new Big(before);
                  result = test.minus(after);
                  console.log(result.valueOf());
                  break;
                case "\u00d7":
                  test = new Big(before);
                  result = test.times(after);
                  console.log(result.valueOf());
                  break;
                case "\u00f7":
                  try {
                    test = new Big(before);
                    result = test.div(after);
                    console.log(result.valueOf());
                  } catch (err) {
                    result = "Infinity";
                    console.log(result.valueOf());
                  }
                  break;
              }
              setPrevDisplayStr(displayStr);
              // setIsEqual(true);
              setDisplayStr(result.valueOf());
              setMathStr(result.valueOf());
              setOperator(null);

              // setPrevDisplayStr(displayStr);
              // setDisplayStr(`${eval(mathStr).toString()}${text}`);
              // setMathStr(`${eval(mathStr).toString()}${value}`);
              // setOperator(value);
            }
          } else {
            setDisplayStr(`${displayStr}${text}`);
            setMathStr(`${mathStr}${value}`);
            setOperator(value);
          }
        }
        break;
      case "enter":
        const lastChar = displayStr.charAt(displayStr.length - 1);
        if (isNaN(parseInt(lastChar)) || !operator) {
          return;
        } else {
          let outputArr = displayStr.split("");
          let lastOperator = outputArr.reverse().find((item) => {
            return isNaN(parseInt(item)) === true && item !== ".";
          });

          let index = displayStr.lastIndexOf(lastOperator);
          let before;
          let after;
          if (isNaN(displayStr[index - 1]) && displayStr[index - 1] !== ".") {
            before = displayStr.substring(0, index - 1);
            after = displayStr.substring(index, displayStr.length);
            index = index - 1;
          } else {
            before = displayStr.substring(0, index);
            after = displayStr.substring(index + 1, displayStr.length);
          }

          console.log(before);
          console.log(displayStr[index]);
          console.log(after);
          let test;
          let result;
          switch (displayStr[index]) {
            case "+":
              test = new Big(before);
              result = test.plus(after);
              console.log(result);
              console.log(typeof result.valueOf());
              break;
            case "-":
              test = new Big(before);
              result = test.minus(after);
              console.log(result.valueOf());
              break;
            case "\u00d7":
              test = new Big(before);
              result = test.times(after);
              console.log(result.valueOf());
              break;
            case "\u00f7":
              try {
                test = new Big(before);
                result = test.div(after);
                console.log(result.valueOf());
              } catch (err) {
                result = "Infinity";
                console.log(result.valueOf());
              }
              break;
          }
          setPrevDisplayStr(displayStr);
          setIsEqual(true);
          setDisplayStr(result.valueOf());
          setMathStr(result.valueOf());
          setOperator(null);
        }
        break;

      case "clear":
        // AC or C
        if (value === "Clear") {
          // if display e and error message, clear all
          if (
            displayStr.toString().includes("e") ||
            displayStr.toString().includes("Infinity") ||
            displayStr.toString().includes("NaN")
          ) {
            setDisplayStr("0");
            setMathStr("0");
            setIsEqual(false);
          } else {
            if (isNaN(displayStr.charAt(displayStr.length - 1))) {
              let outputArr = displayStr.split("");
              let lastOperator = outputArr.reverse().find((item) => {
                return isNaN(parseInt(item)) === true && item !== ".";
              });
              let operatorIndex = displayStr.indexOf(lastOperator);
              if (!isNaN(displayStr[operatorIndex - 1])) {
                setOperator(null);
              }
            }
            let newText = displayStr.substring(0, displayStr.length - 1).trim();
            let newValue = mathStr.substring(0, mathStr.length - 1).trim();
            // if display value is empty, set it back to 0
            if (newText === "") {
              setDisplayStr("0");
              setMathStr("0");
            } else {
              setDisplayStr(newText);
              setMathStr(newValue);
            }
            // }
          }
        } else {
          // AC, reset
          setPrevDisplayStr("");
          setDisplayStr("0");
          setMathStr("0");
          setOperator(null);
          setIsEqual(false);
        }
        break;

      case "sign":
        let [input, index] = findOperator(displayStr);
        if (input !== null) {
          if (input && input !== "0") {
            input = input * -1;
            if (index !== -1) {
              let subMathString = mathStr.substring(0, index);
              let subDisplayString = displayStr.substring(0, index);
              setDisplayStr(`${subDisplayString}${input.toString()}`);
              setMathStr(`${subMathString} ${input.toString()}`);
            } else {
              setDisplayStr(input.toString());
              setMathStr(input.toString());
            }
          }
        }
        break;

      case "memory":
        switch (value) {
          case "Memory Save":
            let [input] = findOperator(mathStr);
            setMemoryValue(input);
            break;
          case "Memory Clear":
            setMemoryValue(null);
            break;
          case "Memory Recall":
            if (memoryValue) {
              if (displayStr.length === 1 && displayStr === "0") {
                setDisplayStr(memoryValue);
                setMathStr(memoryValue);
              } else {
                if (
                  isNaN(displayStr.toString().charAt(displayStr.length - 1))
                ) {
                  setDisplayStr(`${displayStr}${memoryValue}`);
                  setMathStr(`${mathStr}${memoryValue}`);
                }
              }
            }

            break;
          case "Memory Subtract":
            if (memoryValue) {
              if (isNaN(displayStr.toString().charAt(displayStr.length - 1))) {
                return;
              }
              let memorySubtractResult;
              if (!isNaN(Number(displayStr))) {
                memorySubtractResult = new Big(memoryValue);
                memorySubtractResult = memorySubtractResult.minus(displayStr);
                setMemoryValue(memorySubtractResult.toString());
              } else {
                let outputArr = displayStr.split("");
                let lastOperator = outputArr.reverse().find((item) => {
                  return isNaN(parseInt(item)) === true && item !== ".";
                });

                let index = displayStr.lastIndexOf(lastOperator);
                let before;
                let after;
                if (
                  isNaN(displayStr[index - 1]) &&
                  displayStr[index - 1] !== "."
                ) {
                  before = displayStr.substring(0, index - 1);
                  after = displayStr.substring(index, displayStr.length);
                  index = index - 1;
                } else {
                  before = displayStr.substring(0, index);
                  after = displayStr.substring(index + 1, displayStr.length);
                }

                console.log(before);
                console.log(displayStr[index]);
                console.log(after);
                let test;
                let result;
                switch (displayStr[index]) {
                  case "+":
                    test = new Big(before);
                    result = test.plus(after);
                    console.log(result);
                    console.log(result.valueOf());
                    break;
                  case "-":
                    test = new Big(before);
                    result = test.minus(after);
                    console.log(result.valueOf());
                    break;
                  case "\u00d7":
                    test = new Big(before);
                    result = test.times(after);
                    console.log(result.valueOf());
                    break;
                  case "\u00f7":
                    try {
                      test = new Big(before);
                      result = test.div(after);
                      console.log(result.valueOf());
                    } catch (err) {
                      result = "Infinity";
                      console.log(result.valueOf());
                    }
                    break;
                }

                memorySubtractResult = new Big(memoryValue);
                memorySubtractResult = memorySubtractResult.minus(
                  result.valueOf()
                );

                setMemoryValue(memorySubtractResult.toString());
              }
            }
            break;
          case "Memory Addition":
            if (memoryValue) {
              let memorySubtractResult;
              if (!isNaN(Number(displayStr))) {
                memorySubtractResult = new Big(displayStr);
                memorySubtractResult = memorySubtractResult.plus(memoryValue);
                setMemoryValue(memorySubtractResult.toString());
              } else {
                let outputArr = displayStr.split("");
                let lastOperator = outputArr.reverse().find((item) => {
                  return isNaN(parseInt(item)) === true && item !== ".";
                });

                let index = displayStr.lastIndexOf(lastOperator);
                let before;
                let after;
                if (
                  isNaN(displayStr[index - 1]) &&
                  displayStr[index - 1] !== "."
                ) {
                  before = displayStr.substring(0, index - 1);
                  after = displayStr.substring(index, displayStr.length);
                  index = index - 1;
                } else {
                  before = displayStr.substring(0, index);
                  after = displayStr.substring(index + 1, displayStr.length);
                }

                console.log(before);
                console.log(displayStr[index]);
                console.log(after);
                let test;
                let result;
                switch (displayStr[index]) {
                  case "+":
                    test = new Big(before);
                    result = test.plus(after);
                    console.log(result);
                    console.log(result.valueOf());
                    break;
                  case "-":
                    test = new Big(before);
                    result = test.minus(after);
                    console.log(result.valueOf());
                    break;
                  case "\u00d7":
                    test = new Big(before);
                    result = test.times(after);
                    console.log(result.valueOf());
                    break;
                  case "\u00f7":
                    try {
                      test = new Big(before);
                      result = test.div(after);
                      console.log(result.valueOf());
                    } catch (err) {
                      result = "Infinity";
                      console.log(result.valueOf());
                    }
                    break;
                }

                memorySubtractResult = new Big(result.valueOf());
                memorySubtractResult = memorySubtractResult.plus(memoryValue);

                setMemoryValue(memorySubtractResult.toString());
              }
            }
            break;
        }
        break;
      case "decimal":
        if (!isNaN(Number(mathStr))) {
          console.log("NUM");
          if (mathStr.indexOf(".") === -1) {
            setDisplayStr(`${displayStr}${text}`);
            setMathStr(`${mathStr}${value}`);
          }
        } else {
          console.log("NOT NUM");
          console.log(mathStr.lastIndexOf(operator) + 1);
          let outputArr = displayStr.split("");
          let lastOperator = outputArr.reverse().find((item) => {
            return isNaN(parseInt(item)) === true && item !== ".";
          });

          console.log(lastOperator);
          setOperator(lastOperator);
          let lastNumber = displayStr.substring(
            displayStr.lastIndexOf(lastOperator) + 1
          );
          console.log(lastNumber);
          if (lastNumber.indexOf(".") === -1) {
            console.log("????");
            setDisplayStr(`${displayStr}${text}`);
            setMathStr(`${mathStr}${value}`);
          }
        }
        break;
    }
  };

  const findOperator = (outputText) => {
    let outputArr = outputText.split("");
    let lastOperator = outputArr.reverse().find((item) => {
      return isNaN(parseInt(item)) === true && item !== ".";
    });
    // console.log(lastOperator);
    let index = outputText.lastIndexOf(lastOperator);
    let subString = null;
    if (isNaN(outputText[index - 1]) && outputText[index - 1] !== ".") {
      subString = outputText.substring(index, outputText.length);
    } else {
      subString = outputText.substring(index + 1, outputText.length);
      index = index + 1;
    }

    // console.log(subString);
    if (subString.length > 0) {
      return [subString, index];
    } else {
      return [null, null];
    }
  };

  return (
    <div className="App">
      <h1>React Calculator</h1>
      <Display
        displayStr={displayStr}
        memoryValue={memoryValue}
        prevDisplayStr={prevDisplayStr}
      />
      <div className="btn-wrapper">
        {calculatorButtons.map((button, i) => (
          <Button key={i} button={button} handleDisplay={handleDisplay} />
        ))}
      </div>
    </div>
  );
}

export default App;
