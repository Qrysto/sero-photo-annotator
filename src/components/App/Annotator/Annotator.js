import React, { Component, PropTypes } from 'react';
import { Segment, Image, Divider, Button } from 'semantic-ui-react';

import s from './Annotator.css';

export default class Annotator extends Component {
  static propTypes = {
    photoID: PropTypes.string,
    photoSize: PropTypes.object,
    polygon: PropTypes.array.isRequired,
    photoLoaded: PropTypes.func.isRequired,
    addVertex: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  render() {
    const { photoID, photoSize, polygon, reset } = this.props;

    return !!photoID && (
      <div>
        <Divider />
        <Segment basic className={s.segment}>
          <div ref="canvas" className={s.canvas} onClick={this.handleClick}>
            <Image src={`https://drive.google.com/uc?export=download&id=${photoID}`} onLoad={this.photoLoaded} />
            {photoSize &&
              <svg 
                className={s.svg} 
                width={photoSize.width} 
                height={photoSize.height}
                viewBox={`0 0 ${photoSize.width} ${photoSize.height}`}
              >
                <polygon 
                  className={s.polygon}
                  points={
                    polygon.map(v => `${v.x},${v.y}`).join(' ')
                  } 
                />

                {polygon.map(v =>
                  <circle cx={v.x} cy={v.y} r={2} className={s.vertex} />
                )}
              </svg>
            }
          </div>
        </Segment>

        <Segment basic className={s.buttons}>
          <Button secondary onClick={reset}>
            Reset Polygon
          </Button>
        </Segment>
      </div>
    );
  }

  photoLoaded = event => {
    const { width, height } = event.target;
    this.props.photoLoaded(width, height);
  };

  handleClick = event => {
    const canvasPos = this.refs.canvas.getBoundingClientRect();
    const x = event.clientX - canvasPos.left;
    const y = event.clientY - canvasPos.top;
    
    this.props.addVertex(x, y);
  };
}
