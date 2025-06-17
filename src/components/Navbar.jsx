import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Custom NavLink style
  const linkStyle = ({ isActive }) => ({
    color: isActive ? 'black' : 'white',
    backgroundColor: isActive ? 'gold' : 'transparent',
    padding: '8px 16px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    display: 'inline-block',
  });

  const mobileLinkStyle = ({ isActive }) => ({
    color: isActive ? 'black' : 'black',
    backgroundColor: isActive ? '#ffd70055' : 'transparent',
    textDecoration: 'none',
    padding: '12px 20px',
    width: '100%',
    display: 'block',
  });

  return (
    <div className='mt-20'>
    <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop logo */}
          <Box
            component="img"
            src="/logo-watchg.svg"
            alt="Watch G Logo"
            sx={{ display: { xs: 'none', md: 'flex' }, height: 40, mr: 2 }}
          />

          {/* Mobile menu icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/" style={mobileLinkStyle}>
                  Home
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/Product" style={mobileLinkStyle}>
                  Product
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/Men" style={mobileLinkStyle}>
                  Men
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/Women" style={mobileLinkStyle}>
                  Women
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/Children" style={mobileLinkStyle}>
                  Children
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/Contact" style={mobileLinkStyle}>
                  Contact
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/Login" style={mobileLinkStyle}>
                  Login
                </NavLink>
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile logo */}
          <Box
            component="img"
            src="/logo-watchg.svg"
            alt="Watch G Logo"
            sx={{ display: { xs: 'flex', md: 'none' }, height: 40, mr: 1 }}
          />

          {/* Desktop nav links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 , marginLeft: "40px" }}>
            <NavLink to="/" style={linkStyle}>
              Home
            </NavLink>
            <NavLink to="/Product" style={linkStyle}>
              Product
            </NavLink>
            <NavLink to="/Men" style={linkStyle}>
              Men
            </NavLink>
            <NavLink to="/Women" style={linkStyle}>
              Women
            </NavLink>
            <NavLink to="/Children" style={linkStyle}>
              Children
            </NavLink>
            <NavLink to="/Contact" style={linkStyle}>
              Contact
            </NavLink>
            <NavLink to="/Login" style={linkStyle}>
              Login
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
      <Outlet />
    </div>
  );
}

export default Navbar;
