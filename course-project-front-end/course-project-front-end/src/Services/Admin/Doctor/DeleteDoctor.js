import axios from "axios";
import GetHeaderToken from "../../GetHeaderToken";
const URI = "https://localhost:3001/doctor/api/delete/";
function DeleteDoctor(id) {
  return axios
    .delete(URI + id, { headers: GetHeaderToken() })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
export default DeleteDoctor;
