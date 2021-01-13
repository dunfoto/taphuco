import React, { useState, useEffect } from "react"
import axios from "utils/axios"
import Select from "react-select"
import { useRouter } from "next/router"
import { useForm, Controller } from "react-hook-form"

const NewQuyenQuantriComponent = React.memo(props => {
    const [roles, setRoles] = useState([]),
        [all, setAll] = useState(false),
        { register, handleSubmit, watch, getValues, setValue, control } = useForm(),
        { push } = useRouter(),
        watchRoles = watch('roles')

    useEffect(() => {
        getRoles()
    }, [])

    useEffect(() => {
        if (watchRoles) {
            if (watchRoles.length === roles.length) {
                setAll(true)
            }
        }
    })

    const getRoles = async () => {
        try {
            const res = await axios.get('/roles')
            setRoles(res.data.data.map(role => ({ label: role.code, value: role._id })))
        } catch (err) {
            return Promise.reject(err)
        }
    }

    const onChangeCheckALl = e => {
        if (getValues('roles').length === roles.length) {
            setAll(true)
            setValue('roles', [])
        } else {
            setAll(false)
            setValue('roles', roles)
        }
    }

    const onSubmit = async data => {
        console.log(data)
    }

    return (
        <React.Fragment>
            <i onClick={() => push("/admin/quan-tri/quyen-quan-tri")} className="far fa-arrow-alt-circle-left fa-2x"></i>
            <h2>Tạo quyền cho quản trị viên</h2>
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="form-group col-6">
                        <label htmlFor="name" className="form-label">Tên quyền</label>
                        <input
                            type="string"
                            id="name"
                            name="name"
                            className="form-control"
                            ref={register({
                                required: true
                            })}
                        />
                    </div>
                    <div className="form-group col-12">
                        <label htmlFor="roles" className="form-label">Quyền được cấp</label>
                        <Controller
                            name="roles"
                            control={control}
                            isMulti
                            defaultValue={[]}
                            options={roles}
                            as={Select}
                        />
                    </div>
                    <div className="form-check col-6 mx-3">
                        <input
                            type="checkbox"
                            id="name"
                            className="form-check-input"
                            value={all}
                            onChange={onChangeCheckALl}
                        />
                        <label htmlFor="name" className="form-check-label">Cấp đầy đủ quyền</label>
                    </div>
                    <div className="form-group col-12">
                        <button type="submit" className="btn btn-transparent btn-border text-color my-4">Lưu lại</button>
                    </div>
                </div>
            </form>
        </React.Fragment >
    )
})

export default NewQuyenQuantriComponent