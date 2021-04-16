const UserRepository = require("../Repository/UserRepository");
const PatientRepository = require("../Repository/PatientRepository");
const DoctorRepository = require("../Repository/DoctorRepository");
const ReceptionRepository = require("../Repository/ReceptionRepository");
var passwordHash = require("password-hash");
var UsersDto = require("../Dto/UsersDto");
let UsersAuthDto = require("../Dto/UserAuthDto");
module.exports = {
  PostUsers: async (json) => {
    let checkEmail = await UserRepository.GetByEmail(json["email"]);
    if (json["gender"] != "M" && json["gender"] != "W")
      throw new Error("This gender is not valid");
    if (checkEmail.length == 0) {
      json["password"] = passwordHash.generate(json["password"]);
      let user = await UserRepository.PostUsers(json);
      return user;
    } else {
      throw new Error("This email is alredy use");
    }
  },
  AuthenticationUsers: async (json) => {
    let user = await UserRepository.GetByEmailAndPassword(json);
    if (user.length == 0) throw new Error("Check input email");

    if (!passwordHash.verify(json["password"], user[0]["password"]))
      throw new Error("Check your password");
    if (user[0]["status"] == "NOT_ACTIVE")
      throw new Error("Yout accaunt is not active");
    var return_users = user.map(function (params) {
      return new UsersAuthDto(params);
    });
    return return_users;
  },
  DeleteUsers: async (id) => {
    var doctor = await DoctorRepository.FindbyIdUser(id);
    if (doctor.length != 0) {
      await ReceptionRepository.UpdateDoctorReceptionForDelete(doctor[0]["id"]);
    }
    let checkUser = await UserRepository.GetById(id);
    if (checkUser[0]["email"] == "admin")
      throw new Error("This user cannot be deleted");
    let count_users_delete = await UserRepository.DeleteUserById(id);
    if (count_users_delete == 0) throw new Error("Check delete id");
    return count_users_delete;
  },
  GetAllUsers: async () => {
    let users = await UserRepository.GetAllUsers();
    var return_users = users.map(function (params) {
      return new UsersDto(params);
    });
    return return_users;
  },
  PutUsers: async (id, json) => {
    let checkEmail = await UserRepository.GetByEmail(json["email"]);
    if (json["gender"] != "M" && json["gender"] != "W")
      throw new Error("This gender is not valid");
    let checkUser = await UserRepository.GetById(id);
    if (checkUser[0]["email"] == "admin")
      throw new Error("This user cannot be updated");
    if (checkEmail.length == 1 || checkEmail.length == 0) {
      let count_put_user = await UserRepository.PutUsers(id, json);
      if (count_put_user == 0) throw new Error("Check put id");
      return count_put_user;
    } else {
      throw new Error("This email is alredy use");
    }
  },
  UpdateRole: async (json, id) => {
    var checPatient = await PatientRepository.CheckPatient(json["id_users"]);
    var checkDoctor = await DoctorRepository.CheckDoctor(json["id_users"]);
    let checkUser = await UserRepository.GetById(json["id_users"]);
    let CheckPriv = await UserRepository.GetById(id);
    if (CheckPriv[0]["email"] !== "admin")
      throw new Error("You cannot change the role");
    if (checkUser[0]["email"] == "admin")
      throw new Error("This user cannot be updated");
    if (checkDoctor.length == 0 && checPatient.length == 0) {
      let id_role;
      if (checkUser[0]["id_role"] === 1) id_role = 2;
      else id_role = 1;
      let users = await UserRepository.UpdateRole({
        id_users: json["id_users"],
        id_role: id_role,
      });
      if (id_role == 1) {
        UserRepository.UpdateStatusNotActive(json["id_users"]);
      } else {
        UserRepository.UpdateStatus(json["id_users"]);
      }

      return users;
    } else {
      throw new Error("Check put id");
    }
  },
  GetByIdUserPatient: async (id) => {
    return await PatientRepository.FindByIdUser(id);
  },
  GetByIdUserDoctor: async (id) => {
    return await DoctorRepository.FindbyIdUser(id);
  },
};
