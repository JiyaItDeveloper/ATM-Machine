#!/usr/bin/env node
import inquirer from "inquirer";
let Mybalance = 50000;
let Mypin = 1992;
(async () => {
    let Myanswer = await inquirer.prompt([{
            name: "pin",
            type: "number",
            message: "Kindly enter your pin"
        }]);
    if (Myanswer.pin === Mypin) {
        console.log("Your entered pin is correct");
    }
    else {
        console.log("Your entered pin is incorrect");
        return;
    }
    let Myoperation = await inquirer.prompt([{
            name: "operation",
            type: "list",
            choices: ["Withdrawal", "FastCash", "CheckBalance"],
            message: "What do you want to do?"
        }]);
    if (Myoperation.operation === "Withdrawal") {
        let user = await inquirer.prompt([{
                name: "amount",
                type: "number",
                message: "Enter amount you want to withdraw: ",
            }]);
        if (Mybalance < user.amount) {
            console.log("Insufficient Balance!!");
        }
        else {
            Mybalance -= user.amount;
            console.log(`Your remaining balance is ${Mybalance}`);
        }
    }
    if (Myoperation.operation === "CheckBalance") {
        console.log(`Your Balance is : ${Mybalance}`);
    }
    if (Myoperation.operation === "FastCash") {
        let Myaccount = await inquirer.prompt([{
                type: "list",
                name: "accountType",
                choices: ["current", "saving"],
                message: "Please select your Account Type:"
            }]);
        if (Myaccount.accountType === "saving") {
            console.log("FastCash is not available for saving accounts.");
            return;
        }
        else {
            let fastCashAmount = await inquirer.prompt([{
                    type: "list",
                    name: "amount",
                    choices: [500, 1000, 3000, 5000],
                    message: "Select your FastCash amount:"
                }]);
            Mybalance -= fastCashAmount.amount;
            if (Mybalance >= 0) {
                console.log("Your remaining balance is " + Mybalance);
            }
            else {
                console.log("Insufficient Balance");
                Mybalance += fastCashAmount.amount; // Revert the balance back to the previous value
            }
        }
    }
    // Other operations like Withdrawal and CheckBalance can be handled similarly
    console.log("Thank you for using ATM.");
})();
