import { Log } from "../lib/log";

console.log("UserServices");

export class UserServices {
  constructor(private User:any) {}

  public async createUser(data:any) {
    return await this.User.create(data);
  }

  public async updateUser(id:any, data:any) {
    return await this.User.findByIdAndUpdate(id, data, { new: true });
  }

  public async getUser(query:any) {
    return await this.User.find(query);
  }

  public async getUserById(id:any) {
    return await this.User.findById(id);
  }
}
