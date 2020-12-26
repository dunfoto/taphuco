import React, { useEffect, useState } from 'react'
import { Popover } from 'react-tiny-popover'

const PopoverComponent = React.memo(props => {
    const { _id, popup, bottom, left, showSelected, onSelect } = props

    const checkPlacement = left => {
        if (left >= 50) {
            return ['right', 'left']
        } else {
            return ['left', 'right']
        }
    }

    const checkAlign = bottom => {
        if (bottom >= 75) {
            return 'start'
        } else if (bottom <= 25) {
            return 'end'
        } else {
            return 'center'
        }
    }

    return (
        <Popover
            isOpen={showSelected}
            positions={checkPlacement(left)}
            positions={['left', 'right']}
            padding={0}
            align={checkAlign(bottom)}
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
                        {showSelected ? <div>&#45;</div> : <div style={{ paddingBottom: 2 }}>&#43;</div>}
                    </span>
                </div>
            </span>
        </Popover>
    )
})

export default PopoverComponent
