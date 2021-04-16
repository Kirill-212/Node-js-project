import axios from "axios";
const URI = "https://localhost:3001/user/api/AutUser";
function Authorization(email, password) {
  return axios
    .post(URI, {
      email: email,
      password: password,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
export default Authorization;
