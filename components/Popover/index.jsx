import React, { useEffect, useState } from 'react'
import { Popover } from 'react-tiny-popover'

const PopoverComponent = React.memo(props => {
    const { _id, popup, bottom, left, showSelected, onSelect } = props,
        [show, setShow] = useState(false)

    useEffect(() => {
        if (showSelected === _id) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [showSelected])

    const checkPlacement = (left, bottom) => {
        if (left >= 50) {
            if (bottom >= 50) {
                return ['bottom', 'left', 'right', 'top']
            } else {
                return ['left', 'top', 'right', 'bottom']
            }
        } else {
            if (bottom >= 50) {
                return ['bottom', 'right', 'left', 'top']
            } else {
                return ['right', 'top', 'left', 'bottom']
            }
        }
    }

    return (
        <Popover
            isOpen={show}
            positions={checkPlacement(left, bottom)}
            padding={0}
            align={left >= 50 ? 'end' : 'start'}
            onClickOutside={() => setShow(false)}
            content={({ position, nudgedLeft, nudgedTop, targetRect, popoverRect }) => (popup)}
        >
            <span className="btn" style={{ position: "absolute", bottom: `${bottom}%`, left: `${left}%` }}>
                <div
                    className="loader-6 center text-center"
                    onClick={() => {
                        onSelect(_id)
                    }}
                >
                    <span>
                        {show ? <div>&#45;</div> : <div style={{ paddingBottom: 2 }}>&#43;</div>}
                    </span>
                </div>
            </span>
        </Popover>
    )
})

export default PopoverComponent