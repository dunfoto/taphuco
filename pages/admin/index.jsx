import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { login, logout } from "redux/reducers/auth"
import { useRouter } from "next/router"

const LoginComponent = React.memo(props => {
    const { login, token } = props,
        { register, handleSubmit } = useForm(),
        router = useRouter()

    useEffect(() => {
        if (token) {
            router.push('/admin/cau-hinh/trang-chu')
        } else {
            router.push('/admin/dang-nhap')
        }
    }, [token])

    const onSubmit = async data => {
        login(data, (err, result) => {
            if (err) throw err
            router.push("/admin/cau-hinh/trang-chu")
        })
    }

    return (
        <div className="d-flex text-center h-100 align-items-center justify-content-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        ref={register({
                            required: true
                        })}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        ref={register({
                            required: true
                        })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
})

const mapStateToProps = state => ({
    token: state.auth.token
})
const mapDispatchToProps = dispatch => bindActionCreators({
    login
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)