var mongoose = require("mongoose");
var Transaction = require("../models/transaction");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budgetTransactions", {
  useNewUrlParser: true
});

const transactionSeed = [
    {
        name: "Internet",
        value: 50,
        date:new Date(Date.now())
    },
    {
        name: "Phone",
        value: 100,
        date:new Date(Date.now())
    },
    {
        name: "Food",
        value: 200,
        date:new Date(Date.now())
    },
]

Transaction.deleteMany({})
  .then(() => Transaction.collection.insertMany(transactionSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
