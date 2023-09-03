import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Main} from './pages/Main';
import {SavedTrips} from './pages/SavedTrips';
import {Login} from './pages/Login';
import {Navbar} from './components/Navbar';

function App() {
  return (
    <>
      <div className="App"> 
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/saved-trips" element={<SavedTrips/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </Router>
      </div>
  
    </>

  );
}

export default App;
