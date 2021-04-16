import axios from "axios";
import GetHeaderToken from "../../GetHeaderToken";
const URI = "https://localhost:3001/user/api/putRole";
function PutUserRole(id_users) {
  return axios
    .put(
      URI,

      {
        id_users: id_users,
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
export default PutUserRole;
