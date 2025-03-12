import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import axios from "axios"
import Header from './components/Header';
import NavigationRoute from './components/NavigationRoute';
import ScrollToTop from "./helper/ScrollToTop";
function App() {
  // const userAuth =  () => {
    const userData = {
      email     : "focalapi@gmail.com",
      password  : "A$#ORBD@12&098"
    }
    axios.post("https://focalrealestate.com.au/internal_api/admin/api/focal/login", userData).then(response => {
      localStorage.setItem('user_data', JSON.stringify(response.data.token))
    })
  // }
  return (
    <Router>
        <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/*" element={<NavigationRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
