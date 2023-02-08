import React, { useContext }  from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from "./components/loading/Loading";
import Header from "./components/header/Header";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Login from "./components/auth/Login";
import Home from "./containers/home/Home";
import NewProject from "./components/project/NewProject";
import NotFound from "./components/errors/NotFound";
import { AuthContext } from "./context/auth-context";

function App() {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) return <Loading />;
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route
          path="new-project"
          element={
            <PrivateRoute>
              <NewProject />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
