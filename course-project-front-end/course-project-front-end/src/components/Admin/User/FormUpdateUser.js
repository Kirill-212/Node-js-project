import React, { useEffect } from "react";
import { Redirect } from "react-router";
import PutUsers from "../../../Services/Admin/User/PutUser";
import Spinner from "../../Spinner";
import Socket from "../../../Socket/Socket-client";

const PutUser = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [first_name, setFirst_name] = React.useState("");
  const [last_name, setLast_name] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [bday, setBday] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirectAdmin, setRedirectAdmin] = React.useState(false);

  async function submitUser(event) {
    event.preventDefault();
    setMessageError("");
    setLoading(true);
    let response = await PutUsers(
      props.match.params.id,
      first_name,
      last_name,
      email,
      bday,
      gender
    );
    setLoading(false);
    if (response === undefined) {
      setMessageError("Check connect server");
    } else {
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
          Socket.socketSendAdminUserList("Update");
          setRedirectAdmin(true);
        }
      }
    }
  }

  function ValidField() {
    return (
      first_name.length > 0 &&
      last_name.length > 0 &&
      email.length > 0 &&
      gender.length > 0 &&
      bday.length > 0
    );
  }
  const styles = {
    maxWidth: "700px",
    border: "none",
  };
  useEffect(() => {
    let query = new URLSearchParams(props.location.search);
    setFirst_name(query.get("first_name"));
    setLast_name(query.get("last_name"));
    setEmail(query.get("email"));
    setGender(query.get("gender"));
    setBday(query.get("bday"));
    Socket.socketMessageServerForAdminUserListDelete().then((r) => {
      if (props.match.params.id === r) {
        setRedirectAdmin(true);
      }
    });
  }, [redirectAdmin]);
  return (
    <div className="d-flex   justify-content-center align-items-center ">
      <div className="   p-4  w-100" style={styles}>
        <form onSubmit={submitUser}>
          <h1 className="d-flex   justify-content-center align-items-center ">
            Put user
          </h1>
          <div className="form-group mb-2 ">
            <label>First name</label>
            <input
              value={first_name}
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setFirst_name(e.target.value)}
              name="first_name"
              type="text"
              placeholder="Enter your first name..."
            />
          </div>
          <div className="form-group mb-2">
            <label>Last name</label>
            <input
              value={last_name}
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setLast_name(e.target.value)}
              name="last_name"
              type="text"
              placeholder="Enter your last name..."
            />
          </div>
          <div className="form-group mb-2">
            <label>Email</label>
            <input
              value={email}
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
              placeholder="Enter your email..."
            />
          </div>
          <div className="form-group mb-2 d-flex flex-column align-items-center">
            <p>Please select your gender:</p>
            <input
              className="shadow-lg  bg-white rounded"
              checked={gender === "W"}
              type="radio"
              name="gender"
              value="W"
              onChange={(e) => setGender(e.target.value)}
            />
            <label>Woman</label>
            <input
              className="shadow-lg  bg-white rounded"
              checked={gender === "M"}
              type="radio"
              name="gender"
              value="M"
              onChange={(e) => setGender(e.target.value)}
            />
            <label>Man</label>
          </div>
          <div className="form-group mb-2">
            <p>
              Select you birthday:
              <input
                className="shadow-lg  bg-white rounded"
                value={bday}
                type="date"
                name="bday"
                onChange={(e) => setBday(e.target.value)}
              />
            </p>
          </div>

          <div className="d-flex justify-content-center form-outline mb-3">
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
        <div className="row ">
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

export default PutUser;
