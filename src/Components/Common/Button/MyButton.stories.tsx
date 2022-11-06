import React from 'react';
import { Button } from './Button';
import { ComponentStory, ComponentMeta } from '@storybook/react';



export default {
	title: 'My FIrst Button',
	component: Button,
	argTypes: {
		size: {
			type: 'string',
			description: 'Choice size button',
			defaultValue: 'xl',
			options: ['xl','l','m','s'],
			control: {
				type: 'select'
			}
		},
		variant: {
			description: 'Choice variant button',
		},
		onClick: {
			description: 'Set function for button',
		}
	}
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'My First Button',
	variant: 'default',
	size: 'xl'
};