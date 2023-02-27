const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;



app.use(cors());
app.use(express.json());

const balances = {
  "04832678683ec1c6cd6f38dfcf2f3f3d7a5794b4b0d340920017c4a44fb3511bfba1e95d39bb4a660bf8af3124c7bffee1eae7d1867ff31bf6e509626ff237b461": 100,
  "04f4d1d14668262dea23a9e6bbf58e96900bd9686909a81d05810c897fbedcde8c65e64c8eeafce19a942567b532f583261f92f4d47e2d24f0fa3f4589571cb7e5": 50,
  "04bea99a85d4f43e85e8cde819cac8ad29436ba3ce1ec64bac128527480baba4ca4b545a677a45a549cae372db64bae99017011e5369ce7bf01810411727ad113b": 75,
  "0494534def3d921ae614d3978bbcd25737c2f6432bce39a45385bd8ff452d08614d3192d6424411b76759ea421e28478c87ed7a9e2e7031e7b96fe657f75952f6d": 1000,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
  // 0xBcd921aEb7875C4f8F509F116056800B7911226d
  
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);



  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

