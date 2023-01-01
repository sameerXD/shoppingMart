import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ColumnsGrid from "./pages/Homepage";
import AnonymousUser from './pages/AnonymousUser';
function App() {
  return (
    <Router>
    <div className="App">
      <div>
        <Routes>
          <Route path='/' element={<ColumnsGrid/>}>
          </Route>
        </Routes>

        <Routes>
          <Route path='/anonymousUser' element={<AnonymousUser />}>
          </Route>
        </Routes>

      </div>
    </div>
    </Router>
  );
}

export default App;
