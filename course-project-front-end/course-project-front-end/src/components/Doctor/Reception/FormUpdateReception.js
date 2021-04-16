import React, { useEffect } from "react";
import { Redirect } from "react-router";
import PutReceptions from "../../../Services/Doctor/Reception/PutReceptions";
import Spinner from "../../Spinner";
import Socket from "../../../Socket/Socket-client";
const PutReception = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [comments, setComments] = React.useState("");
  const [diagnosis, setDiagnosis] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirectDcotor, setRedirectDoctor] = React.useState(false);

  async function submitReception(event) {
    event.preventDefault();

    setMessageError("");
    setLoading(true);
    let response = await PutReceptions(
      props.match.params.id,
      comments,
      diagnosis
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
        setRedirectDoctor(true);
      }
    }
  }

  function ValidField() {
    return comments.length > 0 && diagnosis.length > 0;
  }
  const styles = {
    maxWidth: "700px",
    border: "none",
  };
  useEffect(() => {
    let query = new URLSearchParams(props.location.search);
    setDiagnosis(query.get("diagnosis"));
    setComments(query.get("comments"));
    Socket.socketMessageServerForReceptionDelete().then((r) => {
      if (props.match.params.id === r) {
        setRedirectDoctor(true);
      }
    });
  }, [redirectDcotor]);
  return (
    <div className="d-flex   justify-content-center align-items-center ">
      <div className="   p-4  w-100" style={styles}>
        <form onSubmit={submitReception}>
          <h1 className="d-flex   justify-content-center align-items-center ">
            Put reception
          </h1>
          <div className="form-group mb-2">
            <label>Comments</label>
            <textarea
              maxLength="100"
              rows="4"
              value={comments}
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setComments(e.target.value)}
              name="comments"
              placeholder="Enter comments..."
            />
          </div>
          <div className="form-group mb-2">
            <label>Diagnosis</label>
            <input
              value={diagnosis}
              className="w-100 shadow-lg  bg-white rounded"
              onChange={(e) => setDiagnosis(e.target.value)}
              name="diagnosis"
              type="text"
              placeholder="Enter diagnosis..."
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
            <a href="/home/doctor">Home</a>
          </div>
        </div>
        <div>
          {redirectDcotor && <Redirect to="/home/doctor" />}
          <p>{MessageError}</p>
        </div>
      </div>
    </div>
  );
};

export default PutReception;
