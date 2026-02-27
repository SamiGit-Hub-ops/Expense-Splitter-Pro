import { User } from "../Model/User.js";
export class UserService {
    constructor() { this.users = new Map(); }
    addUser(name) {
        const user = new User(name);
        if (this.users.has(user.name)) throw new Error("User already exists");
        this.users.set(user.name, user);
        return user;
    }
    getUserNames() { return Array.from(this.users.keys()); }
    getUserCount() { return this.users.size; }
    loadUsers(userDataArray) {
        this.users.clear();
        if(userDataArray) userDataArray.forEach(u => this.users.set(u.name, u));
    }
}