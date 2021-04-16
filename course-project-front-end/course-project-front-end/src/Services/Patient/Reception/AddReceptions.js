import axios from "axios";
import GetHeaderToken from "../../GetHeaderToken";
const URI = "https://localhost:3001/reception/api/post";
function AddReception(date_reception, symptoms, id_doctor, time) {
  return axios
    .post(
      URI,

      {
        date_reception: date_reception,
        symptoms: symptoms,
        id_doctor: id_doctor,
        time: time,
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
