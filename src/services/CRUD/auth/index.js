import { trackabiAPI } from "../../../api";
import {trackabiDefaultURI} from "../../../config";

export const login = async (body) => trackabiAPI.post(`/api/${trackabiDefaultURI}/user/login?realUtcOffset=120&timezone=Europe%2FKiev`, body);
