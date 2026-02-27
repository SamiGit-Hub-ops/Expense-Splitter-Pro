import { Expense } from "../Model/Expense.js";
export class ExpenseService {
    constructor(userService) {
        this.expenses = [];
        this.userService = userService;
    }
    addExpense(paidBy, amount, description) {
        if (this.userService.getUserCount() < 2) throw new Error("Need 2 users to split.");
        const expense = new Expense(paidBy, amount, description);
        this.expenses.push(expense);
        return expense;
    }
    simplifyExpenses() {
        const userCount = this.userService.getUserCount();
        const userNames = this.userService.getUserNames();
        if (userCount < 2 || this.expenses.length === 0) return [];
        const net = {};
        userNames.forEach(name => net[name] = 0);
        this.expenses.forEach(expense => {
            const share = expense.amount / userCount;
            userNames.forEach(name => {
                if (name === expense.paidBy) net[name] += (expense.amount - share);
                else net[name] -= share;
            });
        });
        return this.calculateSettlements(net);
    }
    calculateSettlements(net) {
        const results = [];
        const names = Object.keys(net).filter(name => Math.abs(net[name]) > 0.01);
        names.sort((a, b) => net[a] - net[b]);
        let i = 0, j = names.length - 1;
        while (i < j) {
            const debtor = names[i], creditor = names[j];
            const settlement = Math.min(-net[debtor], net[creditor]);
            if (settlement > 0.01) {
                net[debtor] += settlement; net[creditor] -= settlement;
                results.push(`${debtor} owes ${creditor} ₹${settlement.toFixed(2)}`);
            }
            if (Math.abs(net[debtor]) < 0.01) i++;
            if (Math.abs(net[creditor]) < 0.01) j--;
        }
        return results;
    }
    loadExpenses(data) { this.expenses = data || []; }
}