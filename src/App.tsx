import { useState, useEffect, useMemo } from "react";
import Navigation from "./Router/Navigation";
// import { useNavigate } from "react-router-dom";
import AuthContext from "./context/TokenContext";
import { decodeToken, getToken } from "./functions/SendToken";
import Auth from "./Components/Auth/Auth";
function App() {
  // const route = useNavigate();
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();

    if (token) {
      const decodedToken = decodeToken(token!);
      setAuth(decodedToken as any);
    } else {
      setAuth(undefined);
    }
  }, []);

  const authData = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <>
      <AuthContext.Provider value={authData as any}>
        {authData.auth ? <Navigation /> : <Auth />}
      </AuthContext.Provider>
    </>
  );
}

export default App;
