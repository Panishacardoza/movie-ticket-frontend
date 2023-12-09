import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import Movies from "./components/Movies/Movies";
import { useSelector, useDispatch } from "react-redux";
import { adminActions, userActions } from "./store";
import { useEffect } from "react";
import Booking from "./components/Bookings/Booking";
import UserProfile from "./Profile/UserProfile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./Profile/AdminProfile";

function App() {
  // redux state
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("Admin Log", isAdminLoggedIn);
  console.log("User Log", isUserLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <section>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<Movies />} />
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path='/admin' element={<Admin />} />
              <Route path='/auth' element={<Auth />} />
            </>
          )}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
              <Route path='/user' element={<UserProfile />} />
              <Route path='/booking/:id' element={<Booking />} />
            </>
          )}
          {isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <Route path='/add' element={<AddMovie />} />
              <Route path='/user-admin' element={<AdminProfile />} />
            </>
          )}
        </Routes>
      </section>
    </>
  );
}

export default App;
