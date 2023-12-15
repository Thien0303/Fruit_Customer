import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FruitList from '../../components/ListFruit'
import { getFruit } from '../../redux/apiThunk/fruitThunk'
import './index.css'
const Home = () => {
    const dispatch = useDispatch()
    const [word, setWord] = useState('');

    useEffect(() => {
        dispatch(getFruit({ name: '', min: '', max: '', newDate: '', createDate: '', user: '' }))
    }, [dispatch])
    const fruitList = useSelector((state) => state.fruit.fruit)
    
    return (
        <>
            <header className="header">
                <div className="container">
                    <h1 className="display-4 fw-bolder">Trái cây tươi</h1>
                </div>
            </header>
            <section className="py-5 bg-light">
                <div className="container px-1 px-lg-5 mt-3">
                    <div className="container justify-content-center search">
                        <div className="row ">
                            <Link to="/search" className="input-group mb-5" style={{textDecoration: "none"}}>
                                <input
                                    type="text"
                                    className="form-control input-text"
                                    placeholder="Tìm kiếm sản phẩm"
                                    value={word}
                                    onChange={(e) => setWord(e.target.value)}
                                    required
                                />
                                <div className="input-group-append">
                                    <button className="btn" type="submit">Tìm kiếm</button>
                                </div>
                                </Link>
                        </div>
                    </div>
                    <div className="row gx-2 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
                        <FruitList data={fruitList.data} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
