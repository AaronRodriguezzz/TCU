import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Student/Homepage";
import Login from "./pages/Student/Login";
import StudentGrades from "./pages/Student/GradesPage";
import StudentProfile from "./pages/Student/Profile";

import ClassesPage from "./pages/Admin/Classes";
import GradesPage from "./pages/Admin/GradesPage";
import AttendancePage from "./pages/Admin/Attendance";
import DepartmentsPage from "./pages/Admin/Departments";
import DocumentsPage from "./pages/Admin/Documents";
import AnnouncementsPage from "./pages/Admin/Announcements";
import AccountPage from "./pages/Admin/AccountPage";
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
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/grades" element={<GradesPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/student/:id" element={<StudentViewPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
