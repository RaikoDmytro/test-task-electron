import {createContext, useContext, useEffect, useState} from "react";
import { login as loginAPI } from '../services/CRUD/auth/';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { filterObject, userDataStorage, authTokenStorage } from "../services";
import {organizationRequestFilterObject, storageAuthTokenName, storageUserDataName} from "../config";
import { OrganizationContext } from "./organization-context";

export const AuthContext = createContext({});

const initialUser = {
  name: '',
  avatar: null,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clear, updateOrganizationsList } = useContext(OrganizationContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  useEffect(() => {
    setIsAuth(false);
    // here must be checking  login
    if (authTokenStorage() && userDataStorage()) {
      const { user: u, organizations: o } = JSON.parse(userDataStorage());
      setUser(u);
      updateOrganizationsList(o);
      setError(null);
      setIsAuth(true);
      setIsLoading(false);
    } else { logout(); }

    return () => { queryClient.cancelQueries('login') };
  }, []);

  const { mutate: loginQuery } = useMutation({
    mutationFn: (body) => loginAPI(body),
    mutationKey: 'login',
    onSuccess: (data) => {
      const { headers, status, data: body  } = data;

      if (body?.errors && (body.errors.length || Object.keys(body.errors).length)) {
        clearStorage();
        setError(body.errors?.password || body.errors?.email || `Something want wrong`);
      } else if (status === 200
        && data.data.data?.account
        && headers['authorization'].split(' ')[1]) {
        const userObject = {
          name: data.data.data?.account.name,
          avatar: data.data.data?.account.avatar?.image
        };

        const { organizations: organizationsArray } = data.data.data?.account;

        setUser(userObject);
        const filteredOrg = filterObject(organizationsArray, organizationRequestFilterObject);

        localStorage.setItem(storageAuthTokenName, headers['authorization'].split(' ')[1]);
        localStorage.setItem(storageUserDataName, JSON.stringify({
          user: userObject,
          organizations: filteredOrg,
        }));

        setError(null);
        setIsAuth(true);
        updateOrganizationsList(filteredOrg);

        navigate('/');
      }
      setIsLoading(false);
    },
    onError: () => {
      logout();
    },
  });

  const clearStorage = () => {
    localStorage.clear();
    clear();
    setUser(initialUser);
    setIsAuth(false);
    setIsLoading(false);
    setError(null);
  }

  const login = async (values) => {
    setIsLoading(true);

    loginQuery({
      LoginForm: values,
    });
  };

  const logout = () => {
    clearStorage();
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{
      user, isAuth, isLoading, error, login ,logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
