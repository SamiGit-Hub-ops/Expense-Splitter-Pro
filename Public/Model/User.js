export class User {
    constructor(name) {
        if (!name || typeof name !== "string" || name.trim().length === 0) {
            throw new Error("A valid user name is required");
        }
        this.name = name.trim();
        this.id = crypto.randomUUID();
    }
}