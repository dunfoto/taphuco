import '../style/404.css'
import Link from "next/link"
import { useRouter } from 'next/router'
import { useEffect } from 'react'
const ErrorComponent = props => {
    const { asPath, push } = useRouter()
    useEffect(() => {
        if (asPath === "/admin") {
            push('/')
        }
    }, [asPath])

    if (asPath === "/admin") return (<div></div>)

    return (
        <React.Fragment>
            <h1>404 Error Page</h1>
            <p className="zoom-area"><b>TaPhuCo.ltd</b></p>
            <section className="error-container">
                <span className="four"><span className="screen-reader-text">4</span></span>
                <span className="zero"><span className="screen-reader-text">0</span></span>
                <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <div className="link-container">
                <Link href={'/'}>
                    <a href="#" className="more-link">Visit the home page</a>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default ErrorComponent