import React, { Component, PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';
import diseases from './diseases';
import cn from 'classnames';

import s from './Annotation.css';

export default class Annotation extends Component {
  static propTypes = {
    annotation: PropTypes.object,
    selected: PropTypes.bool,
    selectAnnotation: PropTypes.func.isRequired,
    clearSelection: PropTypes.func.isRequired,
    tagDisease: PropTypes.func.isRequired,
  };

  render() {
    const { selected, annotation } = this.props;

    return (
      <div ref={node => this.root = node} className={cn(s.root, { [s.selected]: selected })} onClick={this.handleSelect}>
        <div ref={node => this.label = node}>
          Đa giác {annotation.vertices.length} đỉnh
        </div>
        
        <div>
          <Dropdown  
            selection
            placeholder='Chọn tên bệnh' 
            options={diseases} 
            value={annotation.disease}
            onChange={this.handleDiseaseTag}
          />
        </div>
      </div>
    );
  }

  handleSelect = (evt) => {
    if (evt.target === this.root || evt.target === this.label) {
      const { index, selected, selectAnnotation, clearSelection } = this.props;

      if (selected) {
        clearSelection()
      } else {
        selectAnnotation(index)
      }
    }
  };

  handleDiseaseTag = (evt, data) => {
    this.props.tagDisease(this.props.index, data.value)
  };
}
