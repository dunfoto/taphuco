import React, { useRef } from 'react'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

const TestEditorComponent = React.memo(props => {
    const editorRef = useRef();

    return (
        <div style={{ marginTop: 100 }}>
            <h2>Editor</h2>
            <button onClick={() => console.log(editorRef.current.editor.getContents())}>CheckData</button>
            <SunEditor
                ref={editorRef}
                autoFocus={true}
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