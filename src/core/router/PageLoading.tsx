import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class PageLoading extends PureComponent {
  render() {
    return (
      <StyledWrapper>
        <CircularProgress />
      </StyledWrapper>
    );
  }
}

export default PageLoading;
