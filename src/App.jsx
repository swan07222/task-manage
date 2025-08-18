import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Add from './component/routes/add.jsx'
import Edit from './component/routes/edit.jsx'
import About from './component/routes/about.jsx'
import Navbar from './component/layout/Navbar.jsx'
import Landing from './component/layout/Landing.jsx'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  return (
    <Router>
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter} 
        categoryFilter={categoryFilter}      
        setCategoryFilter={setCategoryFilter} 
      />
      <Routes>
        <Route path='/' element={
          <Landing 
            searchTerm={searchTerm} 
            statusFilter={statusFilter} 
            categoryFilter={categoryFilter} 
          />
        }/>
        <Route exact path='/add' element={<Add />} />
        <Route exact path='/edit/:id' element={<Edit />} />
        <Route exact path='/about' element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
