import axios from "axios";
import GetHeaderToken from "../../GetHeaderToken";
const URI = "https://localhost:3001/user/api/put/";
function PutUser(id, first_name, last_name, email, bday, gender) {
  return axios
    .put(
      URI + id,

      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        bday: bday,
        gender: gender,
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
