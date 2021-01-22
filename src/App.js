import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import importScript from './python/imports.py';
import predScript from './python/predict.py';
import trainScript from './python/train.py';

const round = (n) => Number.parseFloat(n).toFixed(2);

const AnnotatedSlider = props => {
  return (
    <div>
      <div className="App-slider-desc">
        {props.name}: {props.value} cm
      </div>
      <div className="App-slider">
        <input
          type="range"
          step={0.05}
          min={props.min}
          max={props.max}
          value={props.value}
          onChange={(event) => {
            const newVal = round(event.target.value);
            props.setter(newVal);
          }}
        />
      </div>
    </div>
  )
}

function App() {
  const [sepalLength, setSepalLength] = useState(6.00);
  const [sepalWidth, setSepalWidth] = useState(3.25);
  const [petalLength, setPetalLength] = useState(4);
  const [petalWidth, setPetalWidth] = useState(1.25);

  const [label, setLabel] = useState("(loading...)");


  useEffect(() => {
    window.languagePluginLoader.then(() => {
      window.pyodide.loadPackage([])
        .then(() => {
          fetch(importScript).then(src => src.text()).then(code => {
            window.pyodide.runPython(code);
            console.log("modules imported");
          })
        })
        .then(() => {
          fetch(trainScript).then(src => src.text()).then(code => {
            window.pyodide.runPython(code);
            console.log("model trained");
          })
        })
        .then(() => {
          window.data = {x: 10};
          fetch(predScript).then(src => src.text()).then(code => {
            window.pyodide.runPython(code);
            console.log("pyodide returned", window.pyodide.globals.prediction);
          })
        })
    })

  }, [])

  return (
    <div className="App">
      <div className="App-content">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <AnnotatedSlider name="Sepal Length" min={4} max={8} value={sepalLength} setter={setSepalLength} />
          <AnnotatedSlider name="Sepal Width" min={2} max={4.5} value={sepalWidth} setter={setSepalWidth} />
          <AnnotatedSlider name="Petal Length" min={1} max={7} value={petalLength} setter={setPetalLength} />
          <AnnotatedSlider name="Petal Width" min={0} max={2.5} value={petalWidth} setter={setPetalWidth} />
        </div>
        <div>Predicted label: {label}</div>
      </div>
    </div>
  );
}

export default App;
