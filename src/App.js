import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import importScript from './python/imports.py';
import predScript from './python/predict.py';
import trainScript from './python/train.py';

const round = (n) => Number.parseFloat(n).toFixed(2);

const runModule = (script, func) => {
  return fetch(script).then(src => src.text()).then(func)
}

const moduleToCode = async (script) => {
  const code = await fetch(script).then(src => src.text());
  return code;
}


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
            props.setter(round(event.target.value));
          }}
        />
      </div>
    </div>
  )
}

function App() {
  const [sepLen, setSepLen] = useState(6.00);
  const [sepWid, setSepWid] = useState(3.25);
  const [petLen, setPetLen] = useState(4);
  const [petWid, setPetWid] = useState(1.25);

  const [label, setLabel] = useState("(loading...)");

  useEffect(() => {
    window.languagePluginLoader
      .then(() => {
        return window.pyodide.loadPackage(['numpy', 'pandas', 'scikit-learn'])
      })
      .then(() => {
        const py = window.pyodide;
        runModule(importScript, code => {
          setLabel("(importing...)");
          py.runPython(code);
          console.log("modules loaded.");
        });

        runModule(trainScript, code => {
          setLabel("(training...)");
          py.runPython(code);
          console.log("model trained.");
        });

        runModule(predScript, code => {
          setLabel("(predicting...)");
          window.data = { 
            sep_len: sepLen, 
            sep_wid: sepWid,
            pet_len: petLen,
            pet_wid: petWid
          };
          const predicted = py.runPython(code);
          setLabel(predicted);
        });
      })
  }, []);

  return (
    <div className="App">
      <div className="App-content">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <AnnotatedSlider name="Sepal Length" min={4} max={8} value={sepLen} setter={setSepLen} />
          <AnnotatedSlider name="Sepal Width" min={2} max={4.5} value={sepWid} setter={setSepWid} />
          <AnnotatedSlider name="Petal Length" min={1} max={7} value={petLen} setter={setPetLen} />
          <AnnotatedSlider name="Petal Width" min={0} max={2.5} value={petWid} setter={setPetWid} />
        </div>
        <div>Predicted label: {label}</div>
      </div>
    </div>
  );
}

export default App;
