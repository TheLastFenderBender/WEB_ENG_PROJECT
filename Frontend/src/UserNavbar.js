import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import planeImage from './Images/airplane.png';

const pages = ['Home', 'Flights', 'Bookings', 'My Trips'];
const settings = ['Profile', 'Logout'];
// ... (previous imports)

const flightOptions = ['Flight Detail', 'Flight Schedule', 'Flight Status', 'Reserve Seat', 'Seat Reservation'];
const bookingOptions = ['Booking Details', 'Book a Flight', 'Payment', 'Cancel Booking'];
const myTripsOptions = ['Booking History', 'Refunds' , 'Feedback'];

function NavBar({ userName }) {
    const [anchorElFlights, setAnchorElFlights] = React.useState(null);
    const [anchorElBookings, setAnchorElBookings] = React.useState(null);
    const [anchorElMyTrips, setAnchorElMyTrips] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenFlightsMenu = (event) => {
        setAnchorElFlights(event.currentTarget);
    };

    const handleCloseFlightsMenu = () => {
        setAnchorElFlights(null);
    };

    const handleOpenBookingsMenu = (event) => {
        setAnchorElBookings(event.currentTarget);
    };

    const handleCloseBookingsMenu = () => {
        setAnchorElBookings(null);
    };

    const handleOpenMyTripsMenu = (event) => {
        setAnchorElMyTrips(event.currentTarget);
    };

    const handleCloseMyTripsMenu = () => {
        setAnchorElMyTrips(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Add your image on the left side */}
                    <img src={planeImage} alt="Avio Logo" style={{ height: '40px', marginRight: '10px' }} />

                    {/* Avio title */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 'auto',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Avio
                    </Typography>

                    {/* Navigation links for larger screens */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={(event) => {
                                    if (page === 'Flights') handleOpenFlightsMenu(event);
                                    else if (page === 'Bookings') handleOpenBookingsMenu(event);
                                    else if (page === 'My Trips') handleOpenMyTripsMenu(event);
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Flight options dropdown */}
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-flights"
                        anchorEl={anchorElFlights}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElFlights)}
                        onClose={handleCloseFlightsMenu}
                    >
                        {flightOptions.map((option) => (
                            <MenuItem key={option} onClick={handleCloseFlightsMenu}>
                                <Typography textAlign="center">
                                    <Link to={`/flights/${option.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {option}
                                    </Link>
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>

                    {/* Booking options dropdown */}
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-bookings"
                        anchorEl={anchorElBookings}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElBookings)}
                        onClose={handleCloseBookingsMenu}
                    >
                        {bookingOptions.map((option) => (
                            <MenuItem key={option} onClick={handleCloseBookingsMenu}>
                                <Typography textAlign="center">
                                    <Link to={`/bookings/${option.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {option}
                                    </Link>
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>

                    {/* My Trips options dropdown */}
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-my-trips"
                        anchorEl={anchorElMyTrips}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElMyTrips)}
                        onClose={handleCloseMyTripsMenu}
                    >
                        {myTripsOptions.map((option) => (
                            <MenuItem key={option} onClick={handleCloseMyTripsMenu}>
                                <Typography textAlign="center">
                                    <Link to={`/my-trips/${option.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {option}
                                    </Link>
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>

                    {/* User profile and logout */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" >{userName ? userName.charAt(0) : 'U'} </Avatar>
                            </IconButton>
                        </Tooltip>
                        {/* User menu for settings */}
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
                                        <Link to={`/${setting.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            {setting}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
