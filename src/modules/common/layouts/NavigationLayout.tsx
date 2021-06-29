import React, { PureComponent } from 'react';
import Navigation from './components/Navigation';

type Props = {};

export default class NavigationLayout extends PureComponent<Props> {
  render() {
    const { children } = this.props;

    return (
      <>
        <Navigation />
        {children}
      </>
    );
  }
}
