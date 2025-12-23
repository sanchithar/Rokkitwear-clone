import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorSelector } from './ColorSelector';

const meta = {
  component: ColorSelector,
  title: 'Components/ColorSelector',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorSelector>;

export default meta;
type Story = StoryObj<typeof ColorSelector>;

const mockColors = [
  { name: 'Jet Black', hex: '#000000' },
  { name: 'Sport Grey', hex: '#808080' },
  { name: 'Navy', hex: '#000080' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Red', hex: '#FF0000' },
];

export const Default: Story = {
  args: {
    colors: mockColors,
    selectedColor: '',
    onColorSelect: (color) => console.log('Selected:', color),
  },
};

export const WithSelection: Story = {
  args: {
    colors: mockColors,
    selectedColor: 'Jet Black',
    onColorSelect: (color) => console.log('Selected:', color),
  },
};

export const FewColors: Story = {
  args: {
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    selectedColor: 'Black',
    onColorSelect: (color) => console.log('Selected:', color),
  },
};
