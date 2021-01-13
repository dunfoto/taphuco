import jwt_decode from 'jwt-decode'

const checkPermission = role => {
    const { roles } = jwt_decode(JSON.parse(localStorage.getItem(`${process.env.KEY_PERSIST}:persist`))?.token)
    if (roles.find(temp => temp.code === role)) {
        return true
    }
    return false
}

export default checkPermission