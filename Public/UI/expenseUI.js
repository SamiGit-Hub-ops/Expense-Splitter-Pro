import { DOMHelpers } from "./DOMHelpers.js";
import { showSuccessToast, showErrorToast } from "../Utils/toastUtil.js";
export class ExpenseUI {
    constructor(userService, expenseService, onSave) {
        this.userService = userService;
        this.expenseService = expenseService;
        this.onSave = onSave;
        this.initializeElements();
        this.bindEvents();
        this.initializeSelectBox();
    }
    initializeElements() {
        this.elements = {
            addUserForm : DOMHelpers.getElementById("addUserForm"),
            userInput : DOMHelpers.getElementById("userInput"),
            addExpenseForm : DOMHelpers.getElementById("addExpenseForm"),
            expenseUserInput : DOMHelpers.getElementById("expenseUserInput"),
            expenseAmountInput : DOMHelpers.getElementById("expenseAmountInput"),
            expenseReasonInput : DOMHelpers.getElementById("expenseReasonInput"),
            paymentList : DOMHelpers.getElementById("payment-list"),
            simplifyBtn: DOMHelpers.getElementById("simplifyBtn"),
            resultArea: DOMHelpers.getElementById("resultArea"),
        }
    }
    bindEvents() {
        this.elements.addUserForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = this.elements.userInput.value.trim();
            try {
                this.userService.addUser(name);
                this.addUserToSelect(name);
                this.elements.addUserForm.reset();
                showSuccessToast(`User ${name} added`);
                await this.onSave();
            } catch (err) { showErrorToast(err.message); }
        });
        this.elements.addExpenseForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const paidBy = this.elements.expenseUserInput.value;
            const amount = this.elements.expenseAmountInput.valueAsNumber;
            const desc = this.elements.expenseReasonInput.value;
            try {
                const exp = this.expenseService.addExpense(paidBy, amount, desc);
                this.renderExpense(exp);
                this.elements.expenseAmountInput.value = "";
                this.elements.expenseReasonInput.value = "";
                showSuccessToast("Expense added");
                await this.onSave();
            } catch (err) { showErrorToast(err.message); }
        });
        this.elements.simplifyBtn.addEventListener("click", () => {
            const res = this.expenseService.simplifyExpenses();
            this.displayResults(res);
        });
    }
    initializeSelectBox() {
        DOMHelpers.clearElement(this.elements.expenseUserInput);
        this.elements.expenseUserInput.add(DOMHelpers.createOption("Select User", ""));
    }
    addUserToSelect(name) { this.elements.expenseUserInput.add(DOMHelpers.createOption(name, name)); }
    renderExpense(exp) {
        const txt = `${exp.paidBy} paid ₹${exp.amount} (${exp.description})`;
        this.elements.paymentList.appendChild(DOMHelpers.createListItem(txt, "expense-item"));
    }
    refreshUI() {
        this.initializeSelectBox();
        this.userService.getUserNames().forEach(n => this.addUserToSelect(n));
        DOMHelpers.clearElement(this.elements.paymentList);
        this.expenseService.expenses.forEach(e => this.renderExpense(e));
    }
    displayResults(res) {
        DOMHelpers.clearElement(this.elements.resultArea);
        if(res.length === 0) {
            this.elements.resultArea.appendChild(DOMHelpers.createListItem("Settled!", "no-results"));
            return;
        }
        DOMHelpers.appendFragment(this.elements.resultArea, res, (r) => DOMHelpers.createListItem(r, "settlement-item"));
    }
}