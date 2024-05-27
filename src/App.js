import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import "./styles/home.css";
import "./styles/footer.css";
import "./styles/auth.css";
import "./styles/navbar.css";

import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import "react-notifications/lib/notifications.css";
import Books from "./pages/Books";
import Logout from "./pages/Logout";
import DetailPage from "./pages/DetailPage";

const App = () => {
    return (
        <div className="content">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<MainPage />} />
                        <Route path="books" element={<Books />} />
                        <Route path="book/:id" element={<DetailPage />} />
                    </Route>
                    <Route path="auth" element={<Auth />} />
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                    <Route
                        path="forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
