import "./App.css";
import { calculatorButtons } from "../data/calculator-base-button-data";
// import { calculatorButtons } from "../data/calculator-bonus-03-button-data";

import Button from "./Button";
import { useState } from "react";
import Display from "./Display";

function App() {
  const [outputText, setOutputText] = useState("0");
  const [outputValue, setOutputValue] = useState("0");

  const [operatorClicked, setOperatorClicked] = useState(false);
  const [isEqual, setIsEqual] = useState(false);

  const handleDisplay = (value, type, text) => {
    if (outputText.length === 1 && outputText === "0" && type === "number") {
      setOutputText(text.toString());
      setOutputValue(value.toString());
    } else {
      switch (type) {
        case "number":
          if (isEqual) {
            setOutputText(text.toString());
            setOutputValue(value.toString());
            setOperatorClicked(false);
            setIsEqual(false);

            return;
          } else {
            const lastChar = outputText
              .toString()
              .charAt(outputText.length - 1);

            const lastTwoChar = outputText
              .toString()
              .charAt(outputText.length - 2);

            if (isNaN(parseInt(lastTwoChar)) && lastChar === "0") {
              if (text.toString() === "0") {
                return;
              } else {
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
              setOperatorClicked(false);
            }
          }
          break;
        case "operator":
          if (operatorClicked) {
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
          } else {
            setOutputValue((o) => (o += value));
            setOutputText((o) => (o += text));
            setOperatorClicked(true);
            setIsEqual(false);
          }

          break;
        case "enter":
          const lastChar = outputText.toString().charAt(outputText.length - 1);

          if (isNaN(parseInt(lastChar))) {
            return;
          } else {
            setOutputText(eval(outputValue).toString());
            setOutputValue(eval(outputValue).toString());
            setOperatorClicked(false);
            setIsEqual(true);
          }

          break;
        case "clear":
          if (value === "Clear") {
            if (
              outputText.toString().includes("e") ||
              outputText.toString() === "Infinity" ||
              outputText.toString() === "NaN"
            ) {
              setOutputText("0");
              setOutputValue("0");
              setOperatorClicked(false);
              setIsEqual(false);
            } else {
              let newText = outputText
                .toString()
                .substring(0, outputText.length - 1);
              let newValue = outputValue
                .toString()
                .substring(0, outputValue.length - 1);

              if (newText === "") {
                setOutputText("0");
                setOutputValue("0");
              } else {
                setOutputText(newText);
                setOutputValue(newValue);
              }
            }
          } else {
            setOutputText("0");
            setOutputValue("0");
            setOperatorClicked(false);
            setIsEqual(false);
          }

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
