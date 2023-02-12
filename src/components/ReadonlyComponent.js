import CodeMirror from '@uiw/react-codemirror';
import {dracula} from '@uiw/codemirror-theme-dracula';
import { python } from '@codemirror/lang-python';
import React, {useState,useEffect} from 'react';
import './ReadonlyComponent.css';

function ReadonlyComponent(props) {
    const [code, setCode] = useState('');

    // rerender intrepreter if there is a change in props.code
    useEffect(() => {
      if (props.code != null) {
        setCode(props.code);
      }
    },[props.code]);

    return (
        <div>
              <CodeMirror
                value={code}
                key={props.code}
                theme={dracula}
                height = "200px"
                width = '550px'
                extensions={[python({ jsx: true })]}
                readOnly="true"

              />
          <br />
          <br />
          {/* <button>Attempt Question</button> */}
        </div>
      );
}


export default ReadonlyComponent;