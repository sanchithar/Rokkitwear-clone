import { Box, Container, Typography } from '@mui/material';
import './HeroSection.scss';

interface HeroSectionProps {
  schoolName: string;
  location: string;
  bannerImage?: string;
}

export const HeroSection = ({
  schoolName,
  location,
  bannerImage,
}: HeroSectionProps) => {
  return (
    <Box
      className="hero"
      sx={{
        backgroundImage: bannerImage ? `url(${bannerImage})` : 'none',
      }}
    >
      <div className="hero__overlay" />
      <Container className="hero__content">
        <Typography variant="h2" component="h1" className="hero__title">
          {schoolName}
        </Typography>
        <Typography variant="h5" component="p" className="hero__location">
          {location}
        </Typography>
      </Container>
    </Box>
  );
};

export default HeroSection;
