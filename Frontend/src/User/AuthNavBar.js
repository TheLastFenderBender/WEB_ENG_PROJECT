import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import planeImage from '../Images/airplane.png';
import Typography from '@mui/material/Typography';

function AuthNavBar() {
    return (
        <AppBar position="static">
            <Toolbar disableGutters>
                {/* Logo */}
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
            </Toolbar>
        </AppBar>
    );
}

export default AuthNavBar;
