import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from "./pages/auth/index"
import Dashboard from './pages/dashboard/index';
import "./app.css"
import Navbar from './components/navbar/navbar';
import Home from './pages/otherPages/home';
import About from './pages/otherPages/about';
import Contact from './pages/otherPages/contact';
import Tracker from './pages/otherPages/tracker';
import AuthMobile from './pages/auth/indexMobile';
import { ParticleAnimation } from './components/particles/particles';
import { Todo } from './components/extras/todo-list';
import { Footer } from './components/extras/Footer';


function App() {

  return (
    <>
      <BrowserRouter>
        <ParticleAnimation />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/authmobile" element={<AuthMobile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
