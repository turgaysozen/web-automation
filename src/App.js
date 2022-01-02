import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect
} from "react-router-dom";

import CreateUser from './components/UserInfoForm';
import ScrapeInfo from './components/ScrapeInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='' element={<CreateUser/>}/>
        <Route path='/scrape' element={<ScrapeInfo/>}/>
      </Routes>
    </Router>
  );
}

export default App;
