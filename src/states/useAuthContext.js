import {useContext} from "react";
import { AuthContext } from "../context/auth-context";

const useAuthContext = () => {
  const user = useContext(AuthContext);
  if (user === undefined) {
    throw new Error("");
  }
  return user;
};

export default useAuthContext;
