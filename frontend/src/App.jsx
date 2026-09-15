import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"

import StudentDashboard from "./pages/StudentDashboard"
import StudentProfile from "./pages/StudentProfile"

import Jobs from "./pages/Jobs"
import DriveDetails from "./pages/DriveDetails"
import Applications from "./pages/Applications"

import AddDrive from "./pages/AddDrive"
import MyDrives from "./pages/MyDrives"

import AdminDashboard from "./pages/AdminDashboard"
import ProfileVerification from "./pages/ProfileVerification"
import DriveApproval from "./pages/DriveApproval"
import AdminApplications from "./pages/AdminApplications"
import Notifications from "./pages/Notifications"


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />


        {/* Student */}
        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/student/profile"
          element={<StudentProfile />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/jobs/:id"
          element={<DriveDetails />}
        />

        <Route
          path="/applications"
          element={<Applications />}
        />


        {/* Coordinator */}
        <Route
          path="/coordinator/add-drive"
          element={<AddDrive />}
        />

        <Route
          path="/coordinator/my-drives"
          element={<MyDrives />}
        />


        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/profile-verification"
          element={<ProfileVerification />}
        />

        <Route
          path="/admin/drive-approvals"
          element={<DriveApproval />}
        />

        <Route
          path="/admin/applications"
          element={<AdminApplications />}
        />


        {/* Notifications */}
        <Route
          path="/notifications"
          element={<Notifications />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App