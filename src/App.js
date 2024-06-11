import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/context/UserContext';
import Navbar from './components/layouts/Navbar';
import Home from './components/Home';
import CategoryCar from './components/CategoryCar';
import CategoryTruck from './components/CategoryTruck';
import CategoryMotorcycle from './components/CategoryMotorcycle';
import VehicleDetails from './components/VehicleDetaills';
import AllVehicles from './components/AllVehicles';
import InterRegister from './components/InterRegister';
import StoreRegister from './components/StoreRegister';
import ClientLogin from './components/ClientLogin';
import InterLogin from './components/InterLogin';
import StoreLogin from './components/StoreLogin';
import ClientRegister from './components/ClientRegister';
import StoreScreen from './components/StoreScreen';
import StorePage from './components/StorePage';
import VehicleDetailsStore from './components/VehicleDetailsStore';
import AddVehicle from './components/AddVehicle';
import ClientPage from './components/ClientPage';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/vehicle/category/car' element={<CategoryCar />}></Route>
          <Route path='/vehicle/category/truck' element={<CategoryTruck />}></Route>
          <Route path='/vehicle/category/motorcycle' element={<CategoryMotorcycle />}></Route>
          <Route path='/vehicle/:id' element={<VehicleDetails />}></Route>
          <Route path='/vehicle/' element={<AllVehicles />}></Route>
          <Route path='/intermediate_register' element={<InterRegister />}></Route>
          <Route path='/intermediate_login' element={<InterLogin />}></Route>
          <Route path='/store/register' element={<StoreRegister />}></Route>
          <Route path='/client/register' element={<ClientRegister />}></Route>
          <Route path='/client/login' element={<ClientLogin />}></Route>
          <Route path='/store/login' element={<StoreLogin />}></Route>
          <Route path='/store/:id' element={<StoreScreen />}></Route>
          <Route path='/store/page/:id' element={<StorePage />}></Route>
          <Route path='/client/page/:id' element={<ClientPage />}></Route>
          <Route path='/myvehicle/:id' element={<VehicleDetailsStore />}></Route>
          <Route path='/vehicle/:type/store/:id' element={<AddVehicle />}></Route>
        </Routes>
        </UserProvider>
    </Router>
  );
}

export default App;
