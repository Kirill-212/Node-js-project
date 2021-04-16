import React, { useEffect } from "react";
import { Redirect } from "react-router";
import PutDoctors from "../../../Services/Admin/Doctor/PutDoctor";
import Spinner from "../../Spinner";
import Socket from "../../../Socket/Socket-client";
const PutDoctor = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [name_hospital, setNameHospital] = React.useState("");
  const [homeaddress, setHomeAddress] = React.useState("");
  const [specialty, setSpecialty] = React.useState("");
  const [passport, setPassport] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirectAdmin, setRedirectAdmin] = React.useState(false);

  async function submitDoctor(event) {
    event.preventDefault();

    setMessageError("");
    setLoading(true);
    let response = await PutDoctors(
      props.match.params.id,
      name_hospital,
      homeaddress,
      specialty,
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
        Socket.socketSendAdminDoctorList("Update");
        setRedirectAdmin(true);
      }
    }
  }

  function ValidField() {
    return (
      name_hospital.length > 0 &&
      homeaddress.length > 0 &&
      specialty.length > 0 &&
      passport.length > 0
    );
  }
  const styles = {
    maxWidth: "700px",
    border: "none",
  };
  useEffect(() => {
    let query = new URLSearchParams(props.location.search);
    setNameHospital(query.get("name_hospital"));
    setHomeAddress(query.get("homeaddress"));
    setSpecialty(query.get("specialty"));
    setPassport(query.get("passport"));
    Socket.socketMessageServerForAdminDoctorListDelete().then((r) => {
      if (props.match.params.id === r) {
        setRedirectAdmin(true);
      }
    });
  }, [redirectAdmin]);
  return (
    <div className="d-flex   justify-content-center align-items-center ">
      <div className="   p-4  w-100" style={styles}>
        <form onSubmit={submitDoctor}>
          <h1 className="d-flex   justify-content-center align-items-center ">
            Put doctor
          </h1>
          <div className="form-group mb-2 ">
            <label>Name hospital</label>
            <input
              value={name_hospital}
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setNameHospital(e.target.value)}
              name="name_hospital"
              type="text"
              placeholder="Enter name hospital..."
            />
          </div>
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
            <label>Specialty</label>
            <input
              value={specialty}
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setSpecialty(e.target.value)}
              name="specialty"
              type="text"
              placeholder="Enter your specialty..."
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
                type="submit"
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

export default PutDoctor;
