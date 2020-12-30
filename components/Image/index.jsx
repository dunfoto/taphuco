import React, { useRef, useState, useEffect } from "react"
import { Modal, Button } from "react-bootstrap"
import Cropper from "react-cropper"

const ImageComponent = React.memo(props => {
    const { show, handleClose, onSuccess, image, type = "create" } = props,
        cropper = useRef(),
        [original, setOriginal] = useState(null)

    useEffect(() => {
        if (image) {
            setOriginal(image.img)
        }
    }, [image?.img])

    const onSuccessEdit = e => {
        try {
            // console.log(cropper.current.cropper.getCroppedCanvas().toDataURL())
            onSuccess({ _id: image._id, img: cropper.current.cropper.getCroppedCanvas().toDataURL() })
        } catch (err) {
            console.log("DUNG", err)
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa hình ảnh</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Cropper
                    ref={cropper}
                    src={original}
                    aspectRatio={1 / 1}
                    zoomOnWheel={false}
                    viewMode={1}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSuccessEdit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default ImageComponent