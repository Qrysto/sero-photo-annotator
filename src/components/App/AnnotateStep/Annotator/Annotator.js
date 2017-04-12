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
    removeVertex: PropTypes.func.isRequired,
    selectAnnotation: PropTypes.func.isRequired,
  };

  static defaultProps = {
    annotations: []
  };

  render() {
    const { photoDataURL, photoSize, annotations, currentAnnotation, selectAnnotation } = this.props;
    const editing = typeof currentAnnotation === 'number'

    return !!photoDataURL && (
      <div className={s.root}>
        <div 
          ref="canvas" 
          className={cn(s.canvas, { [s.editing]: editing })} 
          onClick={editing && this.handleClick}
          onContextMenu={this.handleRightClick}
        >
          <img src={photoDataURL} onLoad={this.photoLoaded} role="presentation" />

          {photoSize &&
            <svg 
              className={s.svg} 
              width={photoSize.width} 
              height={photoSize.height}
              viewBox={`0 0 ${photoSize.naturalWidth} ${photoSize.naturalHeight}`}
            >
              {annotations.map((annotation, annIndex) =>
                <g key={annIndex}>
                  <polygon 
                    className={cn(s.polygon, { 
                      [s.selected]: annIndex === currentAnnotation,
                      [s.dimmed]: editing && annIndex !== currentAnnotation,
                    })}
                    points={
                      annotation.vertices.map(v => `${v.x},${v.y}`).join(' ')
                    } 
                    onClick={this.selectAnnotation(annIndex)}
                  />

                  {annotation.vertices.map((v, i) =>
                    <circle 
                      key={i} 
                      cx={v.x} 
                      cy={v.y} 
                      r={3} 
                      className={s.vertex} 
                      onContextMenu={this.handleDotRightClick(annIndex, i)} 
                    />
                  )}
                </g>
              )}
            </svg>
          }
        </div>
      </div>
    );
  }

  photoLoaded = evt => {
    const { width, height, naturalWidth, naturalHeight } = evt.target;
    this.props.photoLoaded(width, height, naturalWidth, naturalHeight);
  };

  handleClick = evt => {
    const { currentAnnotation, photoSize: { width, height, naturalWidth, naturalHeight } } = this.props;

    const canvasPos = this.refs.canvas.getBoundingClientRect();
    const x = (evt.clientX - canvasPos.left) * naturalWidth / width;
    const y = (evt.clientY - canvasPos.top) * naturalHeight / height;
    
    this.props.addVertex(currentAnnotation, x, y);
  };

  handleRightClick = evt => {
    evt.preventDefault()
  };

  handleDotRightClick = (annIndex, vertexIndex) => evt => {
    const { removeVertex } = this.props
    removeVertex(annIndex, vertexIndex)
  };

  selectAnnotation = annIndex => evt => {
    evt.stopPropagation()
    this.props.selectAnnotation(annIndex)
  };
}
