import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import { CircularProgress } from '@material-ui/core';

const StyledForm = styled.form<{ fullWidth?: boolean }>`
  max-width: ${p => (p.fullWidth ? 'auto' : '500px')};
`;

const LoadingOverlay = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default class Form extends PureComponent<{
  onSubmit?: Function;
  onSubmitError?: Function;
  fullWidth?: boolean;
}> {
  state = {
    isLoading: false,
  };

  onSubmit = async (ev: any) => {
    ev.preventDefault();
    const { onSubmit, onSubmitError } = this.props;

    if (!onSubmit) {
      return;
    }

    this.setState({ isLoading: true });
    try {
      await onSubmit(ev);
    } catch (e) {
      if (onSubmitError) {
        onSubmitError();
      }
    }

    this.setState({ isLoading: false });
  };

  render() {
    const { children, fullWidth } = this.props;
    const { isLoading } = this.state;

    return (
      <StyledForm id="styledFormId" onSubmit={this.onSubmit} fullWidth={fullWidth}>
        {isLoading && (
          <LoadingOverlay>
            <CircularProgress color="primary" />
          </LoadingOverlay>
        )}
        {children}
      </StyledForm>
    );
  }
}
