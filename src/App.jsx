import React, {useCallback, useMemo} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes as AppRoutes} from "./routes";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./features/auth/login/Login";
import Dashboard from "./features/dashboard/Dashboard";
import CreatePassword from "./features/auth/createPassword/CreatePassword";
import ResetPassword from "./features/auth/resetPassword/ResetPassword";
import {isTokenExpired} from "./helpers/AccessControlUtils";
import {useDispatch, useSelector} from "react-redux";
import {setRedirectPath} from "./app/globalSlice";
import {Navigate, Outlet} from "react-router";
import Header from "./components/layout/header/Header";
import Sidebar from "./components/layout/sidebar/Sidebar";
import {Toaster} from "react-hot-toast";
import ForgetPassword from "./features/auth/forgetPassword/ForgetPassword.jsx";
// Import new pages
import Admission from "./features/admission/Admission.jsx";
import AdmissionDetail from "./features/admission/AdmissionDetail.jsx";
import VerifyStudent from "./features/admission/VerifyStudent.jsx";
// import Contact from "./pages/Contact";

function App() {
    const error = useSelector((state) => state.global.error);

    const PublicRoutes = React.memo(() => {
        return (
            <>
                <Outlet/>
            </>
        );
    });
    const PrivateRoutes = () => {
        const dispatch = useDispatch();
        const isUserLoggedIn = useMemo(() => localStorage.getItem("authToken"), []);
        const isAuthenticated = useMemo(() => isUserLoggedIn && !isTokenExpired(), [isUserLoggedIn]);
        const renderContent = useCallback(() => {
            if (!isAuthenticated) {
                // Capture the attempted path and redirect to login
                dispatch(setRedirectPath(window.location.pathname + window.location.search + window.location.hash));
                return <Navigate to="/"/>;
            }
            return (
                <div className="wrapper">
                    <div className="inner_wrapper">
                        <Header/>
                        <Sidebar/>
                        <Outlet/>
                    </div>
                </div>
            );
        }, [dispatch, isAuthenticated]);
        return renderContent();
    };


    return (
        <Router>
            <Toaster position="top-center" reverseOrder={false} />
            {!error &&
                <Routes>
                    {/* Public Routes without Layout */}
                    <Route element={<PublicRoutes/>}>
                        <Route path={AppRoutes.Default.path} element={<Login/>}/>
                        <Route path={AppRoutes.Login.path} element={<Login/>}/>
                        <Route path={AppRoutes.CreatePassword.path} element={<CreatePassword/>}/>
                        <Route path={AppRoutes.ResetPassword.path} element={<ResetPassword/>}/>
                        <Route path={AppRoutes.ForgotPassword.path} element={<ForgetPassword/>}/>
                    </Route>
                    {/* Private Routes with Layout */}
                    <Route element={<PrivateRoutes/>}>
                        <Route path={AppRoutes.Dashboard.path} element={<Dashboard/>}/>
                        {/* Contact Routes */}
                        <Route path={AppRoutes.Admission.path} element={<Admission/>}/>
                        <Route path={AppRoutes.Admission.New} element={<Admission/>}/>
                        <Route path={AppRoutes.Admission.List} element={<Admission/>}/>
                        <Route path={AppRoutes.Admission.Approved} element={<Admission/>}/>
                        <Route path={AppRoutes.Admission.Pending} element={<Admission/>}/>
                        <Route path={AppRoutes.Admission.Detail} element={<AdmissionDetail/>}/>
                        <Route path={AppRoutes.Admission.Verify} element={<VerifyStudent/>}/>
                        {/* Contact Routes */}
                        {/*<Route path={AppRoutes.Contact.path} element={<Contact/>}/>*/}
                        {/*<Route path={AppRoutes.Contact.List} element={<Contact/>}/>*/}
                        {/*<Route path={AppRoutes.Contact.Unread} element={<Contact/>}/>*/}
                        {/*<Route path={AppRoutes.Contact.Read} element={<Contact/>}/>*/}
                    </Route>
                </Routes>
            }

        </Router>

    );
}

export default App;
