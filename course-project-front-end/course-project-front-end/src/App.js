import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Registration from "./components/Auth/Registration";
import Header from "./components/Header/Header";
import Authorization from "./components/Auth/Authorization";
import HomeAdmin from "./components/Admin/Home";
import HomePatient from "./components/Patient/Home";
import HomeDoctor from "./components/Doctor/Home";
import FormUpdateUser from "./components/Admin/User/FormUpdateUser";
import FormAddDoctor from "./components/Admin/Doctor/FormAddDoctor";
import FormUpdateDoctor from "./components/Admin/Doctor/FormUpdateDoctor";
import FormAddPatient from "./components/Admin/Patient/FormAddPatient";
import FormUpdatePatient from "./components/Admin/Patient/FormUpdatePatient";
import FormAddReception from "./components/Patient/Reception/FormAddReception";
import FormUpdateReception from "./components/Doctor/Reception/FormUpdateReception";
import Context from "./context";

function App() {
  const [user, setUser] = React.useState(undefined);
  if (user === undefined) {
    if (JSON.parse(localStorage.getItem("user")))
      setUser(JSON.parse(localStorage.getItem("user")));
  }
  return (
    <Context.Provider value={{ user, setUser }}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Registration} />
          <Route path="/login" component={Authorization} />
          <Route exact path="/home/admin" component={HomeAdmin} />
          <Route exact path="/home/patient" component={HomePatient} />
          <Route exact path="/home/doctor" component={HomeDoctor} />
          <Route path="/home/admin/put/user/:id" component={FormUpdateUser} />
          <Route path="/home/admin/add/doctor" component={FormAddDoctor} />
          <Route
            path="/home/admin/put/doctor/:id"
            component={FormUpdateDoctor}
          />
          <Route path="/home/admin/add/patient" component={FormAddPatient} />
          <Route
            path="/home/admin/put/patient/:id"
            component={FormUpdatePatient}
          />
          <Route
            path="/home/patient/add/reception"
            component={FormAddReception}
          />
          <Route
            path="/home/doctor/put/reception/:id"
            component={FormUpdateReception}
          />
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
