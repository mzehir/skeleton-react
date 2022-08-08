import React from "react";
import { Router } from "./router/router";
import { AuthProvider } from "./contexts/auth-ceate-context";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router />
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </header> */}
      </div>
    </AuthProvider>
  );
}

export default App;
