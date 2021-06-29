import React, { PureComponent } from 'react';
import DefaultLayout from 'modules/common/layouts/DefaultLayout';

export class LayoutRendererComponent extends PureComponent<{}> {
  render() {
    const { children } = this.props;

    return <DefaultLayout>{children}</DefaultLayout>;
  }
}

export default LayoutRendererComponent;
