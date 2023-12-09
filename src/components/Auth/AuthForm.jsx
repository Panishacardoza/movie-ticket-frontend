import {
  Box,
  Dialog,
  FormLabel,
  Typography,
  TextField,
  Button,
  IconButton,
  
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { Link } from "react-router-dom";

const labelStyle = { mt: 1, mb: 1 };

// eslint-disable-next-line react/prop-types
const AuthForm = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  // handle change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
    console.log(inputs);
  };
  return (
    <Dialog open={true} PaperProps={{ style: { borderRadius: 20 } }}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to='/'>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant='h4' textAlign={"center"}>
        {isSignup ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          padding={4}
          display={"flex"}
          justifyContent={"center"}
          flexDirection='column'
          width={400}
          alignContent={"center"}
        >
          {!isAdmin && isSignup && (
            <>
              {" "}
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField
                variant='standard'
                margin='normal'
                type={"text"}
                value={inputs.name}
                onChange={handleChange}
                name='name'
              />
            </>
          )}
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            variant='standard'
            margin='normal'
            type={"email"}
            value={inputs.email}
            onChange={handleChange}
            name='email'
          />
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            margin='normal'
            variant='standard'
            type={"password"}
            value={inputs.password}
            onChange={handleChange}
            name='password'
          />
          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type='submit'
            fullWidth
            variant='contained'
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          {!isAdmin && (
            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ mt: 2, borderRadius: 10 }}
              fullWidth
            >
              Switch To {isSignup ? "Login" : "Signup"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
