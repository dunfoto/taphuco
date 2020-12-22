import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "utils/axios"

const DashBoard = props => {
    const [products, setProducts] = useState([]),
        router = useRouter()
    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        try {
            const res = await axios.get("/products")
            if (res.status === 200) {
                setProducts(res.data.data)
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteCategory = async id => {
        try {
            const res = await axios.delete(`/category/${id}`)
            if (res.status === 200) {
                getProducts()
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return (
        <React.Fragment>
            <div className="w-100">
                <h3>Sản phẩm</h3>
                <div className="w-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">
                                    <button className="btn" onClick={() => router.push(`/admin/bo-san-pham/san-pham/new`)}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((category, index) => (
                                <tr key={category._id}>
                                    <td>{index}</td>
                                    <td>{category.title}</td>
                                    <td>
                                        <img src={category.imgs[0]} alt={`${category._id}`} height={100} />
                                    </td>
                                    <td>
                                        <button className="btn" onClick={() => router.push(`/admin/bo-san-pham/san-pham/${category._id}`)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="btn" onClick={() => deleteCategory(category._id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DashBoard