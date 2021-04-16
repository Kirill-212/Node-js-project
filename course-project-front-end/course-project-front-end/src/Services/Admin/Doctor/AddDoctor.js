import axios from "axios";
import GetHeaderToken from "../../GetHeaderToken";
const URI = "https://localhost:3001/doctor/api/post";
function AddDoctor(name_hospital, homeaddress, specialty, id_users, passport) {
  return axios
    .post(
      URI,

      {
        name_hospital: name_hospital,
        homeaddress: homeaddress,
        specialty: specialty,
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
export default AddDoctor;
