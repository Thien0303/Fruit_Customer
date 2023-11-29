import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import Popup from '../../components/Popover/CartPayment'
import { toast } from 'react-toastify'
import { getAllDiscountFruit } from '../../redux/apiThunk/discountThunk'
import { createAllOrder, getAllSupplier } from '../../redux/apiThunk/orderThunk'
import {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    removeFromCartByFamer,
    selectPercent,
} from '../../redux/Reducers/CartSlice'
const validationSchema = yup.object({
    deliveryAddress: yup.string().required('Delivery address is required'),
    phoneNumber: yup.string().matches(/^0/, "Số điện thoại phải bắt đầu bằng '0'").min(10, "Số điện thoại ít nhất là 10 số").max(11, "Số điện thoại nhiều nhất là 11 số").required("Bắt buộc nhập số điện thoại"),
})

// import { IconButton } from '@mui/material'
// import ClearIcon from '@mui/icons-material/Clear'
// import { Link } from 'react-router-dom'

const Checkout = () => {
    const currentDate = new Date().toLocaleDateString()
    const [open, setOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const [depositPrice, setDepositPrice] = useState("");
    const cartItems = useSelector((state) => state.cart)
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const [discountData, setDiscountData] = useState([])
    const [userData, setUserData] = useState([])
    const [loadAgain, setLoadAgain] = useState(true)
    useEffect(() => {
        dispatch(getAllDiscountFruit({ discountName: '', discountExpiryDate: '' }))
            .unwrap()
            .then((data) => {
                setDiscountData(data.data)
            })
            .catch((error) => {
                console.error('Error fetching discount data:', error)
            })
    }, [])
    useEffect(() => {
        if (loadAgain) {
            const updatedUserData = userData.map((user) => {
                let total = 0
                let intrasitAmout = 0

                for (let j = 0; j < cartItems.length; j++) {
                    if (user.userId === cartItems[j].userId) {
                        const quantity = cartItems[j].quantity || 0
                        const percent = cartItems[j].percent || 0
                        const price = cartItems[j].price || 0
                        const deposit = cartItems[j].depositAmount || 0

                        total += quantity * price - (quantity * price * percent) / 100

                        if (percent > 0) {
                            intrasitAmout +=
                                (quantity * price - (quantity * price * percent) / 100) * deposit
                        }
                    }
                }
                return {
                    ...user,
                    total: total,
                    intrasitAmout: intrasitAmout,
                }
            })
            setUserData(updatedUserData)
            setLoadAgain(false)
        }
    }, [loadAgain, userData, cartItems])

    useEffect(() => {
        dispatch(getAllSupplier({ fullName: '', roleName: 'Supplier' }))
            .unwrap()
            .then((data) => {
                if (data.data.length > 0) {
                    const updatedUserData = data.data.map((apiUser) => {
                        const existingUser = userData.find((user) => user.userId === apiUser.userId)

                        if (existingUser) {
                            return {
                                ...existingUser,
                                total: apiUser.total,
                                intrasitAmout: apiUser.intrasitAmout,
                            }
                        } else {
                            return apiUser
                        }
                    })

                    setUserData(updatedUserData)
                    setLoadAgain(true)
                }
            })
            .catch((error) => {
                console.error('Error fetching discount data:', error)
            })
    }, [])

    const formik = useFormik({
        initialValues: {
            deliveryAddress: '',
            phoneNumber: '',
            userId: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const { userId } = values
            const cartItemsByFarmer = cartItems.filter((item) => item.userId === userId)
            const orderDetail = []
            for (const item of cartItemsByFarmer) {
                var orderDetailData = {
                    fruitId: item.fruitId,
                    quantity: item.quantity,
                }

                if (item.orderType === 'PreOrder') {
                    const discountInfo = discountData.find(
                        (discount) => discount.fruitName === item.fruitName
                    )

                    if (discountInfo) {
                        orderDetailData.fruitDiscountId = discountInfo.fruitDiscountId
                    }
                }
                orderDetail.push(orderDetailData)
            }
            const orderData = {
                userId: user.userId,
                deliveryAddress: values.deliveryAddress,
                phoneNumber: values.phoneNumber,
                orderDetails: orderDetail,
            }
            try {
                const [orderResult] = await Promise.all([dispatch(createAllOrder(orderData))])

                if (orderResult?.payload) {
                    const hasPreOrder = cartItemsByFarmer.some(
                        (item) => item.orderType === 'PreOrder'
                    )
                    if (hasPreOrder) {
                        const res = orderResult.payload
                        setDepositPrice(res?.depositAmount)
                        setImageUrl(res?.sellerImageMomoUrl)
                        setOpen(true)
                    } 
                    dispatch(removeFromCartByFamer(userId))
                }
            } catch (error) {
                toast.error('Lỗi khi đặt hàng')
            }

            resetForm()
        },
    })
    const handleRemove = (fruitId) => {
        dispatch(removeFromCart({ fruitId }))
        setLoadAgain(true)
    }

    const handleIncreaseQuantity = (fruitId) => {
        const fruit = cartItems.find((item) => item.fruitId === fruitId)
        if (fruit && fruit.quantity < fruit.quantityAvailable) {
            dispatch(increaseQuantity({ fruitId }))
            setLoadAgain(true)
        } else {
            alert('Số lượng sản phẩm không đủ')
        }
    }
    const handleDecreaseQuantity = (fruitId) => {
        dispatch(decreaseQuantity({ fruitId }))
        setLoadAgain(true)
    }
    const handleSelectDiscount = (fruitId, id) => {
        const discountItem = discountData?.find((item) => item?.fruitDiscountId === id)
        dispatch(
            selectPercent({
                fruitId,
                percent: discountItem?.discountPercentage * 100 || 0,
                depositAmount: discountItem.depositAmount,
                fruitDiscountId: discountItem?.fruitDiscountId,
            })
        )
        setLoadAgain(true)
    }
    return (
        <>
            <header className="header">
                <div className="container">
                    <h1 className="display-4 fw-bolder">Thủ tục thanh toán</h1>
                </div>
            </header>

            <section className="shopping-cart bg-light py-5">
                <div className="container">
                    <div className="content">
                        <div className="row">
                            <div className="col-md-12 col-lg-6">
                                <div className="items">
                                    <form onSubmit={formik.handleSubmit}>
                                        <TextField
                                            label="Địa chỉ"
                                            variant="outlined"
                                            name="deliveryAdress"
                                            fullWidth
                                            margin="normal"
                                            {...formik.getFieldProps('deliveryAddress')}
                                            error={
                                                formik.touched.deliveryAddress &&
                                                Boolean(formik.errors.deliveryAddress)
                                            }
                                            helperText={
                                                formik.touched.deliveryAddress &&
                                                formik.errors.deliveryAddress
                                            }
                                            sx={{ width: '80%', marginLeft: "10px" }}
                                        />

                                        <TextField
                                            label="Số điện thoại"
                                            variant="outlined"
                                            fullWidth
                                            name="phoneNumber"
                                            margin="normal"
                                            {...formik.getFieldProps('phoneNumber')}
                                            error={
                                                formik.touched.phoneNumber &&
                                                Boolean(formik.errors.phoneNumber)
                                            }
                                            helperText={
                                                formik.touched.phoneNumber &&
                                                formik.errors.phoneNumber
                                            }
                                            sx={{ width: '80%', marginLeft: "10px"  }}
                                        />

                                        <Typography variant="subtitle1" gutterBottom style={{marginLeft: "10px" }}>
                                            Ngày đặt hàng: {currentDate}
                                        </Typography>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-10 col-lg-6">
                                <div className="summary">
                                    <h3>Tóm tắt đơn hàng</h3>
                                    {cartItems?.length > 0 &&
                                        userData?.map((f) => (
                                            <Box key={f.id}>
                                                {cartItems.filter(
                                                    (check) => check.userId === f.userId
                                                )?.length > 0 && (
                                                    <Typography sx={{fontSize: "15px", fontWeight: "bold"}} mb={1}>{f.fullName}</Typography>
                                                )}
                                                {cartItems
                                                    .filter(
                                                        (check) => check.userId === f.userId
                                                    )
                                                    .map((item) => {
                                                        return (
                                                            <Paper
                                                                key={item.fruitId}
                                                                elevation={3}
                                                                style={{
                                                                    marginBottom: '10px',
                                                                    padding: '15px',
                                                                    width: '100%',
                                                                    maxWidth: '900px',
                                                                }}
                                                            >
                                                                <Box
                                                                    key={item.fruitId}
                                                                    display="flex"
                                                                    alignItems="center"
                                                                >
                                                                    <img
                                                                        src={
                                                                            item.fruitImages[0]
                                                                                ?.imageUrl
                                                                        }
                                                                        alt={
                                                                            item.fruitImages[0]
                                                                                ?.fruitName
                                                                        }
                                                                        style={{
                                                                            width: '50px',
                                                                            marginRight: '10px',
                                                                            objectFit: 'cover',
                                                                        }}
                                                                    />
                                                                    <Box flexGrow={1}>
                                                                        <Typography variant="subtitle1">
                                                                            {item.fruitName}
                                                                        </Typography>
                                                                        <Typography>
                                                                            Quantity:{' '}
                                                                            {item.quantity} x {item.price.toFixed(3)}
                                                                        </Typography>
                                                                        {item?.orderType ===
                                                                            'PreOrder' && (
                                                                            <FormControl
                                                                                sx={{
                                                                                    m: 1,
                                                                                    minWidth: 120,
                                                                                }}
                                                                                size="small"
                                                                            >
                                                                                <InputLabel id="demo-select-small-label">
                                                                                    Mã giảm giá
                                                                                </InputLabel>
                                                                                <Select
                                                                                    labelId="demo-select-small-label"
                                                                                    id="demo-select-small"
                                                                                    label="Discount"
                                                                                    value={
                                                                                        item?.fruitDiscountId
                                                                                    }
                                                                                    onChange={(
                                                                                        value
                                                                                    ) => {
                                                                                        handleSelectDiscount(
                                                                                            item?.fruitId,
                                                                                            value
                                                                                                ?.target
                                                                                                ?.value
                                                                                        )
                                                                                        console.log(
                                                                                            'Handle: ',
                                                                                            value
                                                                                        )
                                                                                        return value
                                                                                    }}
                                                                                >
                                                                                    {discountData?.map(
                                                                                        (ite) => {
                                                                                            if (
                                                                                                item?.fruitId ===
                                                                                                    ite?.fruitId &&
                                                                                                ite?.discountThreshold >
                                                                                                    0
                                                                                            ) {
                                                                                                return (
                                                                                                    <MenuItem
                                                                                                        value={
                                                                                                            ite?.fruitDiscountId
                                                                                                        }
                                                                                                    >{`${
                                                                                                        ite?.discountName
                                                                                                    }: (${
                                                                                                        ite?.discountPercentage *
                                                                                                        100
                                                                                                    } %)`}</MenuItem>
                                                                                                )
                                                                                            }
                                                                                            return null
                                                                                        }
                                                                                    )}
                                                                                </Select>
                                                                            </FormControl>
                                                                        )}
                                                                    </Box>
                                                                    <Box
                                                                        display="flex"
                                                                        alignItems="center"
                                                                    >
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                handleDecreaseQuantity(
                                                                                    item.fruitId
                                                                                )
                                                                            }
                                                                        >
                                                                            <RemoveIcon />
                                                                        </IconButton>
                                                                        <Typography>
                                                                            {item.quantity}
                                                                        </Typography>
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                handleIncreaseQuantity(
                                                                                    item.fruitId
                                                                                )
                                                                            }
                                                                        >
                                                                            <AddIcon />
                                                                        </IconButton>
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                handleRemove(
                                                                                    item.fruitId
                                                                                )
                                                                            }
                                                                        >
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </Box>
                                                                </Box>
                                                            </Paper>
                                                        )
                                                    })}
                                                {cartItems.filter(
                                                    (check) => check.userId === f.userId
                                                )?.length > 0 && (
                                                    <Box>
                                                        <Typography
                                                            variant="subtitle1"
                                                            gutterBottom
                                                        >
                                                            Tổng số tiền cần trả trước:{' '}
                                                            {f?.intrasitAmout * 1000 || 0} vnđ
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle1"
                                                            gutterBottom
                                                        >
                                                            Tổng số tiền cần trả sau khi nhận hàng:{' '}
                                                            {f?.total
                                                                ? (f.total - f.intrasitAmout) * 1000
                                                                : 0} vnđ
                                                        </Typography>
                                                        <Button
                                                            onClick={() => {
                                                                formik.setValues({
                                                                    ...formik.values,
                                                                    userId: f.userId,
                                                                })
                                                                formik.handleSubmit()
                                                            }}
                                                            variant="contained"
                                                            color="primary"
                                                        >
                                                            Đặt hàng
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Popup open={open} onClose={() => setOpen(false)} imageUrl={imageUrl} depositPrice={depositPrice}/>
            </section>
        </>
    )
}

export default Checkout
