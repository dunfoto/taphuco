import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import axios from "utils/axios"
import Select from "react-select"

const EditQuanTriVienComponent = React.memo(props => {
    const { push, query: { id } } = useRouter(),
        { register, handleSubmit, control, setValue } = useForm(),
        [permissions, setPermissions] = useState([])

    useEffect(() => {
        getPermissions()
    }, [])

    const getPermissions = async () => {
        try {
            const res = await axios.get('/permissions/all')
            setPermissions(res.data.data.map(per => ({ value: per._id, label: per.name })))
            const resAdmin = await axios.get(`/admin/${id}`)
            console.log(res.data.data)
            console.log(resAdmin.data.data.permission._id)
            setValue('email', resAdmin.data.data.email)
            const findPer = res.data.data.find(temp => temp._id == resAdmin.data.data.permission._id)
            setValue('permission', { value: findPer._id, label: findPer.name })
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const onSubmit = async data => {
        data.permission = data.permission.value
        try {
            const res = await axios.post('/admin', data)
            if (res.status === 200) {
                push('/admin/quan-tri/quan-tri-vien')
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
    return (
        <React.Fragment>
            <i onClick={() => push("/admin/quan-tri/quan-tri-vien")} className="far fa-arrow-alt-circle-left fa-2x"></i>
            <h2>Chỉnh sửa quản trị viên</h2>
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="form-group col-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="string"
                            id="password"
                            name="password"
                            className="form-control"
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                    <div className="form-group col-12">
                        <label htmlFor="permission" className="form-label">Quyền quản trị viên</label>
                        <Controller
                            name="permission"
                            control={control}
                            defaultValue={null}
                            options={permissions}
                            as={Select}
                        />
                    </div>
                    <div className="form-group col-12">
                        <button type="submit" className="btn btn-transparent btn-border text-color my-4">Lưu lại</button>
                    </div>
                </div>
            </form>
        </React.Fragment >
    )
})

export default EditQuanTriVienComponent