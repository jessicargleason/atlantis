import React from 'react';
import './App.css';

const positions = [];
//these are squares that have things inside them, according to the background
const obstacles = [22,23,26,27,32,33,34,37,42,43,44,47,52,53,56,57,63,66,73,76,82,83,86,87,92,96,97,102,107,112,117,122,127];

for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 20; y++) {
    let cord = {};
    cord["x"] = x;
    cord["y"] = y;
    cord["class"] = null;
    cord["obstacle"] = false;
    positions.push(cord);
  }
}

for (let i=0; i < obstacles.length; i++) {
  const thisSquare = obstacles[i];
  positions[thisSquare].obstacle = true;
}

//block off the bottom half of the map
for (let i=131; i < 199; i++) {
  positions[i].obstacle = true;
}

function Contents(props) {
  return (
    <span className={`${props.active ? "active " + props.direction : ""}`}>&nbsp;</span>
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
    return <Contents value={contents} active={active} direction={this.props.direction} />;
  }

  render() {
    return (
        <div className={`square pos-${this.props.row}${this.props.col}`}>
          {this.renderContents(this.props.id)}
        </div>
      );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSquare: 5,
      direction: "down"
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  //Allow actual keyboard arrow keys
   handleKeyDown(event) {
      if (event.keyCode === 37) { 
          this.doArrow("left");
      } else if (event.keyCode === 38) {
        this.doArrow("up");
      } else if (event.keyCode === 39) {
        this.doArrow("right");
      } else if (event.keyCode === 40) {
        this.doArrow("down");
      }
  }

  componentDidMount() {
    const tHandler = throttled(200, this.handleKeyDown);
    document.addEventListener("keydown", tHandler);
  }

  //Translate arrow key/button into movement
  doArrow(direction) {
    const activeSquare = this.state.activeSquare;
    const newSquare = this.findNextSquare(activeSquare, direction);
    if (newSquare !== false) {
     this.setState({activeSquare: newSquare});
    }
  }

  //determine number of next square based on movement direction (and obstacles)
   findNextSquare(active,direction) {
     let newSquare = null;
     if (direction === "up") {
       newSquare = (active - 10);
       this.setState({direction: "up"});
     }
     else if (direction === "down") {
       newSquare = (active + 10);
       this.setState({direction: "down"});
     }
     else if (direction === "left") {
       newSquare = (active - 1);
       this.setState({direction: "left"});
     }
     else if (direction === "right") {
       newSquare = (active + 1);
       this.setState({direction: "right"});
     }

      if (newSquare > 0 && positions[newSquare].obstacle === false) {
        return newSquare;
      } else {
        return false;
      }
   }
  
  render() {
    return(
    <div className="App">
      <div className="arrows">
        <span>Manual Controls</span><br />
        <button onClick={() => this.doArrow("up")}>⬆</button>
        <button onClick={() => this.doArrow("left")}>⬅</button>
        <button onClick={() => this.doArrow("right")}>➡</button>
        <button onClick={() => this.doArrow("down")}>⬇</button>
      </div>
      <div class="flex">
        <div className="grid">
          {Object.keys(positions).map((pos, i) => {
            return <Square activeSquare={this.state.activeSquare} direction={this.state.direction} key={i} row={positions[pos].x} col={positions[pos].y} id={i} />
          })}               
        </div>
        <div class="copy">
          <h1>React Atlantis</h1>
          <p>You're looking at <a href="http://www.jessicagleason.com">Jessica's</a> project for practicing React in her spare time. Using tiles and sprites from pixel artist <a href="http://finalbossblues.com/timefantasy/freebies/free-tileset-atlantis/">Time Fantasy</a>, it creates a pixelated Atlantis that a mermaid (that's you!) can explore. This is a work in progress. <a href="https://github.com/jessicargleason/atlantis" target="_blank" rel="noopener noreferrer">The code can be found on GitHub.</a></p>
          <p>Use arrow keys or control buttons to navigate.</p>
        </div>
      </div>
    </div>
    )
   }
}

//from here https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44
function throttled(delay, fn) {
  let lastCall = 0;
  return function (...args) {
    const now = (new Date()).getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  }
}

export default App;
