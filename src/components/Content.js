import { useParams } from 'react-router-dom';
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Interpreter from './Interpreter';


function AttemptQuestion() {
    const { contentId } = useParams();
    const [content,setContent] = useState([])
    const [ranges,setRanges] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get("http://52.220.90.9:8000/contents/" + contentId + "/");
            console.log("data: ", data)
            setContent(data);

            var rangesObj = []
            data.ranges.map((item) => {
                var rangeObject = {};
                rangeObject.from = parseInt(item.split("-")[0]);
                rangeObject.to = parseInt(item.split("-")[1]);
                rangesObj.push(rangeObject);
            })
            setRanges(rangesObj)
            console.log("??: ",rangesObj)
        }
        fetchData().catch(console.error)

    }, [contentId]);

    console.log("content: ", content)

    return (
        <>
        <div className="description-header"style={{color: "white"}}>
            {content.text}
        </div>
        <div className="Interpreter">
            <Interpreter id={content.id} code={content.code} ranges={ranges} output={content.output}/>
        </div>
        </>
    )

}

export {AttemptQuestion};


