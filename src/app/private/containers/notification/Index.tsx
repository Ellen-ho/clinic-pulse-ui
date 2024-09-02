import { Route, Routes } from "react-router-dom";
import NotificationList from "./pages/NotificationList";

const Notification: React.FC = () => {
  return (
    <Routes>
      <Route element={<NotificationList />} path="/" />
    </Routes>
  );
};

export default Notification;