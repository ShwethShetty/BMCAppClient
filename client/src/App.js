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
import {Fragment, useEffect} from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {getToken} from "../redux/user/user.selector";
function App() {
  const [user, setUser] = useState(null)
  const [activeHost, setActiveHost] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      const res = axios.get("http://localhost:5000/api/users",
        {
          headers: {
            "Content-type": "application/json",
            "Authorization": fetchedToken
          }
        }
      )

      localStorage.setItem('user', res.data)
    }

    fetchUser()
  }, [])
  
  return (
      <Fragment>
        <Navbar />
        <Router>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/list" element={<ListPage/>}/>
            <Route exact path="/addhost" element={<HostAdd/>}/>
            <Route exact path="/console" element={<Console/>} />
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
