import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import React, {useState, useEffect} from "react";
import axios from 'axios';


function GetTopic() {
    const [topics, setTopic] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get("http://52.220.90.9:8000/topics/");
            setTopic(data);
        }

        fetchData().catch(console.error)
    }, []);

    console.log(topics)

    return topics;

}

function GetSideBarData() {
    const topicDetails = GetTopic();
    const sidebarArrObj  = [
        {
            title: 'Home',
            path: '/',
            icon: <AiIcons.AiFillHome />,
            cName: 'nav-text'
        },
        {
          title: 'Tkinter Generator',
          path: '/tk',
          icon: <IoIcons.IoIosPaper />,
          cName: 'nav-text'
        },     
        {
          title: 'Multiple File',
          path: '/test',
          icon: <IoIcons.IoIosPaper />,
          cName: 'nav-text'
        },     
        {
          title: 'View All Content',
          path: '/content',
          icon: <IoIcons.IoIosPaper />,
          cName: 'nav-text'
      },      
      ];
    
      const Topic = {
        title: 'Topics',
        path: '#',
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: []
      }
    
      // console.log("test print: ", topicObject.title)
    Object.entries(topicDetails).map(([key, value]) => {
      var topicObject = {};
      topicObject.title = value.name;
      topicObject.path = '/topic/' + value.id;
      topicObject.icon = <IoIcons.IoIosPaper />
      topicObject.cName = 'nav-text'
      Topic.subNav.push(topicObject);
    })
    
      sidebarArrObj.push(Topic)

      return sidebarArrObj;
}

export default GetSideBarData;