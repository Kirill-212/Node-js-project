import axios from "axios";
import GetHeaderToken from "../../GetHeaderToken";
const URI = "https://localhost:3001/doctor/api/put/";
function PutUser(id, name_hospital, homeaddress, specialty, passport) {
  return axios
    .put(
      URI + id,

      {
        name_hospital: name_hospital,
        homeaddress: homeaddress,
        specialty: specialty,
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
