import AuthForm from "../Auth/AuthForm";
import { sendAdminRequest } from "../../helper/ApiHelpers";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResRecevied = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };
  const getData = (data) => {
    sendAdminRequest(data.inputs)
      .then(onResRecevied)
      .catch((err) => console.log(err));
  };

  return <AuthForm onSubmit={getData} isAdmin={true} />;
};

export default Admin;
