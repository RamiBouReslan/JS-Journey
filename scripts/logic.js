//Question 1//

console.log("Student Reports");
// O(n*m) ==> being that for each n (being number of students) the function traverses m(being number of scores)
function generateReport(students) {
  let report = [];
  // O(n) ==> n being the number of students entered
  for (let i = 0; i < students.length; i++) {
    // O(m) ==> m being the number of scores entered for each student
    let total = students[i].scores.reduce(function (sum, score) {
      return sum + score;
    }, 0);

    let average = total / students[i].scores.length;

    // O(1) ==> since it does not rely on client input
    let grade;

    if (average >= 90) {
      grade = "A";
    } else if (average >= 80) {
      grade = "B";
    } else if (average >= 70) {
      grade = "C";
    } else if (average >= 60) {
      grade = "D";
    } else {
      grade = "F";
    }

    report.push({
      name: students[i].name,
      average: average,
      grade: grade,
    });
  }

  return report;
}

const students = [
  { name: "Alice", scores: [90, 85, 92] },
  { name: "Bob", scores: [70, 68, 72] },
  { name: "Charlie", scores: [100, 100, 100] },
];

console.log(generateReport(students));

console.log("<=============================>");
//Question 2//

console.log("Bank Account System");
/* O(1) + O(1) + O(1) + O(1) + O(1) + O(1) + O(1) + O(n) = O(n),
O(n) ==> being the number of lig histories 
*/
class BankAccount {
  // O(1) — Constructor only assigns initial values (name, balance, and history with 1 entry)
  constructor(ownerName, initialBalance) {
    this.name = ownerName;
    this.balance = initialBalance;
    this.history = [
      `Account was created for ${ownerName} with the following amount \$${initialBalance}.`,
    ];
  }
  // O(1) — Deposit adds to balance and pushes 1 history message
  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      this.history.push(`Deposited \$${amount}.`);
    } else {
      this.history.push(`Deposite attempt of \$${amount} failed. `);
    }
  }
  // O(1) — Withdraw subtracts from balance and logs the action
  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      this.history.push(`Withdrawed \$${amount}.`);
    } else {
      this.history.push(`Withdraw attempt of \$${amount} failed.`);
    }
  }

  transfer(anotherAccount, amount) {
    // O(1) — Checking if the account is null or undefined
    if (anotherAccount === undefined || anotherAccount === null) {
      this.history.push(
        `Failed transfer: ${anotherAccount.name} has no account available.`
      );
      return;
    }
    // O(1) — Type validation checks (all are simple comparisons)
    const hasBalance = typeof anotherAccount.balance === "number";
    const hasOwnerName = typeof anotherAccount.name === "string";
    const hasHistory = Array.isArray(anotherAccount.history);
    // O(1) — Just logs and returns if validation fails
    if (!hasBalance || !hasOwnerName || !hasHistory) {
      this.history.push(
        `Failed transfer: ${anotherAccount.name} account is not valid.`
      );
      return;
    }
    // O(1) — Transfers money and logs to both accounts
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      anotherAccount.balance += amount;
      this.history.push(`Transferred \$${amount} to ${anotherAccount.name}`);
      anotherAccount.history.push(
        `Received \$${amount} from ${this.name}'s account.`
      );
    } else {
      this.history.push(
        `Failed transfer of \$${amount} to ${anotherAccount.name}'s account.`
      );
    }
  }
  // O(1) — Only returns a string based on 2 variables
  getSummary() {
    return `${this.name}'s balance is \$${this.balance}`;
  }
  // O(n) ==> n being the number of transactions in the history array
  printHistory() {
    console.log(`${this.name}'s Transaction History:`);
    this.history.forEach(function (entry) {
      console.log(entry);
    });
  }
}

const acc1 = new BankAccount("John", 500);
const acc2 = new BankAccount("Sara", 300);

acc1.transfer(acc2, 200);
acc1.deposit(400);
acc2.withdraw(200);
acc1.withdraw(150);

console.log(acc1.getSummary()); // John's balance is $300
console.log(acc2.getSummary()); // Sara's balance is $500
console.log("============");
acc1.printHistory();

console.log("============");
acc2.printHistory();

console.log("<=============================>");

// Question 3 //

console.log("Adding functionality to Website.");

const input = document.getElementById("taskInput");
const addButton = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", function () {
  const taskText = input.value.trim();

  if (taskText !== "") {
    const li = document.createElement("li");
    li.textContent = taskText;

    taskList.appendChild(li);
    input.value = "";

    li.addEventListener("click", function () {
      li.classList.toggle("completed");
    });
  }
});
