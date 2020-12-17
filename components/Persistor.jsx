import React, { useState, useEffect } from "react"
import { PERSIST_LOAD } from "redux/reducers/auth"

const PersistorComponent = React.memo(props => {
    const [loaded, setLoaded] = useState(false),
        { children, loading, dispatch } = props

    useEffect(() => {
        if (process.env.KEY_PERSIST) {
            const auth = JSON.parse(window.localStorage.getItem(`${process.env.KEY_PERSIST}:persist`))
            dispatch({
                type: PERSIST_LOAD,
                token: auth?.token,
                current: auth?.current
            })
        }
        setLoaded(true)
    }, [])

    return loaded ? children : loading
})

export default PersistorComponent