import axios from "axios";
const URI = "https://localhost:3001/user/api/post";
function Register(first_name, last_name, email, password, gender, bday) {
  return axios
    .post(URI, {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      gender: gender,
      bday: bday,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
export default Register;
