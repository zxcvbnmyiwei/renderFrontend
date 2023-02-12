import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MyComp from './pyComponent';
// import './Test.css'
import axios from 'axios';


function Example(props) {
  const [show, setShow] = useState(false);
  const [output, setOutput] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);


  const handleClose = () => setShow(false);
  const handleShow = async () => {

    let pollInterval;
    
    let final = 
`
import json
from pytutor import generate_trace, server

modules = {}
setup_code = ""
trace = generate_trace.run_logger(${JSON.stringify(props.code)} , setup_code)

print(trace)
`


    try {
      setOutput("");
      setStatus(null);
      setJobId(null);
      setJobDetails(null);
      console.log("code: ", final)
      const { data } = await axios.post("https://http://52.220.90.9:8000/submit/", final);
      if (data) {
        setJobId(data);
        setStatus("Submitted.");
        // poll here
        pollInterval = setInterval(async () => {
          const { data: statusRes } = await axios.get(
            "https://http://52.220.90.9:8000/status/" + data
          );
          console.log(statusRes)
          const { status: success, output: job, error } = statusRes;
          console.log(statusRes);
          if (success) {
            const { status: jobStatus, result: jobOutput } = job;
            setStatus(jobStatus);
            setJobDetails(job);
            if (jobStatus === "PENDING") return;
            let finalJobOutput = jobOutput.replace(/\n+$/, "") // get rid of the \n at the end causing the output to have an extra space at the end
            finalJobOutput = JSON.parse(finalJobOutput)
            console.log(finalJobOutput)
            console.log(finalJobOutput["trace"][0]["event"])
            setOutput(finalJobOutput);
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
    console.log(final)
    setShow(true);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
            Visualize
      </Button>

      <Modal 
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Visualize</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {status === "SUCCESS" && (output["trace"][0]["event"] !== "uncaught_exception" ? <MyComp trace={output}/> : <div>{output["trace"][0]["exception_msg"]}</div>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;