import React from "react";
import { Redirect } from "react-router";
import AddReceptionService from "../../../Services/Patient/Reception/AddReceptions";
import Spinner from "../../Spinner";
import Socket from "../../../Socket/Socket-client";
const AddReception = (props) => {
  const [date_reception, setDateReception] = React.useState("");
  const [symptoms, setSymptoms] = React.useState("");
  const [id_doctor, setIdDoctor] = React.useState("");
  const [time, setTime] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [MessageError, setMessageError] = React.useState("");
  const [redirectPatient, setRedirectPatient] = React.useState(false);

  async function submitReception(event) {
    event.preventDefault();

    setMessageError("");
    setLoading(true);
    let response = await AddReceptionService(
      date_reception,
      symptoms,
      id_doctor,
      time
    );
    setLoading(false);
    if (response === undefined) {
      setMessageError("Check connect server");
    } else {
      if (response.status !== 200) {
        if (response.data.ERROR !== undefined) {
          if (response.data.ERROR.details !== undefined) {
            setMessageError(response.data.ERROR.details[0]["message"]);
          } else {
            setMessageError(response.data.ERROR);
          }
        } else {
          setMessageError(response.data);
        }
      } else {
        Socket.socketSendReceptionList("Update");
        setRedirectPatient(true);
      }
    }
  }

  function ValidField() {
    return (
      date_reception.length > 0 &&
      symptoms.length > 0 &&
      id_doctor.length > 0 &&
      time.length > 0
    );
  }
  const styles = {
    maxWidth: "700px",
    border: "none",
  };
  return (
    <div className="d-flex   justify-content-center align-items-center ">
      <div className="   p-4  w-100" style={styles}>
        <form onSubmit={submitReception}>
          <h1 className="d-flex   justify-content-center align-items-center ">
            Post reception
          </h1>

          <div className="form-group mb-2 ">
            <label>Symptoms</label>
            <textarea
              value={symptoms}
              maxLength="100"
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setSymptoms(e.target.value)}
              name="symptoms"
              rows="4"
              placeholder="Enter symptoms..."
            />
          </div>
          <div className="form-group mb-2">
            <label>Id doctor</label>
            <input
              value={id_doctor}
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setIdDoctor(e.target.value)}
              name="id_doctor"
              type="text"
              placeholder="Enter id doctor..."
            />
          </div>
          <div className="form-group mb-2">
            <label>
              Time(select time in the interval:9:00-13:00 ||14:00-17:00 minutes
              can be chosen:00,15,30)
            </label>
            <input
              value={time}
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setTime(e.target.value)}
              name="time"
              type="text"
              placeholder="Enter time..."
            />
          </div>
          <div className="form-group mb-2">
            <p>
              Date reception:
              <input
                className="shadow-lg  bg-white rounded ml-1"
                type="date"
                name="bday"
                onChange={(e) => setDateReception(e.target.value)}
              />
            </p>
          </div>
          <div className="d-flex justify-content-center form-outline mt-3">
            <div className="flex-fill">
              <button
                type="submit"
                disabled={!ValidField()}
                className="btn btn-success w-100 "
              >
                Post
              </button>
            </div>
          </div>
          {loading && <Spinner />}
        </form>
        <div className="row mt-2 ">
          <div className="col">
            <a href="/home/patient">Home</a>
          </div>
        </div>
        <div>
          {redirectPatient && <Redirect to="/home/patient" />}
          <p>{MessageError}</p>
        </div>
      </div>
    </div>
  );
};

export default AddReception;
