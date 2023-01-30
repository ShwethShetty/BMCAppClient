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
import {Fragment} from 'react'
function App() {
  
  return (
      <Fragment>
        <Navbar />
        <Router>
          <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/list" element={<ListPage/>}/>
            <Route exact path="/addhost" element={<HostAdd/>}/>
            <Route exact path="/clicreds" element={<CliCredsPage/>}/>
          </Routes>
        </Router>
      </Fragment>
      
  );
}

export default App;
