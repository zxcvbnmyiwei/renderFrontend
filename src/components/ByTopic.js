
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ReadonlyComponent from './ReadonlyComponent';
import './ByTopic.css'
import ReactPaginate from 'react-paginate';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/AuthContext'


function DisplayByTopic() {
    const { topicId } = useParams();
    const [pageNumber, setPageNumber] = useState(0)
    const [contents, setContents] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("http://52.220.90.9:8000/topics/" + topicId + "/");
            console.log("data: ", data)
            setContents(data.content);
        }

        fetchData().catch(console.error)
    }, [topicId]);

    let navigate = useNavigate();
    const handleClick = (id) => {
        let path = '/content/' + id;
        navigate(path);
    }

    const contentPerPage = 5
    const pagesVisited = pageNumber * contentPerPage
    const displayQuestions = contents.slice(pagesVisited, pagesVisited + contentPerPage).map((item) => {
        return (
            <div className='contentContainer'>
                <div class='outer'>
                    <div class='inner'>
                        {item.text}
                        <ReadonlyComponent padding="50px" code={item.code} />
                    </div>
                </div>
                <Button variant="dark" onClick={() => handleClick(item.id)}>Attempt!</Button>
            </div>

        )
    })

    const changePage = (data) => {
        console.log(data.selected)
        setPageNumber(data.selected)
    }

    const pageCount = Math.ceil(contents.length / contentPerPage);

    return (

        <div class='outer'>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationButtons"}
                previousLinkClassName={"previousButton"}
                nextLinkClassName={"nextButton"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
            <div class='inner'>
                {displayQuestions}
            </div>
        </div>

    );


}

function DisplayByContent() {
    const [pageNumber, setPageNumber] = useState(0)
    const [displayContent, setDisplayContent] = useState([]);
    const [completedQn,setCompletedQn] = useState([]);
    const [allQuestions, setAllQuestions] = useState([])
    const [questionState, setQuestionState] = useState("View Completed") // view incompleted questions only by default
    let { user } = useContext(AuthContext)


    useEffect(() => {
        let completed = []
        const fetchContent = async () => {
            const completedInfo = await axios.get(`http://52.220.90.9:8000/profile/${user.username}`);
            completed = Object.values(completedInfo.data)
            console.log("completed: ", completed)
            setCompletedQn(completed)
            const { data } = await axios.get("http://52.220.90.9:8000/contents/");
            setAllQuestions(data)
            let res = data.filter(item => !completed.includes(item.id));
            console.log("res: ", res)
            setDisplayContent(res);
        }

        fetchContent().catch(console.error)
    }, []);



    let navigate = useNavigate();
    const handleClick = (id) => {
        let path = '/content/' + id;
        navigate(path);
    }


    const contentPerPage = 5
    const pagesVisited = pageNumber * contentPerPage
    const displayQuestions = displayContent.slice(pagesVisited, pagesVisited + contentPerPage).map((item) => {
        return (
            <div className='contentContainer'>
                <div class='outer'>
                    <div class='inner'>
                        <div style={{display:"flex", color:"white", justifyContent:"center"}}>
                        {item.text}
                        </div>
                        <ReadonlyComponent padding="50px" code={item.code} />
                    </div>
                </div>
                <Button variant="dark" onClick={() => handleClick(item.id)}>Attempt!</Button>
            </div>

        )
    })

    const changePage = (data) => {
        console.log(data.selected)
        setPageNumber(data.selected)
    }

    const pageCount = Math.ceil(displayContent.length / contentPerPage);

    const handleCompletedClick = () => {
        if (questionState === "View Completed") {
            setQuestionState("View Incompleted")
            let content = allQuestions.filter(item => completedQn.includes(item.id));
            setDisplayContent(content)

        }
        else {
            setQuestionState("View Completed")
            let content = allQuestions.filter(item => !completedQn.includes(item.id));
            setDisplayContent(content)
        }
    }


    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <div style={{display:"flex", margin:"20px"}}>
            <Button onClick={handleCompletedClick}>{questionState}</Button>
            </div>
            {displayQuestions}
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationButtons"}
                previousLinkClassName={"previousButton"}
                nextLinkClassName={"nextButton"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </div>

    );


}

export { DisplayByTopic, DisplayByContent }

