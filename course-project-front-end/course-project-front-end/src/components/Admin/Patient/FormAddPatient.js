import React from "react";
import { Redirect } from "react-router";
import AddPatientService from "../../../Services/Admin/Patient/AddPatient";
import Spinner from "../../Spinner";
import Socket from "../../../Socket/Socket-client";
const AddPatient = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [homeaddress, setHomeAddress] = React.useState("");
  const [id_users, setIdUsers] = React.useState("");
  const [passport, setPassport] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirectAdmin, setRedirectAdmin] = React.useState(false);

  async function submitPatient(event) {
    event.preventDefault();
    setMessageError("");
    setLoading(true);
    let response = await AddPatientService(homeaddress, passport, id_users);
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
        Socket.socketSendAdminPatientList("Update");
        setRedirectAdmin(true);
      }
    }
  }

  function ValidField() {
    return homeaddress.length > 0 && id_users.length > 0 && passport.length > 0;
  }
  const styles = {
    maxWidth: "700px",
    border: "none",
  };
  return (
    <div className="d-flex   justify-content-center align-items-center ">
      <div className="   p-4  w-100" style={styles}>
        <form onSubmit={submitPatient}>
          <h1 className="d-flex   justify-content-center align-items-center ">
            Post patient
          </h1>
          <div className="form-group mb-2">
            <label>Home address</label>
            <input
              value={homeaddress}
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setHomeAddress(e.target.value)}
              name="homeaddress"
              type="text"
              placeholder="Enter home address..."
            />
          </div>
          <div className="form-group mb-2">
            <label>Id users</label>
            <input
              value={id_users}
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setIdUsers(e.target.value)}
              name="id_users"
              type="text"
              placeholder="Enter id users..."
            />
          </div>
          <div className="form-group mb-2">
            <label>Passport</label>
            <input
              value={passport}
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setPassport(e.target.value)}
              name="passport"
              type="text"
              placeholder="Enter passport..."
            />
          </div>

          <div className="d-flex justify-content-center form-outline mt-3">
            <div className="flex-fill bd-highlight">
              <button
                type="submit"
                disabled={!ValidField()}
                className="btn btn-success w-100 "
              >
                post
              </button>
            </div>
          </div>
          {loading && <Spinner />}
        </form>
        <div className="row mt-2 ">
          <div className="col">
            <a href="/home/admin">Home</a>
          </div>
        </div>
        <div>
          {redirectAdmin && <Redirect to="/home/admin" />}
          <p>{MessageError}</p>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
