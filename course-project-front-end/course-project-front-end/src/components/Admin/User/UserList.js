import React, { useEffect, useContext } from "react";
import GetUsers from "../../../Services/Admin/User/UserService";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import DeleteUsers from "../../../Services/Admin/User/DeleteUser";
import PutRoleUserOrAdmin from "../../../Services/Admin/User/PutRoleAdminOrUser";
import Spinner from "../../Spinner";
import Socket from "../../../Socket/Socket-client";
import Context from "../../../context";

const UserList = () => {
  const [loading, setLoading] = React.useState(false);
  const [MessageError, setMessageError] = React.useState("");
  const [listUsers, setListUsers] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);
  const [socketFlag, setSocketFlag] = React.useState(false);
  const { user } = useContext(Context);
  async function GetUsersList() {
    setSocketFlag(false);
    setLoading(true);
    let response = await GetUsers();
    setLoading(false);
    if (response === undefined) {
      setMessageError("Check connect server");
    } else {
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
          setListUsers(response.data["users"]);
          setViewList(true);
        }
      }
    }
  }
  async function UpdateRole(e) {
    e.preventDefault();
    let response = await PutRoleUserOrAdmin(e.currentTarget.value);
    if (response === undefined) {
      setMessageError("Check connect server");
    } else {
      if (response === undefined) {
        setMessageError("Check connect server");
      } else {
        if (response.status !== 200) {
          if (response.data.ERROR !== undefined) {
            setMessageError(response.data.ERROR);
          } else if (response.data.ERROR.details !== undefined) {
            setMessageError(response.data.ERROR.details[0]["message"]);
          } else {
            setMessageError(response.data);
          }
        } else {
          Socket.socketSendAdminUserList("Update");
          GetUsersList();
        }
      }
    }
  }
  async function DeleteUser(e) {
    e.preventDefault();
    let id_delete = e.currentTarget.value;
    let response = await DeleteUsers(e.currentTarget.value);
    if (response === undefined) {
      setMessageError("Check connect server");
    } else {
      if (response === undefined) {
        setMessageError("Check connect server");
      } else {
        if (response.status !== 200) {
          if (response.data.ERROR !== undefined) {
            setMessageError(response.data.ERROR);
          } else if (response.data.ERROR.details !== undefined) {
            setMessageError(response.data.ERROR.details[0]["message"]);
          } else {
            setMessageError(response.data);
          }
        } else {
          Socket.socketSendAdminUserList("Update");
          Socket.socketSendAdminUserList(id_delete);

          GetUsersList();
        }
      }
    }
  }

  function GenerateDataForTable() {
    listUsers.map((n) => {
      n.options = (
        <>
          <a
            className="text-reset"
            href={`/home/admin/put/user/${n["id_users"]}?first_name=${n["first_name"]}&last_name=${n["last_name"]}&email=${n["email"]}&bday=${n["bday"]}&gender=${n["gender"]}`}
          >
            <i className="fa fa-wrench" aria-hidden="true"></i>
          </a>

          <MDBBtn
            color="purple"
            size="sm"
            value={n["id_users"]}
            onClick={DeleteUser}
          >
            <i className="fa fa-trash" aria-hidden="true "></i>
          </MDBBtn>
          {n["name"] === "ROLE_USER" && user["user"]["id"] === 1051 && (
            <MDBBtn
              color="purple"
              size="sm"
              value={n["id_users"]}
              onClick={UpdateRole}
            >
              <i className="fa fa-user" aria-hidden="true"></i>
            </MDBBtn>
          )}
          {n["name"] === "ROLE_ADMIN" && user["user"]["id"] === 1051 && (
            <MDBBtn
              color="purple"
              size="sm"
              value={n["id_users"]}
              onClick={UpdateRole}
            >
              <i className="fa fa-user-secret" aria-hidden="true"></i>
            </MDBBtn>
          )}
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
          label: "Role",
          field: "name",
          sort: "asc",
          width: 50,
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
          width: 50,
        },
        {
          label: "Options",
          field: "options",
          width: 20,
        },
      ],
      rows: listUsers,
    };
  }

  useEffect(() => {
    GetUsersList();
    Socket.socketMessageServerForAdminUserList().then((r) => {
      setSocketFlag(true);
    });
  }, [socketFlag]);
  return (
    <div>
      <h1 className="d-flex justify-content-center align-items-center ">
        User List
      </h1>
      <p>{MessageError}</p>
      <div className=" p-4">
        {viewList && (
          <MDBDataTableV5
            color="white"
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

export default UserList;
