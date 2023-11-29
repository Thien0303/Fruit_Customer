import React from 'react'
import './index.css'
import { IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { Link, useNavigate } from 'react-router-dom'
import {
    removeFromCart,
    updateQuantity
  } from "../../redux/Reducers/CartSlice";
import { useDispatch, useSelector } from 'react-redux'
const Cart = () => {
    const cartItems = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const calculateTotal = () => {
        return cartItems.reduce((total, product) => {
            return total + product.quantity * product.price
        }, 0)
    }

    const handleQuantityChange = (fruitId, quantity) => {
        dispatch(updateQuantity({ productId: fruitId, quantity }));
    };
    
    const handleRemove = (fruitId) => {
        dispatch(removeFromCart({ fruitId }));
      };
    return (
        <>
            <header className="header">
                <div className="container">
                    <h1 className="display-4 fw-bolder">Vỏ hàng của bạn</h1>
                </div>
            </header>

            <section className="shopping-cart bg-light py-5">
                <div className="container">
                    <div className="content">
                        <div className="row">
                            <div className="col-md-12 col-lg-8">
                                <div className="items">
                                    {cartItems.map((product) => (
                                        <div className="product">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <img className="img-fluid mx-auto d-block image" src={product.fruitImages[0].imageUrl} alt={product.fruitName} />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="info">
                                                        <div className="row">
                                                            <div className="col-md-5 product-name">
                                                                <div className="product-name">
                                                                    <Link to={`/detail/${product.fruitId}`}>{product.fruitName}</Link>
                                                                    <div className="product-info">
                                                                        <div>Category: <span className="value">{product.categoryFruitName}</span></div>
                                                                        <div>Origin: <span className="value">{product.originCity}</span></div>
                                                                        <div>Quantity Available: <span className="value">{product.quantityAvailable}</span></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 quantity">
                                                                <label for="quantity">Quantity:</label>
                                                                <input
                                                                    id="quantity"
                                                                    type="number"
                                                                    value={product.quantity}
                                                                    min={0}
                                                                    max={product.quantityAvailable}
                                                                    className="form-control quantity-input"
                                                                    onChange={(e) => handleQuantityChange(product.fruitId, e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-md-3 price">
                                                                <span>${product.price}</span>
                                                                <IconButton
                                                                    edge="end"
                                                                    color="inherit"
                                                                    onClick={() => handleRemove(product.fruitId)}
                                                                >
                                                                    <ClearIcon />
                                                                </IconButton>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                                <div className="summary">
                                    <h3>Tóm tắt đơn hàng</h3>
                                    <div className="summary-item"><span className="text">Tổng tiền</span><span className="price">{calculateTotal().toFixed(3)} vnđ</span></div>
                                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={e => navigate(`/checkout`)}>Thanh toán</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart
