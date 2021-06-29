import React, { PureComponent } from 'react';
import Typography from 'modules/common/components/controls/Typography';
import PageLoading from 'core/router/PageLoading';

type Props = {
  title: string;
  isLoading?: boolean;
};

export default class PageLayout extends PureComponent<Props> {
  render() {
    const { children, title, isLoading } = this.props;

    if (isLoading) {
      return <PageLoading />;
    }

    return (
      <div style={{ margin: '16px' }}>
        <Typography variant="h3" component="h1" gutterBottom data-cy="page-layout-title">
          {title}
        </Typography>
        {children}
      </div>
    );
  }
}
