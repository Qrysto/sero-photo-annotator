import React, { Component, PropTypes } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';

import s from './UrlInput.css';

export default class UrlInput extends Component {
  static propTypes = {
    loadPhoto: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  render() {
    const { value } = this.state;

    return (
      <div className={s.root}>
        <Segment basic>
          <form onSubmit={this.loadPhoto}>
            <Input 
              fluid
              autoFocus
              size="large"
              placeholder="Enter photo URL..." 
              value={value}
              onChange={this.handleChange}
              action={
                <Button primary size="large" type="submit">
                  Annotate Photo
                </Button>
              }
            />
          </form>
        </Segment>
      </div>
    );
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  loadPhoto = event => {
    event.preventDefault();
    this.props.loadPhoto(this.state.value);
  };
}
