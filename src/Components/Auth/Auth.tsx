import { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";

const Auth = () => {
  const [goRegister, setGoRegister] = useState(false);
  console.log(goRegister);
  return (
    <>{!goRegister ? <Login setGoRegister={setGoRegister} /> : <Register setGoRegister={setGoRegister} />}</>
  );
};

export default Auth;
