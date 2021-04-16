import React, { useEffect } from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import GetReceptions from "../../../Services/Doctor/Reception/GetReseptions";
import DeleteReceptions from "../../../Services/Doctor/Reception/DeleteReceptions";
import Spinner from "../../Spinner";
import Socket from "../../../Socket/Socket-client";
const ReceptionListForDoctor = () => {
  const [MessageError, setMessageError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [listReceptions, setListReceptions] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);
  const [socketFlag, setSocketFlag] = React.useState(false);
  async function GetReceptionList() {
    setSocketFlag(false);
    setLoading(true);
    let response = await GetReceptions();
    setLoading(false);
    if (response === undefined) {
      setMessageError("Check connect server");
    } else {
      if (response.status !== 200) {
        if (response.data.ERROR !== undefined) {
          setMessageError(response.data.ERROR);
          setViewList(false);
        } else {
          setMessageError(response.data);
          setViewList(false);
        }
      } else {
        setListReceptions(response.data["patients"]);
        setViewList(true);
      }
    }
  }
  async function DeleteReception(e) {
    e.preventDefault();
    let id_delete = e.currentTarget.value;
    let response = await DeleteReceptions(e.currentTarget.value);
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
        Socket.socketSendReceptionList(id_delete);
        GetReceptionList();
      }
    }
  }
  function GenerateDataForTable() {
    listReceptions.map((n) => {
      n.options = (
        <>
          <a
            className="text-reset"
            href={`/home/doctor/put/reception/${n["reception_id"]}?diagnosis=${n["diagnosis"]}&comments=${n["comments"]}`}
          >
            <i className="fa fa-wrench" aria-hidden="true"></i>
          </a>
          <MDBBtn
            color="purple"
            size="sm"
            value={n["reception_id"]}
            onClick={DeleteReception}
          >
            <i className="fa fa-trash" aria-hidden="true "></i>
          </MDBBtn>
        </>
      );
    });
  }
  function GenerateTable() {
    GenerateDataForTable();
    return {
      columns: [
        {
          label: "Email patient",
          field: "email",
          sort: "asc",
          width: 50,
        },
        {
          label: "First name patient",
          field: "first_name",
          sort: "asc",
          width: 50,
        },
        {
          label: "Last name patient",
          field: "last_name",
          sort: "asc",
          width: 100,
        },
        {
          label: "Home address",
          field: "homeaddress",
          sort: "asc",
          width: 100,
        },
        {
          label: "Comments",
          field: "comments",
          sort: "asc",
          width: 150,
        },
        {
          label: "Date reception",
          field: "date_reception",
          sort: "asc",
          width: 50,
        },
        {
          label: "Diagnosis",
          field: "diagnosis",
          sort: "asc",
          width: 50,
        },
        {
          label: "Symptoms",
          field: "symptoms",
          sort: "asc",
          width: 50,
        },
        {
          label: "Time",
          field: "time",
          sort: "asc",
          width: 50,
        },
        {
          label: "Options",
          field: "options",
          width: 20,
        },
      ],
      rows: listReceptions,
    };
  }
  useEffect(() => {
    GetReceptionList();
    Socket.socketMessageServerForReceptionList().then((r) => {
      setSocketFlag(true);
    });
  }, [socketFlag]);
  return (
    <div>
      <div>
        <h1 className="d-flex justify-content-center align-items-center ">
          Reception List
        </h1>
      </div>
      <p>{MessageError}</p>
      <div className=" p-4">
        {viewList && (
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={GenerateTable()}
          />
        )}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default ReceptionListForDoctor;
