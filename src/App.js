import React from "react";
import './App.css';
import {AppHeader} from "./components/AppHeader";
import {AdminBloodTests} from "./components/AdminBloodTests";

function App() {
  return (
    <div className="app">
        <AppHeader/>
        <AdminBloodTests/>
    </div>
  );
}

export default App;
