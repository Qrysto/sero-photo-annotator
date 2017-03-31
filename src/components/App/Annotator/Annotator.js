import React, { Component, PropTypes } from 'react';
import { Segment, Image, Divider, Button } from 'semantic-ui-react';

import s from './Annotator.css';

export default class Annotator extends Component {
  static propTypes = {
    photoDataURL: PropTypes.string,
    photoSize: PropTypes.object,
    polygon: PropTypes.array.isRequired,
    photoLoaded: PropTypes.func.isRequired,
    addVertex: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  render() {
    const { photoDataURL, photoSize, polygon, reset } = this.props;

    return !!photoDataURL && (
      <div>
        <Divider />
        <Segment basic className={s.segment}>
          <div ref="canvas" className={s.canvas} onClick={this.handleClick}>
            <Image src={photoDataURL} onLoad={this.photoLoaded} />
            {photoSize &&
              <svg 
                className={s.svg} 
                width={photoSize.width} 
                height={photoSize.height}
                viewBox={`0 0 ${photoSize.naturalWidth} ${photoSize.naturalHeight}`}
              >
                <polygon 
                  className={s.polygon}
                  points={
                    polygon.map(v => `${v.x},${v.y}`).join(' ')
                  } 
                />

                {polygon.map((v, i) =>
                  <circle key={i} cx={v.x} cy={v.y} r={2} className={s.vertex} />
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
    const { width, height, naturalWidth, naturalHeight } = event.target;
    this.props.photoLoaded(width, height, naturalWidth, naturalHeight);
  };

  handleClick = event => {
    const { width, height, naturalWidth, naturalHeight } = this.props.photoSize;

    const canvasPos = this.refs.canvas.getBoundingClientRect();
    const x = (event.clientX - canvasPos.left) * naturalWidth / width;
    const y = (event.clientY - canvasPos.top) * naturalHeight / height;
    
    this.props.addVertex(x, y);
  };
}
