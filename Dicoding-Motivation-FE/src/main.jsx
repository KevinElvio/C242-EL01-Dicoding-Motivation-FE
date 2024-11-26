import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Badges from "./pages/Badges.jsx";
import Survey from "./pages/Survey.jsx";
import SkillRadar from "./pages/SkillRadar.jsx";
import ReminderSchedule from "./pages/ReminderSchedule.jsx";
import Streak from "./pages/Streak.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="new-features" element={<Layout />}>
          <Route index element={<Leaderboard />} />
          <Route path="skill-radar" element={<SkillRadar />} />
          <Route path="survey" element={<Survey />} />
          <Route path="reminder-schedule" element={<ReminderSchedule />} />
          <Route path="badges" element={<Badges />} />
          <Route path="streak" element={<Streak />} />
        </Route>
        {/* <App /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
