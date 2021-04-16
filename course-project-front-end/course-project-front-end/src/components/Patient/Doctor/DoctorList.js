import React, { useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import GetDoctors from "../../../Services/Patient/Doctor/GetDoctors";
import Spinner from "../../Spinner";
import Socket from "../../../Socket/Socket-client";
const DoctorListForPatient = () => {
  const [MessageError, setMessageError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
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

  function GenerateTable() {
    return {
      columns: [
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
      ],
      rows: listDoctors,
    };
  }
  useEffect(() => {
    GetDoctorList();
    Socket.socketMessageServerForAdminDoctorList().then((r) => {
      setSocketFlag(true);
    });
    Socket.socketMessageServerForAdminUserList().then((r) => {
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

export default DoctorListForPatient;
