import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [pKey, setPKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        pKey={pKey}
        setPKey={setPKey}
      />
      <Transfer setBalance={setBalance} address={address} pKey={pKey} setPKey={setPKey} />
    </div>
  );
}

export default App;
