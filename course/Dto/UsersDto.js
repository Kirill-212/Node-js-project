class UsersDto {
  constructor(json) {
    this.id_role = json["id"];
    this.name = json["name"];
    this.email = json["ROLES_USERS.email"];
    this.first_name = json["ROLES_USERS.first_name"];
    this.last_name = json["ROLES_USERS.last_name"];
    this.status = json["ROLES_USERS.status"];
    this.bday = json["ROLES_USERS.bday"];
    this.gender = json["ROLES_USERS.gender"];
    this.id_users = json["ROLES_USERS.id"];
  }
}
module.exports = UsersDto;
