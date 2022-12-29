const bitcoin = require('bitcoinjs-lib');
import * as ecc from "tiny-secp256k1";
import ECPairFactory from "ecpair";

const ECPair = ECPairFactory(ecc);



const testnet = bitcoin.networks.testnet;

const txb = new bitcoin.TransactionBuilder(testnet);

async function createAndSignTransaction(
  privateKey: string,
  recipients: { address: string; amount: number }[],
  utxos: { txId: string; vout: number; value: number }[]
): Promise<string> {
  const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'));


  // Add inputs to the transaction
  utxos.forEach(utxo => {
    txb.addInput(utxo.txId, utxo.vout);
  });

  // Add outputs to the transaction
  recipients.forEach(recipient => {
    txb.addOutput(recipient.address, recipient.amount);
  });

  // Sign the inputs
  utxos.forEach((_, index) => {
    txb.sign(index, keyPair);
  });

  // Build and serialize the transaction
  const tx = txb.build();
  return tx.toHex();
}

