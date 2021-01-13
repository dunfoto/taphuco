import "style/hotSpots.scss"
import { useState, useEffect, createRef } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import OutsideClickHandler from 'react-outside-click-handler';

const HotSpots = React.memo(props => {
    const { img, nodes } = props,
        [show, setShow] = useState(null),
        [elRefs, setElRefs] = React.useState([]),
        nodeLength = nodes ? nodes.length : 0

    useEffect(() => {
        setElRefs(elRefs => (
            Array(nodeLength).fill().map((_, i) => elRefs[i] || createRef())
        ));
    }, [nodeLength])

    const checkPlacement = (bottom, left) => {
        if (bottom >= 50) {
            if (left >= 50) {
                return "left-start"
            } else {
                return "right-start"
            }
        } else {
            if (left >= 50) {
                return "left-end"
            } else {
                return "right-end"
            }
        }
    }

    const checkIdPlacement = (bottom, left) => {
        if (bottom >= 50) {
            if (left >= 50) {
                return "left"
            } else {
                return "right"
            }
        } else {
            if (left >= 50) {
                return "left"
            } else {
                return "right"
            }
        }
    }

    const clickHotSpot = id => {
        if (show === id) {
            return setShow(null)
        } else (
            setShow(id)
        )
    }

    return (
        <React.Fragment>
            <div className="context">
                <img src={img} alt="Snow" style={{ cursor: "auto" }} />
                {nodes && elRefs.length > 0 && nodes.map((node, i) => (
                    <div key={i}>
                        <OverlayTrigger
                            key="left"
                            placement={checkPlacement(node.bottom, node.left)}
                            show={show === node._id}
                            style={{ top: "-100px !important" }}
                            overlay={props => (
                                <Tooltip
                                    id={`tooltip-${checkIdPlacement(node.bottom, node.left)}`}
                                    {...props}
                                >
                                    <OutsideClickHandler
                                        onOutsideClick={() => {
                                            setShow(null)
                                        }}
                                    >
                                        <div className="card p-0 text-left w-100 hotspot-homepage">
                                            <div className="card-body m-0 p-0">
                                                <div className="card-title title p-4 rounded-top">
                                                    <div className="w-100 text-right">
                                                        <button onClick={() => setShow(null)} className="btn p-0 m-0 text-white">&times;</button>
                                                    </div>
                                                    <h5>Cotton</h5>
                                                    <p className="text-white">dùng Ứng dụng hoá chất cho ra:</p>
                                                </div>
                                                <div className="content p-4 py-2">
                                                    <p className="title">Màu sắc</p>
                                                    <p className="sub-content">Tươi sáng trên nền vải thoáng mát.</p>
                                                    <p className="title">Yêu cầu</p>
                                                    <p className="sub-content">Độ bền giặt cao.</p>
                                                    <p className="title">Dòng Sản Phẩm</p>
                                                    <p className="sub-content">Thuốc nhuộm: Covazol - LC &   HCCB và chất trợ đi kèm.</p>
                                                    <a href="#" className="btn border rounded-pill px-4">Xem thêm</a>
                                                </div>
                                            </div>
                                        </div>
                                    </OutsideClickHandler>
                                </Tooltip>
                            )}
                        >
                            <span ref={elRefs[i]} className="btn" style={{ bottom: `${node.bottom}%`, left: `${node.left}%` }}>
                                <div className="loader-6 center text-center" onClick={() => clickHotSpot(node._id)} >
                                    <span>
                                        {show === node._id ? <div>&#45;</div> : <div style={{ paddingBottom: 2 }}>&#43;</div>}
                                    </span>
                                </div>
                            </span>
                        </OverlayTrigger>
                    </div>
                ))}
            </div>
        </React.Fragment >
    )
})

export default HotSpots