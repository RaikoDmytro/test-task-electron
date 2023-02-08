import { createContext, useEffect, useState } from "react";
import { currentOrgDataStorage } from "../services";
import { storageCurrentOrgName } from "../config";

export const OrganizationContext = createContext({});

export const OrganizationProvider = ({ children }) => {
  const [organizations, setOrganizations] = useState([]);
  const [currentOrganization, setCurrent] = useState(0); // here must be an object of current organization


  useEffect(() => {
    const orgFromLocal = JSON.parse(currentOrgDataStorage());
    if (orgFromLocal) updateCurrent(orgFromLocal);
  }, []);

  useEffect(() => {
    if (organizations.length) updateCurrent(organizations[0]);
  }, [organizations]);

  const updateCurrent = (org) => {
    setCurrent(org);
    localStorage.setItem(storageCurrentOrgName, JSON.stringify(org));
  };

  const updateOrganizationsList = (orgs) => {
    setOrganizations(orgs || []);
  };

  const clear = () => {
    setOrganizations([]);
    setCurrent(0);
  };

  return (
    <OrganizationContext.Provider value={{
      organizations, current: currentOrganization,
      clear, updateCurrent, updateOrganizationsList
    }}>
      {children}
    </OrganizationContext.Provider>
  );
}

