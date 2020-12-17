import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getConfig } from "redux/reducers/config"
import axios from "utils/axios"

const DashBoard = React.memo(props => {
    const { register, setValue, handleSubmit, control } = useForm(),
        { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
            control,
            name: "contentMessage"
        }),
        { homePage, getConfig } = props

    useEffect(() => {
        getConfig()
    }, [])

    useEffect(() => {
        if (homePage) {
            setValue("pointMessage", homePage.pointMessage)
            setValue("contentMessage", homePage.contentMessage.map(item => ({ value: item })))
        }
    }, [homePage])

    const onSubmitThongDiep = async data => {
        if (data.contentMessage) {
            data.contentMessage = data.contentMessage.map(item => item.value)
        } else {
            delete data.contentMessage
        }
        try {
            const res = await axios.post("/config/homepage", data)
            if (res.status === 200) {
                getConfig()
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    return (
        <React.Fragment>
            <div className="w-100">
                <h3>Thông điệp:</h3>
                <div className="w-50">
                    <form onSubmit={handleSubmit(onSubmitThongDiep)}>
                        <div className="form-group">
                            <label htmlFor="pointMessage">Tiêu đề cho thông điệp</label>
                            <input
                                type="string"
                                className="form-control"
                                id="pointMessage"
                                name="pointMessage"
                                ref={register({
                                    required: true
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contentMessage">Nội dung thông điệp</label>
                            {fields.map((field, index) => (
                                <div className="d-flex" key={field.id}>
                                    <input
                                        type="string"
                                        className="form-control justify-content-center my-2 col-10"
                                        name={`contentMessage[${index}].value`}
                                        defaultValue={field.value}
                                        ref={register({
                                            required: true
                                        })}
                                    />
                                    <div className="d-flex justify-content-center align-items-center col-2">
                                        <i className="fas fa-times-circle" onClick={() => remove(index)} style={{ cursor: "pointer" }}></i>
                                    </div>
                                </div>
                            ))}
                            <div className="d-flex">
                                <button type="button" className="col-10 btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color w-100" onClick={() => append({ value: "" })}><i className="fas fa-plus-circle"></i></button>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">Lưu lại</button>
                    </form>
                </div>
            </div>
            <div className="w-100">
                <h3>Banner</h3>
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
})

const mapStateToProps = state => ({
    homePage: state.config?.homepage
})
const mapDispatchToProps = dispatch => bindActionCreators({
    getConfig
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)