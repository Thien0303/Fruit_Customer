import React, { useState } from 'react'
import { Box, Drawer, IconButton } from '@mui/material'
import Logo from '../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import './HeaderStyles.css'
import CartPopup from '../Popover/CartPopup'
import ProfilePopup from '../Popover/ProfilePopup'
import { useSelector } from 'react-redux'

const Header = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false)
    const [cartAnchorEl, setCartAnchorEl] = useState(null)
    const [profileAnchorEl, setProfileAnchorEl] = useState(null)
    const cartItems = useSelector((state) => state.cart);
    const cartQuantity = cartItems?.length;
    // handle menu click
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }
    //menu drawer
    const handleCartClick = (event) => {
        setCartAnchorEl(event.currentTarget)
    }
    const handleCartClose = () => {
        setCartAnchorEl(null)
    }
    const cartOpen = Boolean(cartAnchorEl)

    const handleProfileClick = (event) => {
        setProfileAnchorEl(event.currentTarget)
    }
    const handleProfileClose = () => {
        setProfileAnchorEl(null)
    }
    const profileOpen = Boolean(profileAnchorEl)

    const user = JSON.parse(localStorage.getItem('user'))
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                    <li className="nav-item"><Link className="nav-link active" aria-current="page" to={'/'}>Home</Link></li>
                    <li className="nav-item"><Link className="nav-link" href="#!">About</Link></li>
                </ul>
                <form className="d-flex">
                    <button className="btn btn-outline-dark" type="submit">
                        <i className="bi-cart-fill me-1"></i>
                        Cart
                        <span className="badge bg-dark text-white ms-1 rounded-pill">{cartQuantity}</span>
                    </button>
                </form>
            </div>
        </Box>
    )
    return (
        // <>
        //     <Box sx={{ display: 'flex-grow', justifyContent: 'space-between' }}>
        //         <AppBar component={'nav'} sx={{ bgcolor: '#FFFFFF', boxShadow: 'none' }}>
        //             <Toolbar>
        //                 <IconButton
        //                     color="inherit"
        //                     aria-label="open drawer"
        //                     edge="start"
        //                     sx={{
        //                         mr: 2,
        //                         display: { sm: 'none' },
        //                     }}
        //                     onClick={handleDrawerToggle}
        //                 >
        //                     <MenuIcon />
        //                 </IconButton>
        //                 <Typography color={'goldenrod'} variant="h6" component="div">
        //                     <img src={Logo} alt="logo" height={'40'} width="170" />
        //                 </Typography>

        //                 <Box
        //                     sx={{
        //                         display: 'flex',
        //                         flexGrow: 15,
        //                         justifyContent: 'center',
        //                     }}
        //                 >
        //                     <ul
        //                         className="navigation-menu"
        //                         style={{ listStyle: 'none', padding: 0 }}
        //                     >
        //                         <li>
        //                             <NavLink
        //                                 activeclassname="active"
        //                                 to={'/'}
        //                                 style={{ color: 'black' }}
        //                             >
        //                                 Home
        //                             </NavLink>
        //                         </li>
        //                         <li>
        //                             <NavLink to={'/menu'} style={{ color: 'black' }}>
        //                                 Shop
        //                             </NavLink>
        //                         </li>
        //                         <li>
        //                             <NavLink to={'/about'} style={{ color: 'black' }}>
        //                                 About
        //                             </NavLink>
        //                         </li>
        //                         <li>
        //                             <NavLink to={'/contact'} style={{ color: 'black' }}>
        //                                 Contact
        //                             </NavLink>
        //                         </li>
        //                     </ul>
        //                 </Box>


        //             </Toolbar>
        //         </AppBar>

        //         <Box>
        //             <Toolbar />
        //         </Box>
        //     </Box>
        // </>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <Link to={'/'}><img src={Logo} alt="logo" height={'40'} width="170" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><Link className="nav-link active" aria-current="page" to={'/'}>Cửa hàng</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={'/cart'}>Giỏ hàng</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={'/checkout'}>Thanh toán</Link></li>
                        {/* <li className="nav-item"><Link className="nav-link" to={'/history'}>History</Link></li> */}
                    </ul>
                    <button className="btn btn-outline-success" onClick={handleCartClick}>
                        Cart
                        <span className="badge bg-success text-black ms-1 rounded-pill">{cartQuantity}</span>
                    </button>
                    <CartPopup
                        open={cartOpen}
                        anchorEl={cartAnchorEl}
                        handleClose={handleCartClose}
                    />
                    {user ?
                        <button className='btn' onClick={handleProfileClick}>
                            <IconButton style={{ color: 'black' }}>
                                <AccountCircleOutlinedIcon />
                            </IconButton>
                        </button> :
                        <button className="btn" onClick={e => navigate('/login')}>
                            Login

                        </button>

                    }
                    <ProfilePopup
                        open={profileOpen}
                        anchorEl={profileAnchorEl}
                        handleClose={handleProfileClose}
                    />
                </div>
                <Box component="nav">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: '240px',
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </div>
        </nav>
    )
}

export default Header
