import { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import trainScript from './python/train.py';
import predScript from './python/predict.py';

const round = (n) => Number.parseFloat(n).toFixed(2);

const runModule = (script, func) => {
  return fetch(script).then(src => src.text()).then(func)
}


const AnnotatedSlider = props => {
  const [value, setValue] = useState(round(props.value));

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
          value={value}
          onChange={event => setValue(event.target.value)}
          onMouseUp={event => props.setter(round(event.target.value))}
        />
      </div>
    </div>
  )
}

function App() {
  const mounted = useRef(false);
  const [sepLen, setSepLen] = useState(6.00);
  const [sepWid, setSepWid] = useState(3.25);
  const [petLen, setPetLen] = useState(4);
  const [petWid, setPetWid] = useState(1.25);

  const [label, setLabel] = useState("(loading...)");

  useEffect(() => {
    window.languagePluginLoader
      .then(() => {
        if (mounted.current === false)
          return window.pyodide.loadPackage(['numpy', 'pandas', 'scikit-learn']);
      })
      .then(() => {
        const py = window.pyodide;
        if (mounted.current === false) {
          mounted.current = true;
          runModule(trainScript, code => {
            setLabel("(training...)");
            py.runPython(code);
          });
        }

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
  }, [sepLen, sepWid, petLen, petWid]);

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
