import { Box, Container, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './HeroSection.scss';

interface HeroSectionProps {
  schoolName: string;
  location: string;
  bannerImage?: string;
  schools?: { id: string; name: string }[];
  selectedSchoolId?: string;
  onSchoolChange?: (id: string) => void;
}

export const HeroSection = ({
  schoolName,
  location,
  bannerImage,
  schools,
  selectedSchoolId,
  onSchoolChange,
}: HeroSectionProps) => {
  return (
    <Box
      className="hero"
      sx={{
        backgroundImage: bannerImage ? `url(${bannerImage})` : 'url(https://t4.ftcdn.net/jpg/04/83/15/83/360_F_483158387_4wz34VwAvs4Z7iXmJMGKXcz4HygYFvmL.jpg)',
      }}
    >
      <div className="hero__overlay" />
      <Container className="hero__content">
        {/* {schools && schools.length > 0 && onSchoolChange && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel id="hero-school-select-label">School</InputLabel>
              <Select
                labelId="hero-school-select-label"
                value={selectedSchoolId || ''}
                label="School"
                onChange={(e) => onSchoolChange(e.target.value as string)}
                sx={{ background: 'rgba(255,255,255,0.9)' }}
              >
                {schools.map((s) => (
                  <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )} */}
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
