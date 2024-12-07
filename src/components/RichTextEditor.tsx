import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ align: [] }],
        ['clean']
      ]
    }
  }), []);

  const formats = useMemo(() => [
    'header',
    'bold', 'italic', 'underline',
    'size',
    'align'
  ], []);

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="h-[300px] mb-12"
      />
    </div>
  );
}