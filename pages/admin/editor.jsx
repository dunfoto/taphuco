import React, { useRef } from 'react'
import SunEditor from 'suneditor-react'
import { convertBase64 } from "common/base64"

const TestEditorComponent = React.memo(props => {
    const editorRef = useRef();

    const handleImageUploadBefore = async (files, info, uploadHandler) => {
        const temp = await Promise.all(files.map(async file => "data:image/png;base64," + (await convertBase64(file)).base64))
        return "https://cloudfour.com/examples/img-currentsrc/images/kitten-large.png"
    }

    const handleImageUpload = (targetImgElement, index, state, imageInfo, remainingFilesCount) => {
    }

    return (
        <div style={{ marginTop: 100 }}>
            <h2>Editor</h2>
            <button onClick={() => console.log(editorRef.current.editor.getContents().split('"').filter(t => t.includes('data:image/png;base64')))}>CheckData</button>
            <SunEditor
                ref={editorRef}
                autoFocus={true}
                onImageUploadBefore={handleImageUploadBefore}
                onImageUpload={handleImageUpload}
                height="70vh"
                setOptions={{
                    buttonList: [
                        ['undo', 'redo',
                            'font', 'fontSize', 'formatBlock',
                            'paragraphStyle', 'blockquote',
                            'bold', 'underline', 'italic', 'strike',
                            'fontColor', 'hiliteColor', 'textStyle',
                            'removeFormat',
                            'outdent', 'indent',
                            'align', 'horizontalRule', 'list', 'lineHeight',
                            'table', 'link', 'image', /** 'math', */ // You must add the 'katex' library at options to use the 'math' plugin.
                            'fullScreen', 'showBlocks', 'codeView']
                    ]
                }}
            />
        </div>
    )
})

export default TestEditorComponent