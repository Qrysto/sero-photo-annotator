import React, { Component, PropTypes } from 'react';
import cn from 'classnames'

import s from './Annotator.css';

export default class Annotator extends Component {
  static propTypes = {
    photoDataURL: PropTypes.string,
    photoSize: PropTypes.object,
    annotations: PropTypes.array,
    currentAnnotation: PropTypes.number,
    photoLoaded: PropTypes.func.isRequired,
    addVertex: PropTypes.func.isRequired,
  };

  static defaultProps = {
    annotations: []
  };

  render() {
    const { photoDataURL, photoSize, annotations, currentAnnotation } = this.props;
    const editing = typeof currentAnnotation === 'number'

    return !!photoDataURL && (
      <div className={s.root}>
        <div ref="canvas" className={cn(s.canvas, { [s.editing]: editing })} onClick={editing && this.handleClick}>
          <img src={photoDataURL} onLoad={this.photoLoaded} role="presentation" />

          {photoSize &&
            <svg 
              className={s.svg} 
              width={photoSize.width} 
              height={photoSize.height}
              viewBox={`0 0 ${photoSize.naturalWidth} ${photoSize.naturalHeight}`}
            >
              {annotations.map((annotation, i) =>
                <g key={i}>
                  <polygon 
                    className={cn(s.polygon, { [s.selected]: i === currentAnnotation })}
                    points={
                      annotation.vertices.map(v => `${v.x},${v.y}`).join(' ')
                    } 
                  />

                  {annotation.vertices.map((v, i) =>
                    <circle key={i} cx={v.x} cy={v.y} r={3} className={s.vertex} onClick={this.handleDotClick} />
                  )}
                </g>
              )}
            </svg>
          }
        </div>
      </div>
    );
  }

  photoLoaded = event => {
    const { width, height, naturalWidth, naturalHeight } = event.target;
    this.props.photoLoaded(width, height, naturalWidth, naturalHeight);
  };

  handleClick = event => {
    const { currentAnnotation, photoSize: { width, height, naturalWidth, naturalHeight } } = this.props;

    const canvasPos = this.refs.canvas.getBoundingClientRect();
    const x = (event.clientX - canvasPos.left) * naturalWidth / width;
    const y = (event.clientY - canvasPos.top) * naturalHeight / height;
    
    this.props.addVertex(currentAnnotation, x, y);
  };

  handleDotClick = evt => {
    console.log('dot click', evt);
  };
}
