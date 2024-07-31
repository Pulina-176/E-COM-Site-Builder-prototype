import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor_advanced = ({ initialValue, onType }) => {
    const [description, setDescription] = useState(initialValue || '');

    useEffect(() => {
        onType(description);
    }, [description, onType]);

    const fonts = [
        'poppins', 'roboto', 'arial', 'inter', 'times-new-roman'
    ];

    const fontNames = {
        'poppins': 'Poppins, sans-serif',
        'roboto': 'Roboto, sans-serif',
        'arial': 'Arial, sans-serif',
        'inter': 'Inter, sans-serif',
        'times-new-roman': 'Times New Roman, serif'
    };

    // Injecting custom font styles
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .ql-font-poppins { font-family: 'Poppins', sans-serif; }
            .ql-font-roboto { font-family: 'Roboto', sans-serif; }
            .ql-font-arial { font-family: 'Arial', sans-serif; }
            .ql-font-inter { font-family: 'Inter', sans-serif; }
            .ql-font-times-new-roman { font-family: 'Times New Roman', serif; }
        `;
        document.head.appendChild(style);
    }, []);

    const modules = {
        toolbar: [
            [{ 'font': fonts }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': '1' }, { 'header': '2' }, { 'header': [3, 4, 5, 6] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'align', 'color', 'background',
        'link', 'image', 'video'
    ];

    return (
        <div>
            <ReactQuill 
                value={description} 
                onChange={setDescription} 
                modules={modules}
                formats={formats}
                style={{ fontFamily: fontNames[description] }} // Applies the font family to the editor
            />
        </div>
    );
};

export default RichTextEditor_advanced;
