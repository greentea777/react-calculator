import "./App.css";
// import { calculatorButtons } from "../data/calculator-base-button-data";
import { calculatorButtons } from "../data/calculator-bonus-03-button-data";

import Button from "./Button";
import { useState } from "react";
import Display from "./Display";

function App() {
  // display text
  const [outputText, setOutputText] = useState("0");
  // calculation state
  const [outputValue, setOutputValue] = useState("0");
  // operator btn state
  const [isOperatorClicked, setIsOperatorClicked] = useState(false);
  // equal btn state
  const [isEqual, setIsEqual] = useState(false);

  const [operator, setOperator] = useState("");

  const [memoryValue, setMemoryValue] = useState("0");

  const checkLastChar = () => {};

  const handleDisplay = (value, type, text) => {
    // if init num 0, replace 0 to input num
    if (outputText.length === 1 && outputText === "0" && type === "number") {
      setOutputText(text.toString());
      setOutputValue(value.toString());
    } else {
      // check btn type
      switch (type) {
        case "number":
          // if user has clicked equal btn
          if (isEqual) {
            // rest calculator
            setOutputText(text.toString());
            setOutputValue(value.toString());
            setIsOperatorClicked(false);
            setIsEqual(false);
            return;
          } else {
            // avoid user clicking multi zero
            const lastChar = outputText
              .toString()
              .charAt(outputText.length - 1);

            const lastTwoChar = outputText
              .toString()
              .charAt(outputText.length - 2);
            // check if second-to-last is not a num, and last char is zero
            if (isNaN(parseInt(lastTwoChar)) && lastChar === "0") {
              // if input 0, end function
              if (text.toString() === "0") {
                return;
              } else {
                // replace last char to new input
                let newText = outputText
                  .toString()
                  .substring(0, outputText.length - 1);
                let newValue = outputValue
                  .toString()
                  .substring(0, outputValue.length - 1);

                newText = newText + text.toString();
                newValue = newValue + value.toString();
                setOutputText(newText);
                setOutputValue(newValue);
              }
            } else {
              setOutputValue((o) => (o += value));
              setOutputText((o) => (o += text));
              setIsOperatorClicked(false);
            }
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
              value = "-";
              break;

            case "Square Root":
              // let index = outputText.lastIndexOf(operator);
              // let signText = outputText
              //   .toString()
              //   .substring(index + 1, outputText.length);
              // let newText = outputText.toString().substring(0, index + 1);
              // console.log(signText);
              // let squareRootResult = Math.sqrt(signText);

              // newText = newText + squareRootResult.toString();
              // console.log(newText);

              // let signValue = outputValue
              //   .toString()
              //   .substring(index + 1, outputValue.length);
              // let newValue = outputValue.toString().substring(0, index + 1);
              // newValue = newValue + signValue * -1;

              break;
          }

          setOperator(text);

          // allow user to replace operator
          if (isOperatorClicked) {
            // if (text == "\u221a") {
            //   setOutputValue((o) => (o += value));
            //   setOutputText((o) => (o += text));
            //   setIsOperatorClicked(true);
            //   setIsEqual(false);
            // } else {
            let newText = outputText
              .toString()
              .substring(0, outputText.length - 1);
            let newValue = outputValue
              .toString()
              .substring(0, outputValue.length - 1);

            newText = newText + text.toString();
            newValue = newValue + value.toString();
            setOutputText(newText);
            setOutputValue(newValue);
            // }
          } else {
            setOutputValue((o) => (o += value));
            setOutputText((o) => (o += text));
            setIsOperatorClicked(true);
            setIsEqual(false);
          }

          break;
        case "enter":
          const lastChar = outputText.toString().charAt(outputText.length - 1);
          // if last char is not a num, end function
          if (isNaN(parseInt(lastChar))) {
            return;
          } else {
            // calculate result and rest values
            setOutputText(eval(outputValue).toString());
            setOutputValue(eval(outputValue).toString());
            setIsOperatorClicked(false);
            setIsEqual(true);
          }
          break;
        case "clear":
          // AC or C
          if (value === "Clear") {
            // if display e and error message, clear all
            if (
              outputText.toString().includes("e") ||
              outputText.toString() === "Infinity" ||
              outputText.toString() === "NaN"
            ) {
              setOutputText("0");
              setOutputValue("0");
              setIsOperatorClicked(false);
              setIsEqual(false);
            } else {
              // delete one by one from last char
              let newText = outputText
                .toString()
                .substring(0, outputText.length - 1);
              let newValue = outputValue
                .toString()
                .substring(0, outputValue.length - 1);
              // if display value is empty, set it back to 0
              if (newText === "") {
                setOutputText("0");
                setOutputValue("0");
              } else {
                setOutputText(newText);
                setOutputValue(newValue);
              }

              setIsOperatorClicked(false);
            }
          } else {
            // AC, reset
            setOutputText("0");
            setOutputValue("0");
            setIsOperatorClicked(false);
            setIsEqual(false);
          }
          break;
        case "sign":
          if (!operator) {
            setOutputText((text) => (text * -1).toString());
            setOutputValue((value) => (value * -1).toString());
            return;
          }
          let index = outputText.lastIndexOf(operator);
          let signText = outputText
            .toString()
            .substring(index + 1, outputText.length);
          let newText = outputText.toString().substring(0, index + 1);

          if (signText.length === 0) {
            console.log("????");
            return;
          }

          newText = newText + signText * -1;

          let signValue = outputValue
            .toString()
            .substring(index + 1, outputValue.length);
          let newValue = outputValue.toString().substring(0, index + 1);
          newValue = newValue + signValue * -1;

          setOutputText(newText);
          setOutputValue(newValue);

          break;

        case "memory":
          // if (!operator) {
          //   setMemoryValue(outputText);
          //   return;
          // }

          switch (value) {
            case "Memory Save":
              // setIsOperatorClicked(false);
              let outputArr = outputText.split("");
              let lastOperator = outputArr.reverse().find((item) => {
                let yyyy = parseInt(item);
                return isNaN(yyyy) === true;
              });

              setOperator(lastOperator);

              if (!operator) {
                setMemoryValue(outputText);
                return;
              }

              // change operator to last operator
              let index = outputText.lastIndexOf(lastOperator);
              let memoryText = null;
              // if before the last operator is still not a num, store the last symbol
              if (isNaN(outputText[index - 1])) {
                memoryText = outputText
                  .toString()
                  .substring(index, outputText.length);
              } else {
                memoryText = outputText
                  .toString()
                  .substring(index + 1, outputText.length);
              }
              if (memoryText.length > 0) {
                setMemoryValue(memoryText);
              }

              break;

            case "Memory Clear":
              setIsOperatorClicked(false);
              setMemoryValue("0");
              break;

            // !not done /////
            case "Memory Recall":
              setIsOperatorClicked(false);
              if (outputText.length === 1 && outputText === "0") {
                console.log("???");

                setOutputText(memoryValue);
                setOutputValue(memoryValue);
              } else {
                if (
                  isNaN(outputText.toString().charAt(outputText.length - 1))
                ) {
                  setOutputText((o) => (o += memoryValue));
                  setOutputValue((o) => (o += memoryValue));
                }
              }

              break;
            case "Memory Subtract":
              setIsOperatorClicked(false);
              let memorySubtractResult = eval(
                `{${memoryValue} - ${eval(outputValue)} }`
              );
              setMemoryValue(memorySubtractResult.toString());

              // setOutputText(memorySubtractResult.toString());
              // setOutputValue(memorySubtractResult.toString());

              break;
            case "Memory Addition":
              setIsOperatorClicked(false);
              let memoryAdditionResult = eval(
                `{${eval(outputValue)} + ${memoryValue}}`
              );
              setMemoryValue(memoryAdditionResult.toString());
              // setOutputText(memoryAdditionResult.toString());
              // setOutputValue(memoryAdditionResult.toString());
              break;
          }
          break;
        case "decimal":
          setIsOperatorClicked(false);
          setOutputValue((o) => (o += value));
          setOutputText((o) => (o += text));
          break;
      }
    }
  };

  return (
    <div className="App">
      <h1>Calculator</h1>
      <Display output={outputText} />

      {calculatorButtons.map((button, i) => (
        <Button key={i} button={button} handleDisplay={handleDisplay} />
      ))}
    </div>
  );
}

export default App;
