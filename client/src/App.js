import {Routes,Route} from "react-router-dom"
import Indexpage from "./pages/Indexpage";
import Loginpage from "./pages/Loginpage";
import Layout from "./Layout";
import Registerpage from "./pages/Registerpage";
import axios from "axios";
import { Usercontextprovider } from "./Context";
import Accountpage from "./pages/Accountpage";
import PlacesFormPage from "./pages/Placesformpage";
import Myplacespage from "./pages/Myplacespage";
import Eachplace from "./pages/Eachplace";
import Bookings from "./pages/Bookings";
import Mybookings from "./pages/Mybookings";
axios.defaults.baseURL='http://localhost:4000'
axios.defaults.withCredentials= true;
function App() {
  return (
    <Usercontextprovider>
    <Routes>
      <Route path="/" element={<Layout />}>
<Route path="/" element={<Indexpage/>}/>
<Route path="/login" element={<Loginpage/>}/>
<Route path="/register" element={<Registerpage/>}/>
<Route path="/account" element={<Accountpage/>}/>
          <Route path="/account/places" element={<Myplacespage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<Eachplace />} />
          <Route path="/account/bookings" element={<Bookings />} />
          <Route path="/account/bookings/:id" element={<Mybookings />} />
</Route>
    </Routes>
   </Usercontextprovider>
  );
}

export default App;
