import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { python } from '@codemirror/lang-python';
import React, { useState, useEffect, useContext } from 'react';
import readOnlyRangesExtension from 'codemirror-readonly-ranges'
import MyComp from './pyComponent';
import Example from './Test';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/AuthContext';

function Interpreter(props) {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState("");
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);

  let {user} = useContext(AuthContext)
  // rerender intrepreter if there is a change in props.code
  useEffect(() => {
    if (props.code != null) {
      // console.log("print props: ", props);
      setCode(props.code);
    }
  }, [props.code]);

  let pollInterval;


  const handleSubmit = async () => {
    try {
      setOutput("");
      setStatus(null);
      setJobId(null);
      setJobDetails(null);
      console.log("code: ", code)
      const { data } = await axios.post("http://52.220.90.9:8000/submit/", code);
      if (data) {
        setJobId(data);
        setStatus("Submitted.");
        // poll here
        pollInterval = setInterval(async () => {
          const { data: statusRes } = await axios.get(
            "http://52.220.90.9:8000/status/" + data
          );
          console.log(statusRes)
          const { status: success, output: job, error } = statusRes;
          console.log(statusRes);
          if (success) {
            const { status: jobStatus, result: jobOutput } = job;
            setStatus(jobStatus);
            setJobDetails(job);
            if (jobStatus === "PENDING") return;
            console.log(jobOutput.length)
            let finalJobOutput = jobOutput.replace(/\n+$/, "") // get rid of the \n at the end causing the output to have an extra space at the end
            setOutput(finalJobOutput)
            if (finalJobOutput === props.output) {
              console.log("correct")
              let itemData = {}
              itemData.username = user.username
              itemData.contentid = props.id
              axios.post("http://52.220.90.9:8000/completed/", itemData).then(() => console.log("Success")).catch(error => {
                console.log(error.response.data.error)
             })
            }
            else {
              alert("Wrong")
            }
            clearInterval(pollInterval);
          } else {
            console.error(error);
            setOutput(error);
            setStatus("Bad request");
            clearInterval(pollInterval);
          }
        }, 1000);
      } else {
        setOutput("Retry again.");
      }
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
      } else {
        setOutput("Please retry submitting.");
      }
    }
  };

  const onChange = React.useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  const getReadOnlyRanges = (targetState) => {
    var allContentRanges = [];
    // console.log('print: ', props.ranges)
    const contentRangesDetails = props.ranges;
    Object.entries(contentRangesDetails).map(([key, value]) => {
      var contentRanges = {};
      contentRanges.from = targetState.doc.line(value.from).from;
      contentRanges.to = targetState.doc.line(value.to).to;
      allContentRanges.push(contentRanges);
    })
    // console.log("allContentRanges: ", allContentRanges)
    return (allContentRanges);
  }

  // const handleVisualize = (e) => {
  //   e.preventDefault();
  //   setVisualizeShown(!isVisualizeShown);
  // }


  return (
    <div className='inner'>
      <CodeMirror
        value={code}
        key={props.code}
        theme={dracula}
        height="40vh"
        width="50vw"
        minWidth='600px'
        extensions={[readOnlyRangesExtension(getReadOnlyRanges), python({ jsx: true })]}
        onChange={onChange}

      />
      <br />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "50vw", minWidth: "500px" }}>
        <Button className="submitButton" onClick={handleSubmit} variant="primary">Submit</Button>
        <Example code={code}/>
      </div>
      <textarea style={{ height: "40vh", width: "50vw", minWidth: "600px" }} rows="10" class="form-control" readOnly={true} key={output} placeholder="Output will be displayed here.">{output}</textarea>
    </div>
  );
}


export default Interpreter;