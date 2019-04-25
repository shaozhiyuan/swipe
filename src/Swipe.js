import React, {Component} from 'react';


const arr = [
  [1, 2, 3, 4, 5],
  [11, 22, 33, 44, 55],
  [111, 222, 333, 444, 555],
];

export default class Swipe extends Component {

  constructor(props) {
    super();
    this.state = {
      startMoveX: 0,
      moveX: 0,
      startMoveY: 0,
      moveY: 0,
      move: 'a',
      wrapWidth: 0,
      wrapHeight: 0
    };
    this.wrap = React.createRef();
  }


  componentDidMount = () => {
    const width = this.wrap.current.clientWidth;
    const height = this.wrap.current.clientHeight;
    this.setState({
      wrapWidth: width,
      wrapHeight: height
    });
  };

  start = (e) => {
    this.setState({
      startX: e.touches[0].pageX,
      startY: e.touches[0].pageY,
    });
  };

  move = (e) => {
    const moveX = e.touches[0].pageX - this.state.startX;
    const moveY = e.touches[0].pageY - this.state.startY;
    if (this.state.move === 'x') {
      this.setState({
        moveX: moveX,
      });
    } else if (this.state.move === 'y') {
      console.log(this.state.move);
      this.setState({
        moveY: moveY
      });
    } else {
      if (Math.abs(moveX) > Math.abs(moveY)) {
        this.setState({
          move: 'x'
        });
      } else if (Math.abs(moveX) < Math.abs(moveY)) {
        this.setState({
          move: 'y'
        });
      } else {
        console.log('asjkdhaksjdaoidg');
      }
    }


  };

  end = (yLength, xLength) => {
    const {move, startMoveX, moveX, moveY, startMoveY, wrapHeight, wrapWidth} = this.state;
    if (move === 'x') {
      if (moveX > 40) {
        this.setState({
          startMoveX: startMoveX + wrapWidth > 0 ? 0 : startMoveX + wrapWidth,
        });
      } else if (moveX < -40) {
        this.setState({
          startMoveX: startMoveX - wrapWidth < -(xLength * wrapWidth) ? -(xLength * wrapWidth) : startMoveX - wrapWidth,
        });
      }
    } else if (move === 'y') {
      if (moveY > 40) {
        this.setState({
          startMoveY: startMoveY + wrapHeight > 0 ? 0 : startMoveY + wrapHeight,
        });
      } else if (moveY < -40) {
        this.setState({
          startMoveY: startMoveY - wrapHeight < -(yLength * wrapHeight) ? -(yLength * wrapHeight) : startMoveY - wrapHeight,
        });
      }
    }
    this.setState({
      move: 'a',
      moveX: 0,
      moveY: 0,
    });
  };

  render() {
    const {moveX, startMoveX, moveY, startMoveY} = this.state;
    console.log('startMoveY', startMoveY);
    return (
      <div className="swipe" ref={this.wrap}>
        <div className="harp" style={{transform: `translateY(${startMoveY + moveY}px)`,}}>
          {
            arr.map((prev, index, first) => {
              return (
                <div
                  key={index}
                  className="wrap"
                  style={{
                    transform: `translateX(${startMoveX + moveX}px)`,
                  }}
                >
                  {
                    prev.map((item, i, second) => {
                      return (
                        <div
                          className="img"
                          key={i}
                          onTouchStart={this.start}
                          onTouchMove={this.move}
                          onTouchEnd={() => this.end(first.length-1, second.length-1)}
                          style={{
                            width: this.state.wrapWidth,
                            height: this.state.wrapHeight
                          }}
                        >{item}</div>
                      );
                    })
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}