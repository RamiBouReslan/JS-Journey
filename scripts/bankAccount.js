class BankAccount {
  constructor(ownerName, initialBalance) {
    this.name = ownerName;
    this.balance = initialBalance;
    this.history = [
      `Account was created for ${ownerName} with the following amount \$${initialBalance}.`,
    ];
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      this.history.push(`Deposited \$${amount}.`);
    } else {
      this.history.push(`Deposite attempt of \$${amount} failed. `);
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      this.history.push(`Withdrawed \$${amount}.`);
    } else {
      this.history.push(`Withdraw attempt of \$${amount} failed.`);
    }
  }

  transfer(anotherAccount, amount) {
    if (anotherAccount === undefined || anotherAccount === null) {
      this.history.push(
        `Failed transfer: ${anotherAccount.name} has no account available.`
      );
      return;
    }

    const hasBalance = typeof anotherAccount.balance === "number";
    const hasOwnerName = typeof anotherAccount.name === "string";
    const hasHistory = Array.isArray(anotherAccount.history);

    if (!hasBalance || !hasOwnerName || !hasHistory) {
      this.history.push(
        `Failed transfer: ${anotherAccount.name} account is not valid.`
      );
      return;
    }

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

  getSummary() {
    return `${this.name}'s balance is \$${this.balance}`;
  }

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
console.log("============")
acc1.printHistory();

console.log("============")
acc2.printHistory();