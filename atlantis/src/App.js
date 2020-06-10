import React from 'react';
import './App.css';

const positions = [
]

for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 10; y++) {
    let cord = {};
    cord["x"] = x;
    cord["y"] = y;
    positions.push(cord);
  }
}

function Square(props) {
  return (
      <button className="square">
        {props.row}-{props.col}
      </button>
    );
}

function App() {
  console.log(positions);
  return (
    <div className="App">
      <div className="grid">
        {Object.keys(positions).map((pos, i) => {
          return <Square row={positions[pos].x} col={positions[pos].y} />
        })}               
      </div>
    </div>
  );
}

export default App;
