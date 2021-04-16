import axios from "axios";
import GetHeaderToken from "../../GetHeaderToken";
const URI = "https://localhost:3001/reception/api/put/";
function AddReception(id_reception, comments, diagnosis) {
  return axios
    .put(
      URI + id_reception,

      {
        comments: comments,
        diagnosis: diagnosis,
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
export default AddReception;
