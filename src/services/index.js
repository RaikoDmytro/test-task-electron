import {
  storageAuthTokenName,
  storageCurrentOrgName,
  storageUserDataName
} from "../config";

export const projectBaseURI = (orgName) => `https://${orgName}.trackabi.com`;

export const authTokenStorage = () => localStorage.getItem(storageAuthTokenName);

export const userDataStorage = () => localStorage.getItem(storageUserDataName);

export const currentOrgDataStorage = () => localStorage.getItem(storageCurrentOrgName);

export const filterObject = (currentValue, properties) => {
  const objFiltering = (object) => {
    let obj = {};
    for (const key of Object.keys(object)) {
      for (const property of properties) {
        if (key === property) {
          obj = { ...obj, [key]: object[key]};
        }
      }
    }
    return obj;
  };

  return Array.isArray(currentValue)
    ? currentValue?.map((object) => objFiltering(object)).filter((object) => Object.keys(object).length !== 0)
    : objFiltering(currentValue);
};
