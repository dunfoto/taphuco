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

    return (
        <Popover
            isOpen={show}
            position={['top', 'right', 'left', 'bottom']}
            padding={10}
            disableReposition
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