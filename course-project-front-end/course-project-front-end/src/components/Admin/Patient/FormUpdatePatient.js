import React, { useEffect } from "react";
import { Redirect } from "react-router";
import PutPatients from "../../../Services/Admin/Patient/PutPatient";
import Spinner from "../../Spinner";
import Socket from "../../../Socket/Socket-client";
const PutPatient = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [homeaddress, setHomeAddress] = React.useState("");
  const [passport, setPassport] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirectAdmin, setRedirectAdmin] = React.useState(false);

  async function submitPatient(event) {
    event.preventDefault();
    setMessageError("");
    setLoading(true);
    let response = await PutPatients(
      props.match.params.id,
      homeaddress,
      passport
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
        Socket.socketSendAdminPatientList("Update");
        setRedirectAdmin(true);
      }
    }
  }

  function ValidField() {
    return homeaddress.length > 0 && passport.length > 0;
  }
  const styles = {
    maxWidth: "700px",
    border: "none",
  };
  useEffect(() => {
    let query = new URLSearchParams(props.location.search);
    setHomeAddress(query.get("homeaddress"));
    setPassport(query.get("passport"));
    Socket.socketMessageServerForAdminPatientListDelete().then((r) => {
      if (props.match.params.id === r) {
        setRedirectAdmin(true);
      }
    });
  }, [redirectAdmin]);
  return (
    <div className="d-flex   justify-content-center align-items-center ">
      <div className="   p-4  w-100" style={styles}>
        <form onSubmit={submitPatient}>
          <h1 className="d-flex   justify-content-center align-items-center ">
            Put patient
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
            <div className="flex-fill">
              <button
                type="submit shadow-lg  bg-white rounded"
                disabled={!ValidField()}
                className="btn btn-success w-100 "
              >
                Put
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

export default PutPatient;
