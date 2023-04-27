import { InputField } from '@moodbox/ui-components';

export default {
  title: 'Moodbox/InputField',
  component: InputField,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export const Default = {
    args: {
        name: 'default',
        id: 'default',
        label: 'Default',
        initialValue: 'Hallo'
    }
};
