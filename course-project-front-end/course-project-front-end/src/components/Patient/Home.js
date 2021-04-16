import React, { useState } from "react";

import DoctorList from "../Patient/Doctor/DoctorList";
import ReceptionList from "../Patient/Reception/ReceptionList";
const HomePatient = () => {
  const [checDoctorList, setCheckDoctorList] = useState(true);
  const [checkReceptionList, setCheckReceptionList] = useState(false);

  function DoctorPage() {
    setCheckDoctorList(true);
    setCheckReceptionList(false);
  }
  function ReceptionPage() {
    setCheckDoctorList(false);
    setCheckReceptionList(true);
  }

  return (
    <div className="d-flex justify-content-between flex-column ">
      <div>
        <button className="btn btn-success m-3" onClick={DoctorPage}>
          Doctor page
        </button>
        <button className="btn btn-success m-3" onClick={ReceptionPage}>
          Reception page
        </button>
        {checkReceptionList && (
          <a href="/home/patient/add/reception" className="text-reset">
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </a>
        )}
      </div>
      <div>
        {checDoctorList && <DoctorList />}
        {checkReceptionList && <ReceptionList />}
      </div>
    </div>
  );
};

export default HomePatient;
