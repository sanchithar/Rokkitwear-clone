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
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './Header.scss';

interface HeaderProps {
  cartItemCount?: number;
  onSearch?: (query: string) => void;
}

export const Header = ({ cartItemCount = 0, onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

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
        <Box className="header__nav">
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/schools" color="inherit">
            Schools
          </Button>
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
