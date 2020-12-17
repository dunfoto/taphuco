import { useForm } from "react-hook-form"

const DashBoard = props => {
    const { register, handleSubmit } = useForm()

    const onSubmitThongDiep = data => {
        console.log(data)
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
                                <th scope="col">Các sản phẩm</th>
                                <th scope="col"><i className="fas fa-plus"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Vải cotton</td>
                                <td>
                                    <p>Bộ sản phẩm có độ lặp cao</p>
                                    <p>Bộ sản phẩm có độ bền ánh sáng cao</p>
                                </td>
                                <td>
                                    <i className="fas fa-edit"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DashBoard