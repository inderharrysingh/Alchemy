import server from "./server";
import {getPublicKey } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";


function Wallet({ address, setAddress, balance, setBalance, pKey , setPKey }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    const publicKey = toHex(getPublicKey(address));
    console.log("key " + publicKey);
    setPKey(publicKey);
   
    if (publicKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${publicKey}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
