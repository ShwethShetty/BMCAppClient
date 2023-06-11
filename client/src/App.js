// import logo from './logo.svg';
// import './App.css';

import {BrowserRouter as  Router,Route,Routes} from 'react-router-dom';
// import LandingPage from './pages/landing-page/landing-page.page';
import ListPage from './pages/list-page/list-page.page';
import CliCredsPage from './pages/cli-creds-page/cli-creds-page';
import Login from './components/Login';
import Register from './components/Register'
import Navbar from './components/Navbar'
import HostAdd from './components/HostAdd'
import Console from './components/Console';
import {Fragment, useEffect, useState} from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {getToken} from "./redux/user/user.selector";
import HostList from './components/HostList';
import axios from 'axios';

function App({fetchedToken}) {
  // const [user, setUser] = useState(null)
  // const [activeHost, setActiveHost] = useState("localhost")

  // console.log("user in app:", user);
  // console.log("activeHost in app:", activeHost);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await axios.get("http://localhost:5000/api/users",
  //       {
  //         headers: {
  //           "Content-type": "application/json",
  //           "Authorization": fetchedToken
  //         }
  //       }
  //     )

  //     setUser(res.data)
  //   }

  //   fetchUser()
  // }, [])

  // const getActiveHost = (selectedActiveHost) => {
  //   console.log("selectedActiveHost:", selectedActiveHost);
  //   // setActiveHost(selectedActiveHost)
  // }
  
  return (
      <Fragment>
        <Navbar />
        <Router>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/list" element={<ListPage/>}/>
            <Route exact path="/hosts" element={<HostList/>}/> 
            <Route exact path="/addhost" element={<HostAdd/>}/>
            {/* activeHost={activeHost} */}
            <Route exact path="/console" element={<Console />} />
            {/* activeHost={activeHost} */}
            <Route exact path="/clicreds" element={<CliCredsPage/>}/>
          </Routes>
        </Router>
      </Fragment>
      
  );
}

const mapStateToProps = createStructuredSelector({
  fetchedToken: getToken,
});

export default connect(mapStateToProps,null)(App);
