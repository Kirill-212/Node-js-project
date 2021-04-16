module.exports = {
  ConnectAndListenSocket: (server) => {
    const io = require("socket.io")(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
      console.log(`socket connected`, socket.id);
      socket.on("message", (msg) => {
        console.log("message: " + msg);
        socket.broadcast.emit("eventClient", "hello client lox");
      });

      socket.on("AdminDoctorList", function (msg, callback) {
        console.log(msg);
        if (msg === null) {
          callback({ ok: false });
        } else {
          if (msg === "Update") {
            console.log("UPDATE");
            socket.broadcast.emit("AdminDoctorList", "AdminDoctorList");
          } else {
            console.log("DELETE");
            socket.broadcast.emit("AdminDoctorListDelete", msg);
          }
          callback({ ok: true });
        }
      });
      socket.on("AdminPatientList", function (msg, callback) {
        console.log(msg);
        if (msg === null) {
          callback({ ok: false });
        } else {
          if (msg === "Update") {
            console.log("UPDATE");
            socket.broadcast.emit("AdminPatientList", "AdminPatientList");
          } else {
            console.log("DELETE");
            socket.broadcast.emit("AdminPatientListDelete", msg);
          }
          callback({ ok: true });
        }
      });
      socket.on("AdminUserList", async function (msg, callback) {
        console.log(msg);
        if (msg === null) {
          callback({ ok: false });
        } else {
          if (msg === "Update") {
            console.log("UPDATE");
            socket.broadcast.emit("AdminUserList", "AdminUserList");
          } else {
            console.log("DELETE");
            socket.broadcast.emit("AdminUserListDelete", msg);
          }
          callback({ ok: true });
        }
      });

      socket.on("ReceptionList", async function (msg, callback) {
        console.log(msg);
        if (msg === null) {
          callback({ ok: false });
        } else {
          if (msg === "Update") {
            console.log("UPDATE");
            socket.broadcast.emit("ReceptionList", "ReceptionList");
          } else {
            console.log("DELETE");
            socket.broadcast.emit("ReceptionListDelete", msg);
          }
          callback({ ok: true });
        }
      });
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  },
};
