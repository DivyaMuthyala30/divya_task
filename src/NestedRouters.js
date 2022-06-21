import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
// import './App.css';
import Courses from './Components/NestedRouting/Courses';
import Home from './Components/NestedRouting/Home';

import List from './Components/NestedRouting/List';
import Search from './Components/NestedRouting/Search';


function AppRouters() {
    
    return (
        <div className="App">
            <Router>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="courses">Courses</Link>
                </nav>
                <Routes>
                    <Route path="/Home" element={< Home />} />
                    <Route path="/courses" element={<Courses />}>
                    <Route path="search" element={<Search />} />
                    <Route path="list" element={<List />} />
                    </Route>

                </Routes>
            </Router>
        </div>
    );
}

export default AppRouters;
