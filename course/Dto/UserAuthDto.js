class UsersAuthDto {
  constructor(json) {
    this.id = json["id"];
    this.id_role = json["id_role"];
    this.first_name = json["first_name"];
  }
}
module.exports = UsersAuthDto;
