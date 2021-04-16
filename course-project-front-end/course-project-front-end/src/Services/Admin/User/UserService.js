import axios from "axios";
import GetHeaderToken from "../../GetHeaderToken";
const URI = "https://localhost:3001/user/api/getAll";
function GetUsers() {
  return axios
    .get(URI, { headers: GetHeaderToken() })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
export default GetUsers;
