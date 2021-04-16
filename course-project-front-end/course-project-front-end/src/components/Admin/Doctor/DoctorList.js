import React, { useEffect } from "react";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import GetDoctors from "../../../Services/Admin/Doctor/GetDoctorService";
import DeleteDoctors from "../../../Services/Admin/Doctor/DeleteDoctor";
import Spinner from "../../Spinner";
import Socket from "../../../Socket/Socket-client";
const DoctorList = () => {
  const [loading, setLoading] = React.useState(false);
  const [MessageError, setMessageError] = React.useState("");
  const [listDoctors, setListDoctors] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);
  const [socketFlag, setSocketFlag] = React.useState(false);
  async function GetDoctorList() {
    setSocketFlag(false);
    setLoading(true);
    let response = await GetDoctors();
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
        setListDoctors(response.data["doctors"]);
        setViewList(true);
      }
    }
  }
  async function DeleteDoctor(e) {
    e.preventDefault();
    let id_delete = e.currentTarget.value;
    let response = await DeleteDoctors(e.currentTarget.value);
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
        Socket.socketSendAdminDoctorList(id_delete);
        GetDoctorList();
      }
    }
  }
  function GenerateDataForTable() {
    listDoctors.map((n) => {
      n.options = (
        <>
          <a
            className="text-reset"
            href={`/home/admin/put/doctor/${n["id_doctor"]}?name_hospital=${n["name_hospital"]}&homeaddress=${n["homeaddress"]}&specialty=${n["specialty"]}&passport=${n["passport"]}`}
          >
            <i className="fa fa-wrench" aria-hidden="true"></i>
          </a>
          <MDBBtn
            color="purple"
            size="sm"
            value={n["id_doctor"]}
            onClick={DeleteDoctor}
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
          label: "Id User",
          field: "id_users",
          sort: "asc",
          width: 50,
        },
        {
          label: "Id Doctor",
          field: "id_doctor",
          sort: "asc",
          width: 50,
        },
        {
          label: "First name",
          field: "first_name",
          sort: "asc",
          width: 100,
        },
        {
          label: "Last name",
          field: "last_name",
          sort: "asc",
          width: 100,
        },
        {
          label: "Bday",
          field: "bday",
          sort: "asc",
          width: 100,
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
          width: 150,
        },
        {
          label: "Gender",
          field: "gender",
          sort: "asc",
          width: 50,
        },
        {
          label: "Name hospital",
          field: "name_hospital",
          sort: "asc",
          width: 50,
        },
        {
          label: "Specialty",
          field: "specialty",
          sort: "asc",
          width: 50,
        },
        {
          label: "Home address",
          field: "homeaddress",
          sort: "asc",
          width: 50,
        },
        {
          label: "Passport",
          field: "passport",
          sort: "asc",
          width: 50,
        },
        {
          label: "Options",
          field: "options",
          width: 20,
        },
      ],
      rows: listDoctors,
    };
  }
  useEffect(() => {
    GetDoctorList();
    Socket.socketMessageServerForAdminDoctorList().then((r) => {
      setSocketFlag(true);
    });
  }, [socketFlag]);
  return (
    <div>
      <div>
        <h1 className="d-flex justify-content-center align-items-center ">
          Doctor List
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

export default DoctorList;
