import React, { Component, PropTypes } from 'react';
import { Button } from 'semantic-ui-react';
import Annotation from './Annotation';

import s from './Result.css';

export default class Result extends Component {
  static propTypes = {
    annotations: PropTypes.array,
    addAnnotation: PropTypes.func.isRequired,
    photoReady: PropTypes.bool,
  };

  static defaultProps = {
    annotations: []
  };

  render() {
    const { annotations, addAnnotation, photoReady } = this.props;

    return (
      <div>
        {annotations.map((annotation, i) =>
          <Annotation 
            key={i}
            index={i}
            annotation={annotation} 
          />
        )}

        <Button className={s.btn} primary disabled={!photoReady} onClick={addAnnotation}>
          Thêm đánh dấu
        </Button>

        <p>
          <em>* Click phải vào đỉnh đa giác để xoá đỉnh</em>
        </p>
      </div>
    );
  }
}
