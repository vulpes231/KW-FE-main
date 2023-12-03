import React from "react";
import "./App.css";
import SignUp from "./pages/signup";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import SignIn from "./pages/signin.jsx";
import DeskDash from "./components/DeskDash";
import ImportAccount from "./components/importaccount";
import CoinPage from "./components/CoinPage";
import Send from "./components/Send";
import CreateWallet from "./components/CreateWallet";
import SecurityPrivacy from "./components/SecurityPrivacy";
import MainHeader from "./components/MainHeader.jsx";
import LandingPage from "./components/LandingPage.jsx";
import CompleteSignUp from "./pages/completesignup.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={[<MainHeader />, <LandingPage />]} />
        <Route
          path="/completesignup"
          element={[<Header />, <CompleteSignUp />]}
        />
        <Route path="/signup" element={[<Header />, <SignUp />]} />
        <Route path="/signin" element={[<Header />, <SignIn />]} />
        <Route path="/dashboard" element={[<Header dash />, <Dashboard />]}>
          <Route path="" element={<DeskDash />} />
          <Route path="importwallet" element={<ImportAccount />} />
          <Route path="newwallet" element={<CreateWallet />} />
          <Route path="coin/:coin" element={<CoinPage />} />
          <Route path="send/:coin" element={<Send />} />
          <Route path="security&privacy" element={<SecurityPrivacy />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
