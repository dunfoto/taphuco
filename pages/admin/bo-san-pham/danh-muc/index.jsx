import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "utils/axios"

const DashBoard = props => {
    const [categories, setCategories] = useState([]),
        router = useRouter()
    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        try {
            const res = await axios.get("/categories")
            if (res.status === 200) {
                setCategories(res.data.data)
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const deleteCategory = async id => {
        try {
            const res = await axios.delete(`/category/${id}`)
            if (res.status === 200) {
                getCategories()
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return (
        <React.Fragment>
            <div className="w-100">
                <h3>Danh mục sản phẩm</h3>
                <div className="w-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên danh mục</th>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">
                                    <button className="btn" onClick={() => router.push(`/admin/bo-san-pham/danh-muc/new`)}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={category._id}>
                                    <td>{index}</td>
                                    <td>{category.title}</td>
                                    <td>
                                        <img src={category.img} alt={`${category._id}`} height={100} />
                                    </td>
                                    <td>
                                        <button className="btn" onClick={() => router.push(`/admin/bo-san-pham/danh-muc/${category._id}`)}>
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