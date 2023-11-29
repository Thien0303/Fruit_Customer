import React, { useState, useEffect } from 'react'
import './index.css'
import FruitList from '../../components/ListFruit'
import { useSelector, useDispatch } from 'react-redux'
import { getFruit } from '../../redux/apiThunk/fruitThunk'
import { useNavigate } from 'react-router-dom';
import Search from '../Search';
import {setKeyword} from '../../redux/Reducers/KeywordSlice'
const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [word, setWord] = useState('');

    useEffect(() => {
        dispatch(getFruit({ name: '', min: '', max: '', newDate: '', createDate: '', user: '' }))
    }, [dispatch])
    const fruitList = useSelector((state) => state.fruit.fruit)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        navigate(`/search`)
        await dispatch(setKeyword(word));
    };
    
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
                            <form className="input-group mb-5" onSubmit={e => handleFormSubmit(e)}>
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
                            </form>
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
