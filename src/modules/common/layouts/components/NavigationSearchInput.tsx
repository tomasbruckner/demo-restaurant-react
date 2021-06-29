import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'core/redux/store';
import {
  getSearchSelector,
  searchResultFilterAsync,
  clearSearch,
} from 'core/redux/ducks/SearchDuck';
import SearchIcon from '@material-ui/icons/Search';
import { fade, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components/macro';
import { I18N_CORE } from 'core/i18n/i18n';
import { WithTranslation, withTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from 'modules/common/components/controls/Input';
import Typography from 'modules/common/components/controls/Typography';
import { RouteComponentProps, withRouter } from 'react-router';
import { getRestaurantDetail } from 'core/router/urls';
import { DEFAULT_SEARCH_PAGE_SIZE } from 'utils/constants';

const SearchIconWrapper = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchWrapper = styled.div`
  position: relative;
  border-radius: 3px;
  margin-left: 32px;
  background-color: ${p => {
    return `${fade(p.theme.white, 0.15)}`;
  }};
  '&:hover': {
    background-color: ${p => `${fade(p.theme.white, 0.25)}`};
  },
  margin-left: 0;
  width: 300px;
`;

const StyledInput = withStyles({
  root: {
    color: 'white',
    '&:focus': {
      color: 'white',
    },
  },
})(Input);

const connector = connect(
  (state: RootState) => {
    return {
      searchResult: getSearchSelector(state),
    };
  },
  {
    dispatchSearch: searchResultFilterAsync,
    dispatchClearSearch: clearSearch,
  },
);

class NavigationSearchInput extends PureComponent<
  WithTranslation & ConnectedProps<typeof connector> & RouteComponentProps
> {
  state = {
    isLoading: false,
    isOpen: false,
    searchValue: '',
  };

  public componentDidMount() {
    const { dispatchClearSearch } = this.props;

    dispatchClearSearch();
  }

  onToggleOpen = () => {
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen, searchValue: '' });
  };

  redirect = (restaurantId: number) => {
    const { history } = this.props;

    history.push(getRestaurantDetail(restaurantId));
  };

  onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { dispatchSearch } = this.props;

    this.setState({ isLoading: true, searchValue: event.target.value });
    try {
      await dispatchSearch({
        take: DEFAULT_SEARCH_PAGE_SIZE,
        skip: 0,
        sort: {
          predicate: 'name',
          reverse: false,
        },
        filter: {
          name: event.target.value,
        },
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { searchResult } = this.props;
    const { isLoading, isOpen, searchValue } = this.state;

    return (
      <SearchWrapper>
        {!isOpen && (
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        )}
        <Autocomplete
          style={{ width: 300 }}
          open={isOpen}
          onOpen={this.onToggleOpen}
          onClose={this.onToggleOpen}
          options={searchResult.data}
          loading={isLoading}
          getOptionLabel={o => o.name}
          clearOnBlur
          clearOnEscape
          inputValue={searchValue}
          renderOption={option => (
            <Typography onClick={() => this.redirect(option.restaurantId)}>
              {option.name}
            </Typography>
          )}
          renderInput={params => (
            <StyledInput
              {...params}
              fullWidth
              variant="outlined"
              onChange={this.onChange}
              InputProps={{
                ...params.InputProps,
                style: {
                  color: 'white',
                },
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </SearchWrapper>
    );
  }
}

export default withTranslation(I18N_CORE)(connector(withRouter(NavigationSearchInput)));
