import { ExpenseUI } from "./UI/expenseUI.js";
import { UserService } from "./Services/userService.js";
import { ExpenseService } from "./Services/expenseService.js";

class ExpenseApp {
    constructor() {
        this.userService = new UserService();
        this.expenseService = new ExpenseService(this.userService);
        this.ui = null;
    }
    async init() {
        this.ui = new ExpenseUI(this.userService, this.expenseService, () => this.saveState());
        await this.loadState();
    }
    async loadState() {
        try {
            const res = await fetch('/api/data');
            const data = await res.json();
            this.userService.loadUsers(data.users || []);
            this.expenseService.loadExpenses(data.expenses || []);
            this.ui.refreshUI();
        } catch (e) { console.error("Load failed", e); }
    }
    async saveState() {
        const payload = {
            users: Array.from(this.userService.users.values()),
            expenses: this.expenseService.expenses
        };
        try {
            await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } catch (e) { console.error("Save failed", e); }
    }
}
document.addEventListener("DOMContentLoaded", () => { (new ExpenseApp()).init(); });