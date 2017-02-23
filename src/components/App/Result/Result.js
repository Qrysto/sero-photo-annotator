import React, { Component, PropTypes } from 'react';
import { Segment, Divider, Header } from 'semantic-ui-react';

import s from './Result.css';

export default class Result extends Component {
  static propTypes = {
    polygon: PropTypes.array.isRequired,
  };

  render() {
    const { polygon } = this.props;

    return !!polygon.length && (
      <div>
        <Divider />
        <Segment basic>
          <Header as="h2">
            Resulted Polygon
          </Header>

          <Segment as="code" className={s.codeBlock}>
            {JSON.stringify(polygon, undefined, 2)}
          </Segment>
        </Segment>
      </div>
    );
  }
}
