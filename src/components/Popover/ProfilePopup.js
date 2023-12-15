import {
    Box,
    Button,
    Divider,
    Popover
} from '@mui/material';
import React from 'react';
// import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'
import { useNavigate } from 'react-router-dom';

const ProfilePopup = ({ open, anchorEl, handleClose }) => {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        await localStorage.clear();
        navigate('/login')
    }
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box p={2} width={100}>
                <Divider />
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Button variant="h6" onClick={e => handleLogout(e)}>Logout</Button>
                </Box>
                {/* <Divider />
                <Box mt={2} justifyContent="space-between">
                    <NavLink to={'/cart'}>
                        <Button variant="contained" color="primary" onClick={handleClose}>
                            Cart
                        </Button>
                    </NavLink>
                    <NavLink to={'/checkout'}>
                        <Button variant="contained" color="primary" onClick={handleClose}>
                            Checkout
                        </Button>
                    </NavLink>
                </Box> */}
            </Box>
        </Popover>
    )
}

export default ProfilePopup
