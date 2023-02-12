import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { python } from '@codemirror/lang-python';
import React, { useState, useEffect } from 'react';
import readOnlyRangesExtension from 'codemirror-readonly-ranges'
import MyComp from './pyComponent';
import Example from './Test';
import Button from 'react-bootstrap/Button';
import './MultipleFileIDE.css'

const MultipleFileIDE = props => {

    const onChange = (value) => {
        props.onChange(value)

    }
    return (
        <div className='inner'>
            <CodeMirror
                theme={dracula}
                height = "40vh"
                width = "50vw"
                extensions={[python({ jsx: true })]}
                onChange={onChange}

            />
        </div>
    );
}


export default MultipleFileIDE;