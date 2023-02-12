import { Button, Tabs, Modal, Form, Input,Checkbox } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './MultipleFiles.css'
import MultipleFileIDE from './MultipleFileIDE';
import CollectionCreateForm from './ChangeTabForm';
import axios from 'axios';
import MyComp from './pyComponent';
import MultipleFileVisualizer from './MultipleFileVisualizer';

const MultipleFiles = () => {
    // Intepreter
    const [output, setOutput] = useState("");
    const [jobId, setJobId] = useState(null);
    const [status, setStatus] = useState(null);
    const [jobDetails, setJobDetails] = useState(null);
    // others
    const [currentCode,setCurrentCode] = useState("")
    const [open, setOpen] = useState(false);
    const [activeKey, setActiveKey] = useState("0");
    const [currentItem,setCurrentItem] = useState(null)
    const [items, setItems] = useState([
        {
            label: 'file1.py',
            children: <MultipleFileIDE onChange={(data) => onTabChange("0",data)}/>,
            code : "",
            key: '0',
            closable: false,
        },
        {
            label: 'file2.py',
            children: <MultipleFileIDE onChange={(data) => onTabChange("1",data)}/>,
            code : "",
            key: '1',
        },
    ]);


    const newTabIndex = useRef(0);
    const onChange = (newActiveKey) => {
        setActiveKey(newActiveKey)
        
    };

    const addTab = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newItem = {
            label: 'New Tab',
            children: <MultipleFileIDE onChange={(data) => onTabChange(newActiveKey,data)}/>,
            code : "",
            key: newActiveKey,
        }
        setItems(items => [...items, newItem]);
        setActiveKey(newActiveKey);
    };
    const removeTab = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };
    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            addTab();
        } else {
            removeTab(targetKey);
        }
    };

    const onTabChange = (index, data) => {
        const curr = {"key": index, "data" : data}
        setCurrentItem(curr)
    }


    useEffect(() => {
        if (currentItem) {
            const newList = [...items]
            newList.filter(item=>item.key ===  currentItem.key)[0].code = currentItem.data
            setItems(newList)
        }
    },[currentItem])


    let pollInterval;

    const handleSubmit = async () => {

        // create new array instead of sending in items because cannot send a children component in the object
        const payload = []
        items.forEach(item=> {
            if (item.key === activeKey) {
                payload.push({ "label" : "code.py" , "code" : item.code })
            } else {
                payload.push({ "label" : item.label , "code" : item.code })
            }
        })


        try {
            setOutput("");
            setStatus(null);
            setJobId(null);
            setJobDetails(null);
            const { data } = await axios.post("http://52.220.90.9:8000/submitMulti/", payload);
            if (data) {
            setJobId(data);
            setStatus("Submitted.");
    
            // poll here
            pollInterval = setInterval(async () => {
                const { data: statusRes } = await axios.get(
                "http://52.220.90.9:8000/status/" + data
                );
                const { status: success, output: job, error } = statusRes;
                if (success) {
                const { status: jobStatus, result: jobOutput } = job;
                setStatus(jobStatus);
                setJobDetails(job);
                if (jobStatus === "PENDING") return;
                setOutput(jobOutput);
                clearInterval(pollInterval);
                } else {
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


    // Changing name of file (Modal + Form component)
    const onCreate = (values) => {
        const newList = [...items]
        const selectedItem = newList.filter(item=>item.label === values.Name)
        // If user attempts to change the file name to one that is currently used.
        if (selectedItem.length > 0) {
            alert("Please input another name that is not used currently!")
        }
        else {
            newList.filter(item=>item.key ===  activeKey)[0].label = values.Name
        }
        setItems(newList)
        setOpen(false);
      };

      const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


    return (
        <div className="multifile-main">
        <div>
        <Tabs
            type="editable-card"
            onChange={onChange}
            activeKey= {activeKey}
            onEdit={onEdit}
            items={items}
        />
        <Button type="primary" danger onClick={handleSubmit}>Submit!</Button>
        <Button
            type="primary"
            onClick={() => {
                setOpen(true);
            }}>
        Change File Name
        </Button>
        <CollectionCreateForm
            open={open}
            onCreate={onCreate}
            onCancel={() => {
                setOpen(false);
            }}
        />
        <MultipleFileVisualizer activeKey={activeKey} items={items}/>
        <textarea rows="10" class="form-control" readOnly={true} key={output} placeholder="Output will be displayed here.">{output}</textarea>
        </div>
        </div>

    );
};
export default MultipleFiles;

