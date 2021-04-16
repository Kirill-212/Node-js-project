import AuthorizationService from "../../Services/Auth/AuthorizationService";
import Spinner from "../Spinner";
import Context from "../../context";
import React, { useContext } from "react";
import { Redirect } from "react-router";
const Authorization = () => {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const { setUser } = useContext(Context);
  const [redirectAdmin, setRedirectAdmin] = React.useState(false);
  const [redirectPatient, setRedirectPatient] = React.useState(false);
  const [redirectDoctor, setRedirectDoctor] = React.useState(false);
  function ClearField(e) {
    setMessageError("");
  }

  async function submitUser(event) {
    event.preventDefault();
    setMessageError("");
    setLoading(true);
    let response = await AuthorizationService(email, password);

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
        let user = {
          token: "Bearer " + response.data.token,
          user: response.data.user[0],
        };
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        if (response.data.user[0]["id_role"] === 1) {
          setRedirectPatient(true);
        } else if (response.data.user[0]["id_role"] === 2) {
          setRedirectAdmin(true);
        } else {
          setRedirectDoctor(true);
        }
      }
    }
  }

  function ValidField() {
    return email.length > 0 && password.length > 0;
  }
  const styles = {
    maxWidth: "700px",
    border: "none",
  };
  return (
    <div className="d-flex   justify-content-center align-items-center ">
      <div className="   p-4  w-100" style={styles}>
        <form onSubmit={submitUser}>
          <h1 className="d-flex   justify-content-center align-items-center ">
            Authorization
          </h1>

          <div className="form-group mb-2">
            <label>Email</label>
            <input
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
              placeholder="Enter your email..."
            />
          </div>
          <div className="form-group mb-2">
            <label>Password</label>
            <input
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Enter your password..."
            />
          </div>
          <div className="d-flex justify-content-center form-outline mb-3 ">
            <div className="flex-fill  mr-2 ">
              <button
                type="submit"
                disabled={!ValidField()}
                className="btn btn-success w-100 "
              >
                Submit
              </button>
            </div>
            <div className="flex-fill">
              <button
                type="reset"
                className="btn btn-warning w-100 "
                onClick={ClearField}
              >
                Cancel
              </button>
            </div>
          </div>
          {loading && <Spinner />}
        </form>
        <div className="row ">
          <div className="col">
            <a href="/">Registration</a>
          </div>
        </div>
        <div>
          <p>{MessageError}</p>
        </div>
      </div>
      {redirectAdmin && <Redirect to="/home/admin" />}
      {redirectPatient && <Redirect to="/home/patient" />}
      {redirectDoctor && <Redirect to="/home/doctor" />}
    </div>
  );
};

export default Authorization;
