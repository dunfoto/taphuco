import React from "react"
import { useForm } from "react-hook-form"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { login } from "redux/reducers/auth"

const LoginComponent = React.memo(props => {
    const { login } = props
    const { register, handleSubmit } = useForm()

    const onSubmit = data => {
        login(data)
    }

    return (
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
    )
})

const mapDispatchToProps = dispatch => bindActionCreators({
    login
}, dispatch)
export default connect(null, mapDispatchToProps)(LoginComponent)