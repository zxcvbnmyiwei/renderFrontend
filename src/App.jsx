import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
import Dropdown from './components/dropdown';
import Interpreter from './components/Interpreter';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {DisplaySection,DisplayContent} from './components/Topic';
import {DisplayByTopic,DisplayByContent} from './components/ByTopic'
import { AttemptQuestion } from './components/Content';
import MultipleFiles from './components/MultipleFiles';
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';
import  Header  from './components/Header';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import TkComp from './components/TkComp';

function App() {


  return (
    <div className="mainbackground">
      <Router>
        <AuthProvider>
        <Navbar />
        <Header />
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path = '/' element={<Home />} exact />
            <Route path = 'topic/:topicId' element = {<DisplayByTopic />}/>
            <Route path = 'section/:sectionId' element = {<DisplayContent />}/>
            <Route path = 'content' element = {<DisplayByContent />}/>
            <Route path = 'content/:contentId' element = {<AttemptQuestion />}/>
            <Route path = 'test' element = {<MultipleFiles />}/>
            <Route path = 'tk' element = {<TkComp />}/>
          </Route>
          <Route path = 'login' element={<LoginPage />} />
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}



export default App;
