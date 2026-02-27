export class Expense {
    constructor(paidBy, amount, description = "No description") {
        if (!paidBy) throw new Error("Participant name is required");
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            throw new Error('Amount must be a positive number');
        }
        this.id = crypto.randomUUID();
        this.paidBy = paidBy.trim();
        this.amount = Number(parsedAmount.toFixed(2));
        this.description = description.trim() || "No description";
        this.timeStamp = new Date().toISOString();
    }
}