import io from "socket.io-client";

class Socket {
  static socketClient = null;
  //admin user list socket
  async socketMessageServerForAdminUserList() {
    let that = this;

    if (that.socketClient == null) {
      that.socketClient = io("https://localhost:3001");
    } else if (!that.socketClient.connected) {
      that.socketClient.connect();
    }
    return new Promise(async function (resolve, reject) {
      await that.socketClient.on("AdminUserList", function (data) {
        resolve(true);
      });
    });
  }
  async socketMessageServerForAdminUserListDelete() {
    let that = this;

    if (that.socketClient == null) {
      that.socketClient = io("https://localhost:3001");
    } else if (!that.socketClient.connected) {
      that.socketClient.connect();
    }
    return new Promise(async function (resolve, reject) {
      await that.socketClient.on("AdminUserListDelete", function (data) {
        resolve(data);
      });
    });
  }
  socketSendAdminUserList(mes) {
    let that = this;
    if (that.socketClient == null) {
      that.socketClient = io("https://localhost:3001");
    } else if (!that.socketClient.connected) {
      that.socketClient.connect();
    }

    that.socketClient.emit("AdminUserList", mes, function (data) {
      if (data.ok) {
        console.log("Event was processed successfully");
      } else {
      }
    });
  }

  //admin patient list socket
  async socketMessageServerForAdminPatientList() {
    let that = this;

    if (that.socketClient == null) {
      that.socketClient = io("https://localhost:3001");
    } else if (!that.socketClient.connected) {
      that.socketClient.connect();
    }
    return new Promise(async function (resolve, reject) {
      await that.socketClient.on("AdminPatientList", function (data) {
        resolve(true);
      });
    });
  }

  async socketMessageServerForAdminPatientListDelete() {
    let that = this;

    if (that.socketClient == null) {
      that.socketClient = io("https://localhost:3001");
    } else if (!that.socketClient.connected) {
      that.socketClient.connect();
    }
    return new Promise(async function (resolve, reject) {
      await that.socketClient.on("AdminPatientListDelete", function (data) {
        resolve(data);
      });
    });
  }

  socketSendAdminPatientList(mes) {
    let that = this;
    if (that.socketClient == null) {
      that.socketClient = io("https://localhost:3001");
    } else if (!that.socketClient.connected) {
      that.socketClient.connect();
    }

    that.socketClient.emit("AdminPatientList", mes, function (data) {
      if (data.ok) {
        console.log("Event was processed successfully");
      } else {
      }
    });
  }
  //admin doctor list socket
  async socketMessageServerForAdminDoctorList() {
    let that = this;

    if (that.socketClient == null) {
      that.socketClient = io("https://localhost:3001");
    } else if (!that.socketClient.connected) {
      that.socketClient.connect();
    }
    return new Promise(async function (resolve, reject) {
      await that.socketClient.on("AdminDoctorList", function (data) {
        resolve(true);
      });
    });
  }

  async socketMessageServerForAdminDoctorListDelete() {
    let that = this;

    if (that.socketClient == null) {
      that.socketClient = io("https://localhost:3001");
    } else if (!that.socketClient.connected) {
      that.socketClient.connect();
    }
    return new Promise(async function (resolve, reject) {
      await that.socketClient.on("AdminDoctorListDelete", function (data) {
        resolve(data);
      });
    });
  }

  socketSendAdminDoctorList(mes) {
    let that = this;
    if (that.socketClient == null) {
      that.socketClient = io("https://localhost:3001");
    } else if (!that.socketClient.connected) {
      that.socketClient.connect();
    }

    that.socketClient.emit("AdminDoctorList", mes, function (data) {
      if (data.ok) {
        console.log("Event was processed successfully");
      } else {
      }
    });
  }
  //reception list socket
  async socketMessageServerForReceptionList() {
    let that = this;

    if (that.socketClient == null) {
      that.socketClient = io("https://localhost:3001");
    } else if (!that.socketClient.connected) {
      that.socketClient.connect();
    }
    return new Promise(async function (resolve, reject) {
      await that.socketClient.on("ReceptionList", function (data) {
        resolve(true);
      });
    });
  }

  async socketMessageServerForReceptionDelete() {
    let that = this;

    if (that.socketClient == null) {
      that.socketClient = io("https://localhost:3001");
    } else if (!that.socketClient.connected) {
      that.socketClient.connect();
    }
    return new Promise(async function (resolve, reject) {
      await that.socketClient.on("ReceptionListDelete", function (data) {
        resolve(data);
      });
    });
  }

  socketSendReceptionList(mes) {
    let that = this;
    if (that.socketClient == null) {
      that.socketClient = io("https://localhost:3001");
    } else if (!that.socketClient.connected) {
      that.socketClient.connect();
    }

    that.socketClient.emit("ReceptionList", mes, function (data) {
      if (data.ok) {
        console.log("Event was processed successfully");
      } else {
      }
    });
  }
}

export default new Socket();
