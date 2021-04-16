import axios from "axios";
import GetHeaderToken from "../../GetHeaderToken";
const URI = "https://localhost:3001/patient/api/post";
function AddPatient(homeaddress, passport, id_users) {
  return axios
    .post(
      URI,
      {
        homeaddress: homeaddress,
        id_users: id_users,
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
export default AddPatient;
