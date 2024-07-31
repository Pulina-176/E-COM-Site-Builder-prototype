import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({initialValue, onType}) => {

    const [description, setDescription] = useState(initialValue || '')

    useEffect(() => {
        onType(description)
    }, [description])

  return (
    <div>
        <ReactQuill value={description} onChange={setDescription} 
                    formats={[
                      'header', 'font', 'size',
                      'bold', 'italic', 'underline', 'strike', 'blockquote',
                      'list', 'bullet', 'indent',
                      'link', 'image'
                    ]}/>
    </div>
  )
}

export default RichTextEditor