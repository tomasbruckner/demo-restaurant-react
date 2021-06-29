import Button, { ButtonProps } from '@material-ui/core/Button';
import MuiIconButton from '@material-ui/core/IconButton';
import React, { PureComponent } from 'react';

export type Props = {
  asIcon?: boolean;
} & ButtonProps;

class ButtonComponent extends PureComponent<Props> {
  render() {
    const { asIcon, children, ...rest } = this.props;

    const Component = asIcon ? MuiIconButton : Button;

    // @ts-ignore
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...rest}>{children}</Component>;
  }
}

export default ButtonComponent;
