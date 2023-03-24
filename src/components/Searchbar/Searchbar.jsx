import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchFormButtonLabel,
} from './Searchbar.styles';

function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = evt => {
    setImageName(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(imageName);
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </SearchForm>
    </SearchBar>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
