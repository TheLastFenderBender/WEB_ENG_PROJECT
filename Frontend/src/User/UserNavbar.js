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
import planeImage from '../Images/airplane.png';
import { useNavigate } from 'react-router-dom';


const pages = ['Home', 'Flights', 'Book', 'My Trips'];
const settings = ['Profile', 'Logout'];
// ... (previous imports)

// const flightOptions = ['Flight Detail', 'Flight Schedule', 'Flight Status', 'Reserve Seat', 'Seat Reservation'];
// const bookingOptions = ['Book a Flight', 'Payment', 'Cancel Booking'];
const myTripsOptions = [ 'Booking Details'];


function NavBar({ userName, userId }) {

    const navigate = useNavigate();

    // const [anchorElFlights, setAnchorElFlights] = React.useState(null);
    const [anchorElBookings, setAnchorElBookings] = React.useState(null);
    const [anchorElMyTrips, setAnchorElMyTrips] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    // const handleOpenFlightsMenu = (event) => {
    //     setAnchorElFlights(event.currentTarget);
    // };

    // const handleCloseFlightsMenu = () => {
    //     setAnchorElFlights(null);
    // };
   

    const handleOpenBookMenu = (event) => {
        // setAnchorElFlights(null);
        setAnchorElBookings(event.currentTarget);
    };

    const handleCloseBookMenu = () => {
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

    const handleSettings = (setting) => {
        if (setting === 'Profile') {
            navigate(`/UserProfile/${userId}`); 
        } else if (setting === 'Logout') {
            navigate('/login'); 
        }
    };

    const handleHome = () => {
        navigate('/UserDashBoard'); // Redirect to user dashboard (home)
    };


    const handleMyTripsOption = (option) => {
        if (option === 'Booking Details') {
            navigate(`/BookingDetails/${userId}`); // Navigate to the booking details page
        } else {
            // Handle other options if needed
        }
    };
    const handleBookOption = () => {
        // if (option === 'Book a Flight') {
            // Handle 'Book a Flight' click, navigate or render the SearchFlight component
        navigate(`/BookFlight/${userId}`); // Navigate to the book flight page
        // }
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
                                    // if (page === 'Flights') handleOpenFlightsMenu(event);
                                    // else 
                                    if (page === 'Book') handleBookOption();
                                    else if (page === 'My Trips') handleOpenMyTripsMenu(event);
                                    else if (page === 'Home') handleHome();
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Flight options dropdown */}
                    {/* <Menu
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
                    </Menu> */}

                    {/* Book options dropdown */}
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
                        onClose={handleCloseBookMenu}
                    >
                        {/* {bookingOptions.map((option) => (
                            <MenuItem key={option} onClick={() => handleBookOption(option)}>
                                <Typography textAlign="center">
                                    <Link to={`/${option.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {option}
                                    </Link>
                                </Typography>
                            </MenuItem>
                        ))} */}
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
                        onClose={handleCloseBookMenu}
                    >
                        {/* {bookingOptions.map((option) => (
                            <MenuItem key={option} onClick={handleCloseBookMenu}>
                                <Typography textAlign="center">
                                    <Link to={`/bookings/${option.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {option}
                                    </Link>
                                </Typography>
                            </MenuItem>
                        ))} */}
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
                            <MenuItem key={option} onClick={() => handleMyTripsOption(option)}>
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
                                <MenuItem key={setting} onClick={() => handleSettings(setting)}>
                                    {/* <MenuItem key={setting} onClick={handleCloseUserMenu} > */}

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
