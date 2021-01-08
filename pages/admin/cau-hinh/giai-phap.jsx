import React, { useEffect, useState } from "react"
import { getConfig } from "redux/reducers/config"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { useForm } from "react-hook-form"
import { Spinner } from "react-bootstrap"
import axios from "utils/axios"
import SweetAlert from "react-bootstrap-sweetalert"

const UngDungComponent = React.memo(props => {
    const { solution, getConfig } = props,
        { register, handleSubmit, setValue } = useForm(),
        [isWait, setIsWait] = useState(false),
        [alert, setAlert] = useState(false)

    useEffect(() => {
        if (solution) {
            setValue('title', solution.title)
            setValue('description', solution.description)
        }
    }, [solution])

    const onSubmit = async data => {
        try {
            setIsWait(true)
            const res = await axios.post('/config/solution', data)
            if (res.status === 200) {
                setIsWait(false)
                setAlert(true)
                getConfig()
            }
        } catch (err) {
            setIsWait(false)
            return Promise.reject(err)
        }
    }
    return (
        <div className="w-100">
            <h3 className="my-4">Giải pháp</h3>
            <div className="row">
                <div className="col-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="title">Tiêu đề giải pháp</label>
                            <input
                                type="string"
                                className="form-control"
                                id="title"
                                name="title"
                                ref={register({
                                    required: true
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Mô tả giải pháp</label>
                            <textarea
                                type="string"
                                className="form-control"
                                id="description"
                                name="description"
                                rows={5}
                                ref={register({
                                    required: true
                                })}
                            />
                        </div>
                        <button type="submit" disabled={isWait} className="btn btn-transparent border rounded-0 pl-4 pr-4 btn-border text-color">{isWait && (<Spinner size="sm" animation="border" />)} Lưu lại</button>
                    </form>
                </div>
            </div>
            {alert && (
                <SweetAlert
                    success
                    title="Woot!"
                    onConfirm={() => setAlert(false)}
                >
                    Update success
                </SweetAlert>
            )}
        </div>
    )
})

const mapStateToProps = state => ({
    solution: state.config.solution
})
const mapDispatchToProps = dispatch => bindActionCreators({
    getConfig
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(UngDungComponent)