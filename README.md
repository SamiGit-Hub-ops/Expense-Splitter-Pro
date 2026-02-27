# 💸 Expense-Splitter-Pro

## 🚀 Overview
A high-performance **Vanilla JavaScript** application that automates complex debt settlements. This project demonstrates advanced client-side logic, modular ES6 coding, and algorithmic efficiency without the need for a backend dependency.

## 🧠 Core Algorithm: Greedy Settlement
The heart of this app is a **Greedy Algorithm** implemented in the frontend to simplify debts:
* **Optimization**: Minimizes the total number of transactions required for group settlement.
* **DSA Principles**: Utilizes Max-Heaps/Sorting logic to pair the largest creditors with the largest debtors, ensuring $O(N \log N)$ efficiency.

## 🛠️ Technical Highlights
* **Modular Frontend Architecture**: Organized into `Models`, `Services`, `UI`, and `Utils` folders to mimic professional enterprise structures.
* **State Management**: Handles real-time balance updates and transaction history locally.
* **Responsive UI**: A modern interface built to handle dynamic user inputs and real-time data rendering.

## 🏗️ Project Structure
```text
/Public
  ├── Model/      # Data structures for participants
  ├── Services/   # The Settlement Engine (Algorithm logic)
  ├── UI/         # DOM manipulation and event listeners
  ├── Utils/      # Helper functions
  ├── index.html  # Entry point
  ├── Main.js     # App initialization
  └── Main.css    # Modern styling