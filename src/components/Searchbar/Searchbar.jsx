import { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Form, Input, SearchbarHeader } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handlerChange = e => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  handlerSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.searchValue.trim());

    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <SearchbarHeader>
        <Form onSubmit={this.handlerSubmit}>
          <Button type="submit">
            <span className="button-label">Search</span>
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={this.handlerChange}
          />
        </Form>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
