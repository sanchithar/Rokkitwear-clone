import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroSection } from './HeroSection';

const meta = {
  component: HeroSection,
  title: 'Components/HeroSection',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    schoolName: 'Bors House',
    location: 'Kansas City, Missouri',
  },
};

export const WithBannerImage: Story = {
  args: {
    schoolName: 'Bors House',
    location: 'Kansas City, Missouri',
    bannerImage: 'https://via.placeholder.com/1920x400/667eea/ffffff?text=Bors+House+Banner',
  },
};

export const DifferentSchool: Story = {
  args: {
    schoolName: 'Lincoln High School',
    location: 'Portland, Oregon',
  },
};

export const LongNames: Story = {
  args: {
    schoolName: 'The International Academy of Excellence',
    location: 'San Francisco Bay Area, California',
  },
};
