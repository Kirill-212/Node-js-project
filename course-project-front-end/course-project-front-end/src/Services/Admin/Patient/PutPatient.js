import axios from "axios";
import GetHeaderToken from "../../GetHeaderToken";
const URI = "https://localhost:3001/patient/api/put/";
function PutUser(id, homeaddress, passport) {
  return axios
    .put(
      URI + id,
      {
        homeaddress: homeaddress,
        passport: passport,
      },
      { headers: GetHeaderToken() }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
export default PutUser;
