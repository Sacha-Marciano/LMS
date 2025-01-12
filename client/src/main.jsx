// Main, used to wraap app with context providers

// React
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Context providers
import AuthProvider from "./context/auth-context";
import InstructorProvider from "./context/instructor-context";
import StudentProvider from "./context/student-context";

// Components
import App from "./App.jsx";

// Styles
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InstructorProvider>
        <StudentProvider>
          <App />
        </StudentProvider>
      </InstructorProvider>
    </AuthProvider>
  </BrowserRouter>
);
