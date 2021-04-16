var express = require("express");
var https = require("https");
var fs = require("fs");
const path = require("path");
const UserRoutes = require("./Routes/User")();
const DoctorRoutes = require("./Routes/Doctor")();
const PatientRoutes = require("./Routes/Patient")();
const ReceptionRoutes = require("./Routes/Reception")();
const passport = require("passport");
const cors = require("cors");

var app = express();
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "client-key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "client-cert.pem")),
  },
  app
);
//const server = require("https").Server(sslServer);
require("../course/Socket/ServerSocket").ConnectAndListenSocket(sslServer);

app.use(cors());
app.options("*", cors());
const jsonParser = express.json();

app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use("/user/api/", jsonParser, UserRoutes);
app.use("/doctor/api/", jsonParser, DoctorRoutes);
app.use("/patient/api/", jsonParser, PatientRoutes);
app.use("/reception/api/", jsonParser, ReceptionRoutes);
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

const port = process.env.PORT || 3001;
// server.listen(port, () =>
//   console.log("Secure server started on the port = " + port)
// );
sslServer.listen(port, () =>
  console.log("Secure server started on the port = " + port)
);
