import React from "react";
import ReactDOM from "react-dom";

class Stopwatch extends React.Component {
  constructor() {
    super();
    this.state = {
      status: false,
      runningTime: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    };
  }

  start = () => {
    this.myTimer = setInterval(this.calculate, 10);
  };

  stop = () => {
    clearInterval(this.myTimer);
    this.setState({
      status: false
    });
  };

  reset = () => {
    this.setState({
      runningTime: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  };

  calculate = () => {
    const currentRunningTime = this.state.runningTime;
    currentRunningTime.miliseconds++;
    if (currentRunningTime.miliseconds >= 100) {
      currentRunningTime.seconds += 1;
      currentRunningTime.miliseconds = 0;
    }
    if (currentRunningTime.seconds >= 60) {
      currentRunningTime.minutes += 1;
      currentRunningTime.seconds = 0;
    }
    //this setState pełni funkcje wypisywania bo wymusza ponowne wyrenderowanie
    this.setState({
      runningTime: currentRunningTime
    });
  };

  render = () => {
    return (
      <nav className="controls">
        <button className="button" onClick={this.start}>
          START
        </button>
        <button className="button" onClick={this.stop}>
          STOP
        </button>
        <div className="stopwatch">{this.format(this.state.runningTime)}</div>
        <button className="button" onClick={this.reset}>
          RESET
        </button>
      </nav>
    );
  };
  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
      Math.floor(times.miliseconds)
    )}`;
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

ReactDOM.render(<Stopwatch />, document.getElementById("app"));
