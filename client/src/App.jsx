import logo from './logo.svg';
// import './App.css';

import {BrowserRouter as  Route,Routes} from 'react-router-dom';
import LandingPage from './pages/landing-page/landing-page.page';
import ListPage from './pages/list-page/list-page.page';

function App() {
  
  return (
    <div className='app'>  
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route
            exact
            path="/list"
            element={<ListPage/>}
          />
        </Routes>
    </div>  );
}

export default App;
