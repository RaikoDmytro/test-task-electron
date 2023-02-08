import { trackabiAPI } from "../../../api";
import { projectBaseURI } from "../../index";

export const projectsByOrgAlias = async (orgName) => trackabiAPI.get(`/api/${projectBaseURI(orgName)}/project/list`);

export const create = async (orgName, data) => trackabiAPI.post(`/api/${projectBaseURI(orgName)}/project/create`, data);
