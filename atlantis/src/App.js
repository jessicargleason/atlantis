import React from 'react';
import './App.css';

const positions = [];

for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 10; y++) {
    let cord = {};
    cord["x"] = x;
    cord["y"] = y;
    positions.push(cord);
  }
}

function Contents(props) {
  return (
    <span className={`${props.active ? "active" : ""}`}>{props.value}</span>
  )
}

class Square extends React.Component {

  renderContents(i) {
    const thisSquare = i;
    const activeSquare = this.props.activeSquare;
    const contents = this.props.id;
    let active = false;
    if  (thisSquare === activeSquare) {
      active = true;
    }
    return <Contents value={contents} active={active} />;
  }

  render() {
    return (
        <button className={`square pos-${this.props.row}${this.props.col}`} onClick={this.props.onClick}>
          {this.renderContents(this.props.id)}
        </button>
      );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSquare: 5
    }
    
  }

  handleClick(i) {
    const activeSquare = (this.state.activeSquare);
    const newPosition = (i);
    const movementChange = activeSquare - newPosition;
    const xMovement = movementChange / 10;
    const yMovement = movementChange % 10;
    console.log("Movement Change: " + movementChange  + " xMovement: " + xMovement + " yMovement: " + yMovement);
    this.setState({activeSquare: i});
   }
  
  render() {
    return(
    <div className="App">
      <div className="grid">
        {Object.keys(positions).map((pos, i) => {
          return <Square activeSquare={this.state.activeSquare} key={i} row={positions[pos].x} col={positions[pos].y} id={i} onClick={() => this.handleClick(i)} />
        })}               
      </div>
      <small>Tiles from <a href="http://finalbossblues.com/timefantasy/freebies/free-tileset-atlantis/">Time Fantasy</a></small>
    </div>
    )
   }
}

export default App;
