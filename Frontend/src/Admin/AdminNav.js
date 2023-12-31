import * as React from 'react';
import {useState} from 'react'
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import SettingSIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SuperAdminIcon from '@mui/icons-material/AdminPanelSettings';
import styles from "./AdminPage.module.css"
import ManageUsers from "./ManageUser"
import ManageRefunds from './ManageRefunds';
import ManageBookings from './ManageBookings';
const pages = ['Manage Users', 'Manage Refunds', 'Manage Bookings'];
const settings = ['Logout'];

function AdminNav() {
  const [activeOption, setActiveOption] = useState(''); 
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // Function to render the selected option content
  const renderOption = () => {
    switch (activeOption) {
      case 'ManageUsers':
        return <ManageUsers />;
      case 'ManageRefunds':
        return <ManageRefunds />;
      case 'ManageBookings':
        return <ManageBookings />;
      default:
        return null;
    }
  };

  return (
    <div>
        <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <SuperAdminIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Link to="/AdminPage" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Typography
                variant="h6"
                noWrap
                component="span"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
                >
                Admin
                </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
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
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <SuperAdminIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page === 'Manage Users' ? (
                    <div  style={{ color: 'inherit', textDecoration: 'none' }}  onClick={() => setActiveOption('ManageUsers')}>
                        {page}
                    </div>
                    ) : page === 'Manage Refunds' ? (
                        <div  style={{ color: 'inherit', textDecoration: 'none' }} onClick={() => setActiveOption('ManageRefunds')}>
                        {page}
                    </div>
                    ) : page === 'Manage Bookings' ? (
                        <div  style={{ color: 'inherit', textDecoration: 'none' }} onClick={() => setActiveOption('ManageBookings')}>
                        {page}
                    </div>
                    ) : (
                    page
                    )}
                </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <SettingSIcon sx={{ display: { xs: 'none', md: 'flex', color: 'white' }, mr: 1 }} />
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                        {setting === 'Logout' ? (
                        <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                            {setting}
                        </Link>
                        ) : (
                        setting
                        )}
                    </Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
        <div className={styles.miniContainer}>
          {renderOption()}
        </div>
    </div>
  );
}
export default AdminNav;