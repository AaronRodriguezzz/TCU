import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AccountPage from "./pages/AccountPage";
import GradesPage from "./pages/GradesPage";
import StudentsPage from "./pages/StudentPage";
import Layout from "./layouts/ProfLayout";
import StudentViewPage from "./pages/StudentInfoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />

        {/* Admin routes with shared layout */}
        <Route element={<Layout />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/grades" element={<GradesPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/student/:id" element={<StudentViewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
