import React, { useState, useEffect } from 'react'
import FruitList from '../../components/ListFruit'
import { useSelector, useDispatch } from 'react-redux'
import { getFruit } from '../../redux/apiThunk/fruitThunk'

const Search = () => {
    const dispatch = useDispatch()
    const keyword= useSelector((state) => state?.keyword?.value);
    const [searchQuery, setSearchQuery] = useState(keyword);

    // useEffect(() => {
    //     if (searchQuery.trim() !== '') {
    //         dispatch(getFruit({ name: searchQuery, min: '', max: '', newDate: '', createDate: '', user: '' }))
    //     }
    // }, [dispatch, searchQuery])

    const handleFormSubmit = (e) => {
        e.preventDefault();
            dispatch(getFruit({ name: searchQuery, min: '', max: '', newDate: '', createDate: '', user: '' }))
    };
    const fruitList = useSelector((state) => state.fruit.fruit)
    return (
        <>
            <header className="header">
                <div className="container">
                    <h1 className="display-4 fw-bolder">Tìm kiếm</h1>
                </div>
            </header>
            <section className="py-5 bg-light">
                <div className="container px-1 px-lg-5 mt-3">
                    <div className="container justify-content-center search">
                        <div className="row ">
                            <form className="input-group mb-5" onSubmit={handleFormSubmit}>
                                <input
                                    type="text"
                                    className="form-control input-text"
                                    placeholder="Tìm kiếm sản phẩm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
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

export default Search
