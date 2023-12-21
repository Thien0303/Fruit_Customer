import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../../redux/Reducers/CartSlice";
import { getAllDiscountFruit } from '../../redux/apiThunk/discountThunk';
const FruitList = (data) => {
    const [discountData, setDiscountData] = useState([]);
    const dispatch = useDispatch();
    console.log("data: ", data);
    useEffect(() => {
        dispatch(getAllDiscountFruit({ discountName: "", discountExpiryDate: "" }))
          .unwrap()
          .then((data) => {
            setDiscountData(data.data);
          })
          .catch((error) => {
            console.error("Error fetching discount data:", error);
          });
      }, [dispatch]);
    const handleAddToCart = (product) => {
        const findDis = discountData?.reduce((prev, curr, index) => {
          if (
            product?.fruitId === curr?.fruitId &&
            curr?.discountPercentage > (prev?.discountPercentage || 0) &&
            (curr?.discountThreshold || 0) > 0
          ) {
            return curr;
          }
          return prev;
        }, {});
    
        dispatch(
          addToCart({
            ...product,
            quantity: 1,
            percent: findDis.discountPercentage * 100,
            depositAmount: findDis.depositAmount,
            fruitDiscountId: findDis?.fruitDiscountId,
          })
        );
        toast.success("Đã thêm vào vỏ hàng!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };

    return (
        <>
            {data?.data?.map(product => (
                <div className="col mb-2 mb-lg-5" key={product?.fruitId}>
                    <div className="card h-100">
                        <Link to={`/detail/${product?.fruitId}`} style={{ color: 'inherit', textDecoration: 'inherit' }} key={product?.fruitId}>
                            <img className="card-img-top" style={{ height: '150px' }} src={product?.fruitImages[0]?.imageUrl} alt={product?.fruitName} />
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder fs-5">{product?.fruitName}</h5>
                                    <div className="d-flex justify-content-center small text-warning mb-1">
                                    </div>
                                    Loại đặt hàng: {product?.orderType}
                                    <hr/>

                                    <span style={{color: "red"}}> Giá: {product?.price.toFixed(3)} vnđ/kg</span>
                                </div>
                            </div>
                        </Link>
                        <div className="card-footer p-3 pt-0 border-top-0 bg-transparent">
                            <div className="text-center"><button style={{ backgroundColor: 'green', color: 'white' }} className="btn btn-outline-dark mt-auto" onClick={() => handleAddToCart(product)}>Thêm vào vỏ hàng</button></div>
                        </div>
                    </div>
                </div>
            ))}
             <ToastContainer/>
        </>
    )
}

export default FruitList
