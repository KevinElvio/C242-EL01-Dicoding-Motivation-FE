import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Survey from "./pages/Survey/Survey.jsx";
import SkillRadar from "./pages/SkillRadar.jsx";
import ReminderSchedule from "./pages/Reminder/ReminderSchedule.jsx";
import Streak from "./pages/Streak.jsx";
import Badges from "./pages/Badges/Badges.jsx";
import RedeemPoint from "./pages/Badges/RedeemPoint.jsx";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import CreateReminder from "./pages/Reminder/CreateReminder.jsx";
import EditReminder from "./pages/Reminder/EditReminder.jsx";
import DetailReminder from "./pages/Reminder/DetailReminder.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="new-features" element={<Layout />}>
          <Route index element={<Leaderboard />} />
          <Route path="skill-radar" element={<SkillRadar />} />
          <Route path="survey" element={<Survey />} />
          <Route path="reminder-schedule" element={<ReminderSchedule />} />
          <Route path="reminder-schedule/add" element={<CreateReminder />} />
          <Route
            path="reminder-schedule/detail/:id"
            element={<DetailReminder />}
          />
          <Route path="reminder-schedule/edit/:id" element={<EditReminder />} />
          <Route path="badges" element={<Badges />} />
          <Route path="streak" element={<Streak />} />
          <Route path="redeem-points" element={<RedeemPoint />} />
        </Route>
        {/* <App /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
