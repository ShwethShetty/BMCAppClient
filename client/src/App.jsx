import logo from './logo.svg';
// import './App.css';

import {BrowserRouter as  Router,Route,Routes} from 'react-router-dom';
import LandingPage from './pages/landing-page/landing-page.page';
import ListPage from './pages/list-page/list-page.page';
import SignUpPage from './pages/signup-page/sign-up-page';
import CliCredsPage from './pages/cli-creds-page/cli-creds-page';
function App() {
  
  return (
    // <div className='app'>  
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route exact path="/signup" element={<SignUpPage/>}/>
          <Route exact path="/list" element={<ListPage/>}/>
          <Route exact path="/clicreds" element={<CliCredsPage/>}/>
        </Routes>
      </Router>
      );
}

export default App;
