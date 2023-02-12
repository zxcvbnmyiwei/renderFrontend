
import { useParams } from 'react-router-dom';
import React, {useState, useEffect} from "react";
import axios from 'axios';
import './Topic.css'
import Interpreter from './Interpreter';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MyComp from './pyComponent'
import ReadonlyComponent from './ReadonlyComponent';



function TopicInfo() {

  const { topicId } = useParams();

  const [section, setSection] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get("http://localhost:5000/create/topic/" + topicId);
            setSection(data['data'].section);
        }

        fetchData().catch(console.error)
    }, [topicId]);

    return section;
}


function DisplaySection() {
    const sectionArr = TopicInfo();
    const [sectionDetails, setSectionDetails] = useState([]);
    const { topicId } = useParams();

    useEffect(() => {
      localStorage.setItem('topicid', topicId)
    },[topicId]) 

    useEffect(() => {
        Promise.all(
            sectionArr.map(item => axios
            .get("http://localhost:5000/create/section/" + item)
            .then(res => res.data)
          )
        )
        .then((allData) => {
          setSectionDetails(allData);
        })
        .catch((error) => {
            console.log(error);
        }); 
      }, [sectionArr]);
      let navigate = useNavigate(); 
      const handleClick = (item) => {
        console.log(item.data.content);
        let path = '/section/' + item.data._id;
        navigate(path);
      }
      
      return (
        <div class='buttonContainer'>
        {
          sectionDetails.map(item => <button className='buttonClass' onClick={() => handleClick(item)}>{item.data.name}</button>)
        }
        </div>
      );

}


function DisplayContent() {

    const { sectionId} = useParams();
    const [singleSection, setSingleSection] = useState([]);
    const [nextSection, setNextSection] = useState("");
    const [contentArr,setContentArr] = useState([]);
    const topicId = localStorage.getItem('topicid');

    useEffect(() => {
        const {data} =  axios.get("http://localhost:5000/create/section/" + sectionId).then((data) => setContentArr(data.data.data.content));
    },[sectionId])
  

    useEffect(() => {
      // Closing the navbar will return in the Link back to the same url hence useLocation().state will be null, so need to check if its null before fetching data,
        Promise.all(
          contentArr.map(item => axios
          .get("http://localhost:5000/create/content/" + item)
          .then(res => res.data )
        )
        )
        .then((allData) => {
          setSingleSection(allData);
        })
        .catch((error) => {
            console.log(error);
        });
        const {data} =  axios.get("http://localhost:5000/create/getnextsection?topic=" + topicId + "&section=" + sectionId).then((data) => setNextSection(data.data.data)).catch(()=> setNextSection([]));
    }, [contentArr])


  const NextSection = () => {
    if (nextSection.length !== 0) {
      return (<button className='nextButton' onClick={() => handleClick(nextSection._id)}>{nextSection.name}</button>);
    }
  }
  let navigate = useNavigate(); 
  const handleClick = (id) => {
    let path = '/section/' + id;
    navigate(path);
  }

  return (
    <div className='contentContainer'>
      <NextSection />
      <div className='itemsInContainer'>
      {singleSection.map(item => <div>
        <p className='text' style={{whiteSpace: "pre-line"}}>
        {item.data.text}</p>
        <div className='Interpreter'>
        <Interpreter code={item.data.code} ranges={item.data.ranges}/>
        </div>
        </div>)}
        <MyComp />
        </div>
        </div>
  );


}
  
export {DisplaySection,DisplayContent};
