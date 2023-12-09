import { useDispatch } from "react-redux";
import { sendUserAuthRequest } from "../../helper/ApiHelpers";
import AuthForm from "./AuthForm";
import { userActions } from "../../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResRecevied = (data) => {
    console.log("ResRecevied", data);
    dispatch(userActions.login());
    console.log("id", data);
    localStorage.setItem("userId", data.id);
    navigate("/");
  };
  const getData = (data) => {
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResRecevied)
      .catch((err) => console.log(err));
  };

  return <AuthForm onSubmit={getData} isAdmin={false} />;
};

export default Auth;
