import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';

const RouteContent = styled.div`
  position: relative;
  height: 100%;
  flex: 1;
  overflow-y: auto;
`;

type Props = { children: React.ReactNode };

class DefaultLayout extends PureComponent<Props> {
  render() {
    const { children } = this.props;

    return <RouteContent>{children}</RouteContent>;
  }
}

export default DefaultLayout;
