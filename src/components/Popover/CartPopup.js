import React from 'react'
import {
    Popover,
    List,
    ListItem,
    Typography,
    Box,
    Button,
    IconButton,
    Divider,
} from '@mui/material'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {removeFromCart} from '../../redux/Reducers/CartSlice';
const CartPopup = ({ open, anchorEl, handleClose }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const calculateSubtotal = () => {
        return cartItems.reduce((total, product) => {
            return total + product.quantity * product.price
        }, 0)
    }
    const handleRemove = (fruitId) => {
        dispatch(removeFromCart({ fruitId }));
      };
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
            <Box p={2} width={400}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">Mua sắm sản phẩm</Typography>
                </Box>
                <List>
                    {cartItems.map((product) => (
                        <ListItem key={product.fruitId}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                width="100%"
                            >
                                <Box display="flex" alignItems="center">
                                    <img
                                        src={product.fruitImages[0]?.imageUrl}
                                        alt={product.fruitName}
                                        style={{ width: 50, marginRight: 10, objectFit: 'cover' }}
                                    />
                                    <Typography variant="body1">{product.fruitName}</Typography>
                                </Box>
                                <Typography variant="body2">
                                    {product.quantity} x {product.price?.toFixed(3)}
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        onClick={() => handleRemove(product.fruitId)}
                                    >
                                        <HighlightOffRoundedIcon />
                                    </IconButton>
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Tổng tiền:</Typography>
                    <Typography variant="subtitle1">{calculateSubtotal()?.toFixed(3)} vnđ</Typography>
                </Box>
                <Box mt={2} display="flex" justifyContent="space-between">
                    <NavLink to={'/cart'}>
                        <Button variant="contained" color="primary" onClick={handleClose}>
                            Giỏ hàng
                        </Button>
                    </NavLink>
                    <NavLink to={'/checkout'}>
                        <Button variant="contained" color="primary" onClick={handleClose}>
                            Thanh toán
                        </Button>
                    </NavLink>
                </Box>
            </Box>
        </Popover>
    )
}

export default CartPopup
