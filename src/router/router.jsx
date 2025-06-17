import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../user/Home";
import Product from "../user/Product";
import Navbar from "../components/Navbar";
import Dashboard from "../admin/Dashboard";
import AdminDashboard from "../admin/Pages/AdminDashboard";
import CreateAdmin from "../admin/Pages/CreateAdmin";
import Login from "../admin/Pages/Login";
import AddProduct from "../admin/Pages/AddProduct";
import GetProduct from "../admin/Pages/GetProduct";
import GetByIdProduct from "../admin/Pages/GetByIdProduct";
import EditProduct from "../admin/Pages/EditProduct";
import Details from "../user/Details";
import Men from "../user/Men";
import Women from "../user/Women";
import Children from "../user/Children";
import Contact from "../user/Contact";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        {/* User */}
        <Route path="/" element={ <Navbar />} >
        <Route path="/" element={ <Home /> }/>
        <Route path="/Login" element={ <Login /> }/>
        <Route path="/Product" element={ <Product /> }/>
        <Route path="/Product/detail/:id" element={ <Details /> }/>
        <Route path="/Men" element={ <Men /> }/>
        <Route path="/Women" element={ <Women /> }/>
        <Route path="/Children" element={ <Children /> }/>
        <Route path="/Contact" element={ <Contact /> }/>

        {/* admin */}
        <Route path="/adminDashboard" element={ <Dashboard /> }>
           <Route path="/adminDashboard" element={ <AdminDashboard /> } />
           <Route path="/adminDashboard/CreateAdmin"  element={ <CreateAdmin /> }/>
           <Route path="/adminDashboard/createProduct"  element={ <AddProduct /> }/>
           <Route path="/adminDashboard/getProduct"  element={ <GetProduct /> }/>
           <Route path="/adminDashboard/getProductById/:id"  element={ <GetByIdProduct /> }/>
           <Route path="/adminDashboard/updateProduct/:id"  element={ <EditProduct /> }/>
        </Route>
        </Route>
        </>
    )
)

export default router;