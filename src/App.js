import React from "react";
import { Router } from "./router/router";
import { AuthProvider } from "./contexts/auth-ceate-context";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
