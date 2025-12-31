import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Badge,
  IconButton,
  Box,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSchoolsData } from '../../hooks';
import './Header.scss';

interface HeaderProps {
  cartItemCount?: number;
  onSearch?: (query: string) => void;
}

export const Header = ({ cartItemCount = 0, onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { data: schoolsList, isLoading: schoolsLoading } = useSchoolsData();

  // derive current selected school id from URL query param
  const params = new URLSearchParams(location.search);
  const currentSchoolId = params.get('schoolId');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <AppBar position="sticky" className="header" color="default" elevation={1}>
      <Toolbar className="header__toolbar">
        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          className="header__logo"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          RokkitWear
        </Typography>

        {/* Search Bar */}
        <Box
          component="form"
          onSubmit={handleSearch}
          className="header__search"
        >
          <TextField
            size="small"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header__search-input"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end" size="small">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Navigation Links */}
        <Box className="header__nav" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          {/* Schools selector: when selecting a school navigate to /schools?schoolId=... */}
          {schoolsList && schoolsList.length > 0 ? (
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel id="header-school-select-label">Schools</InputLabel>
              <Select
                labelId="header-school-select-label"
                value={currentSchoolId ?? 'all'}
                label="Schools"
                onChange={(e) => {
                  const id = e.target.value as string;
                  if (id === 'all') {
                    navigate('/schools');
                  } else {
                    navigate(`/schools?schoolId=${encodeURIComponent(id)}`);
                  }
                }}
                displayEmpty
                renderValue={(value) => {
                  const val = value as string;
                  if (!val || val === 'all') return 'All Schools';
                  const found = (schoolsList || []).find((s) => s.id === val);
                  return found ? found.name : 'Schools';
                }}
              >
                <MenuItem value={'all'}>All Schools</MenuItem>
                {schoolsList.map((s) => (
                  <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Button component={Link} to="/schools" color="inherit">
              Schools
            </Button>
          )}
        </Box>

        {/* Cart Icon */}
        <IconButton
          component={Link}
          to="/cart"
          color="inherit"
          className="header__cart"
        >
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
