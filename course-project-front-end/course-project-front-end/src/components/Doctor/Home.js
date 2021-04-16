import React, { useState } from "react";
import PatientList from "../Doctor/Patient/PatientList";
import ReceptionList from "../Doctor/Reception/ReceptionList";
const HomeDoctor = () => {
  const [chekPatientList, setCheckPatientList] = useState(true);
  const [checkReceptionList, setCheckReceptionList] = useState(false);

  function PatientPage() {
    setCheckPatientList(true);
    setCheckReceptionList(false);
  }
  function ReceptionPage() {
    setCheckPatientList(false);
    setCheckReceptionList(true);
  }

  return (
    <div className="d-flex justify-content-between flex-column ">
      <div>
        <button className="btn btn-success m-3" onClick={PatientPage}>
          Patient page
        </button>
        <button className="btn btn-success m-3" onClick={ReceptionPage}>
          Reception page
        </button>
      </div>
      <div>
        {chekPatientList && <PatientList />}
        {checkReceptionList && <ReceptionList />}
      </div>
    </div>
  );
};

export default HomeDoctor;
