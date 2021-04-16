import axios from "axios";
import GetHeaderToken from "../../GetHeaderToken";
const URI = "https://localhost:3001/patient/api/getAll";
function GetPatients() {
  return axios
    .get(URI, { headers: GetHeaderToken() })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
export default GetPatients;
