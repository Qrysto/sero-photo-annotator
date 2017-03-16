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
                viewBox={`0 0 ${photoSize.origWidth} ${photoSize.origHeight}`}
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

    // get the original size of the image by creating a css-free image
    const img = new window.Image();
    img.onload = () => {
      const origWidth = img.width;
      const origHeight = img.height;
      console.log(origWidth, origHeight);

      this.props.photoLoaded(width, height, origWidth, origHeight);
    }

    img.src = event.target.src;
  };

  handleClick = event => {
    const { width, height, origWidth, origHeight } = this.props.photoSize;

    const canvasPos = this.refs.canvas.getBoundingClientRect();
    const x = (event.clientX - canvasPos.left) * origWidth / width;
    const y = (event.clientY - canvasPos.top) * origHeight / height;
    
    this.props.addVertex(x, y);
  };
}
