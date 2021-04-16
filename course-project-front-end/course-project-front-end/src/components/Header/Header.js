import React, { useContext, useEffect, useState } from "react";
import LogOut from "../Auth/LogOut";
import Context from "../../context";

function Header(props) {
  const { user } = useContext(Context);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  useEffect(() => {
    if (user !== undefined)
      setWelcomeMessage(`hello, ${user["user"]["first_name"]}`);
    else if (user === undefined) setWelcomeMessage("hello");
  }, [user]);
  return (
    <div className="d-flex justify-content-between  flex-row">
      <div className="p-2">{welcomeMessage}</div>
      <div className=" p-2 ">
        <LogOut />
      </div>
    </div>
  );
}
export default Header;
