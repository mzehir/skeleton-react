import React from "react";
import { Router } from "./router/router";
import { ApiProvider } from "./contexts/api-create-context";
import { AuthProvider } from "./contexts/auth-create-context";

function App() {
  return (
    <ApiProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ApiProvider>
  );
}

export default App;
