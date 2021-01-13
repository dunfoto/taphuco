import "style/ung-dung.css"
import Link from "next/link"
import axiosNoAuth from "axios"
import axios from 'utils/axios'
import { debounce } from 'lodash'
import { useState } from "react"

const UngDungComponent = React.memo(props => {
    const { categories, config } = props,
        [searchs, setSearchs] = useState([]),
        searchCategories = debounce(data => getSearchCategories(data), 1500)


    const getSearchCategories = async data => {
        if (Boolean(data)) {
            try {
                const res = await axios.get(`/categories/search?search=${encodeURI(data)}`)
                setSearchs(res.data.data)
            } catch (err) {
                console.err(err)
            }
        } else {
            setSearchs([])
        }
    }
    const onChangeSearch = e => {
        searchCategories(e.target.value)
    }
    return (
        <React.Fragment>
            <div className="container__ungdung">
                <div className="container">
                    <div className="card-search bg-light text-center">
                        <h2 className="textthongdiep">{config.application.title}</h2>
                        <br className="my-4 py-4" />
                        <div className="row">
                            <div className="col-sm-12 text-color font-16">
                                <p className="text-color" >{config.application.description}</p>
                            </div>
                            <div className="col-sm-12 text-left">
                                <p className="text-color font-16">Tìm ứng dụng</p>
                                <div className="input-group">
                                    <input type="text" onChange={onChangeSearch} className="form-control input-ungdung" placeholder="Tìm ứng dụng" />
                                    <div className="input-group-prepend input-ungdung bg-light">
                                        <div className="input-group-text bg-light" style={{ border: "0px solid white" }}>
                                            <i className="fas fa-search" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="row justify-content-center bg-light" style={{ marginLeft: 0, marginRight: 0, paddingTop: 90, paddingBottom: 90, paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
                {searchs.length === 0 ? (
                    categories.map(category => (
                        <div key={category._id} className="col-md-4 col-sm-6 col-xs-12 my-4 py-2 d-flex align-items-center">
                            <div className="card card__category mr-auto ml-auto">
                                <div className="container__img">
                                    <img src={category.img} alt="Avatar" className="image" />
                                    <Link href={`/ung-dung/${encodeURI(category.title)}`}>
                                        <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                            <h4 className="textimage">{category.title}</h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                        searchs.map(category => (
                            <div key={category._id} className="col-md-4 col-sm-6 col-xs-12 my-4 py-2 d-flex align-items-center">
                                <div className="card card__category mr-auto ml-auto">
                                    <div className="container__img">
                                        <img src={category.img} alt="Avatar" className="image" />
                                        <Link href={`/ung-dung/${encodeURI(category.title)}`}>
                                            <div className="middle d-flex align-items-center" style={{ cursor: "pointer" }}>
                                                <h4 className="textimage">{category.title}</h4>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
            </div>
        </React.Fragment>
    )
})

UngDungComponent.getInitialProps = async ctx => {
    const categories = (await axiosNoAuth.get(`${process.env.API}/categories/all`)).data.data
    const config = (await axiosNoAuth.get(`${process.env.API}/config`)).data.data
    return { categories, config }
}

export default UngDungComponent