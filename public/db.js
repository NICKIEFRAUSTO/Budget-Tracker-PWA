let db;
// create a new db request for a "BudgetDB" database.
const request = window.indexedDB.open("BudgetDB", 1);

request.onupgradeneeded = function (event) {
  // create object store called "BudgetStore" and set autoIncrement to true
    const db = event.target.result;
    const budgetStore = db.createObjectStore("budgetStore", {autoIncrement: true});
    
  }

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    console.log('backend online!');
    checkDatabase();
  }
};

request.onerror = function (event) {
  // log error here
  console.error ("Database Error:"+ event.target.errorCode);
};

function saveRecord(record) {
  // create a transaction on the pending db with readwrite access
  // access your pending object store
  const transaction = db.transaction(["budgetStore"], "readwrite");
  const budgetStore = transaction.objectStore("budgetStore");
  // add record to your store with add method.
  budgetStore.add(record)
}


function checkDatabase() {
  // open a transaction on your pending db
  // access your pending object store
  const transaction = db.transaction(["budgetStore"], "readwrite");
  const budgetStore = transaction.objectStore("budgetStore");
  // get all records from store and set to a variable
  const getAll = budgetStore.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => {

          // if successful, open a transaction on your pending db
          const newTransaction = db.transaction(["budgetStore"], "readwrite");
          const newBudgetStore = newTransaction.objectStore("budgetStore");
          // access your pending object store
          // clear all items in your store
          
          newBudgetStore.clear();
        });

        
  };
}
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);