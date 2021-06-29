import React from 'react';
import { Story, Meta } from '@storybook/react';
import Button, { Props } from 'modules/common/components/controls/Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

// @ts-ignore
const Template: Story<Props> = args => <Button {...args}>test </Button>;

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  variant: 'outlined'
};
