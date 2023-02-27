// for convering bytes to hash
const { keccak256 } = require("ethereum-cryptography/keccak");

// for converting message to bytes
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

// for signing hash
const { sign , recoverPublicKey , utils : { randomPrivateKey}, getPublicKey } = require("ethereum-cryptography/secp256k1");


async function Verify(message, privateKey, senderAddress){

    console.log("sender address : " + senderAddress);
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);

    const [signedHash, recoveryBit ] = await sign(hash, privateKey, { recovered : true});


    let publicKey = recoverPublicKey(hash, privateKey, recoveryBit);
    console.log("public key : " + publicKey);

    const address = GetAddress(publicKey);
    console.log("address : " + address);


    return address.toLowerCase() === senderAddress.toLowerCase();



}


function GeneratePrivateKey(){
    const privateKey = toHex(randomPrivateKey());
    return privateKey;

}




const key = (GeneratePrivateKey());
console.log("Private Key : " + (key));

const publicKey = getPublicKey(key);
console.log("Public Key : "+ toHex(publicKey));


module.exports =  Verify;
