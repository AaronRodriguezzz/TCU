import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Student/Homepage";
import Login from "./pages/Student/Login";
import StudentGrades from "./pages/Student/GradesPage";
import StudentProfile from "./pages/Student/Profile";

import AccountPage from "./pages/Admin/AccountPage";
import GradesPage from "./pages/Admin/GradesPage";
import StudentsPage from "./pages/Admin/StudentPage";
import StudentViewPage from "./pages/Admin/StudentInfoPage";

import AdminLayout from "./layouts/ProfLayout";
import UserLayout from "./layouts/UserLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />

        <Route element={<UserLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/grades/:id" element={<StudentGrades />} />
          <Route path="/profile" element={<StudentProfile />} />
        </Route>

        {/* Admin routes with shared layout */}
        <Route element={<AdminLayout />}>
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
