import axios from "axios";
import GetHeaderToken from "../../GetHeaderToken";
const URI = "https://localhost:3001/user/api/Delete/";
function DeleteUsers(id) {
  return axios
    .delete(URI + id, { headers: GetHeaderToken() })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
export default DeleteUsers;
