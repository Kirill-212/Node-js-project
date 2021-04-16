import React, { useState } from "react";
import UserList from "./User/UserList";
import PatientList from "./Patient/PatientList";
import DoctorList from "../Admin/Doctor/DoctorList";

const HomeAdmin = () => {
  const [checkUserList, setCheckUserList] = useState(true);
  const [checkPatientList, setCheckPatientList] = useState(false);
  const [checkDoctorList, setCheckDoctorList] = useState(false);

  function UserPage() {
    setCheckUserList(true);
    setCheckPatientList(false);
    setCheckDoctorList(false);
  }
  function PatientPage() {
    setCheckUserList(false);
    setCheckPatientList(true);
    setCheckDoctorList(false);
  }
  function DoctorPage() {
    setCheckUserList(false);
    setCheckPatientList(false);
    setCheckDoctorList(true);
  }
  return (
    <div className="d-flex justify-content-between flex-column ">
      <div>
        <button className="btn btn-success m-3" onClick={UserPage}>
          User page
        </button>
        <button className="btn btn-success m-3" onClick={PatientPage}>
          Patient page
        </button>
        <button className="btn btn-success m-3" onClick={DoctorPage}>
          Doctor page
        </button>
        {checkDoctorList && (
          <a href="/home/admin/add/doctor" className="text-reset">
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </a>
        )}
        {checkPatientList && (
          <a href="/home/admin/add/patient" className="text-reset">
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </a>
        )}
      </div>
      <div>
        {checkUserList && <UserList />}
        {checkPatientList && <PatientList />}
        {checkDoctorList && <DoctorList />}
      </div>
    </div>
  );
};

export default HomeAdmin;
