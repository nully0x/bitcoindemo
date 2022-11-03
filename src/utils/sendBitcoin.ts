const axios = require('axios');
const bitcore = require('bitcore-lib');

//send fucntion with fee calculation
const sendBitcoin = async (sourceAddress : string, recieverAddress :string, amount :number, privateKey: string):Promise<any> => {
    try {
        const sochain_network = "BTCTEST";
        sourceAddress = sourceAddress.toString();
        privateKey = privateKey.toString();
        recieverAddress = recieverAddress.toString();
        const satoshiToSend: number = amount * 100000000;
        let fee = 0;
        let inputCount = 0;
        let outputCount = 2;
    
        const response = await axios.get(
          `https://sochain.com/api/v2/get_tx_unspent/${sochain_network}/${sourceAddress}`
        );
    
        const recommendedFee = await axios.get(
          "https://bitcoinfees.earn.com/api/v1/fees/recommended"
        );
    
        const transaction = new bitcore.Transaction();
        let totalAmountAvailable = 0;
    
        let inputs = [];
        let utxos = response.data.data.txs;
    
        for (const element of utxos) {
          let utxo = {};
          utxo.satoshis = Math.floor(Number(element.value) * 100000000);
          utxo.script = element.script_hex;
          utxo.address = response.data.data.address;
          utxo.txId = element.txid;
          utxo.outputIndex = element.output_no;
          totalAmountAvailable += utxo.satoshis;
          inputCount += 1;
          inputs.push(utxo);
        }
    
        /**
         * In a bitcoin transaction, the inputs contribute 180 bytes each to the transaction,
         * while the output contributes 34 bytes each to the transaction. Then there is an extra 10 bytes you add or subtract
         * from the transaction as well.
         * */
    
        const transactionSize =
          inputCount * 180 + outputCount * 34 + 10 - inputCount;
    
        fee = transactionSize * recommendedFee.data.hourFee/3; // satoshi per byte
        if (totalAmountAvailable - satoshiToSend - fee < 0) {
          throw new Error("Balance is too low for this transaction");
        }
        //Set transaction input
        transaction.from(inputs);
    
        // set the recieving address and the amount to send
        transaction.to(recieverAddress, satoshiToSend);
    
        // Set change address - Address to receive the left over funds after transfer
        transaction.change(sourceAddress);
    
        //manually set transaction fees: 20 satoshis per byte
        transaction.fee(Math.round(fee));
    
        // Sign transaction with your private key
        transaction.sign(privateKey);
    
        // serialize Transactions
        const serializedTransaction = transaction.serialize();
        
        // Send transaction
        const result = await axios({
          method: "POST",
          url: `https://sochain.com/api/v2/send_tx/${sochain_network}`,
          data: {
            tx_hex: serializedTransaction,
          },
        });
        return result.data.data;
      } catch (error) {
        throw new Error("Error sending bitcoin: " + error.message);
        
      }
    };

    console.log(sendBitcoin("ms3pw6XTD4FLq3K6GQ9cQmHofEPnCQd8Qr", "mrxGiK2UKTp25ecmvRCJobG9TkqAVzT28j", 0.001, "1edff3c742110b1dba9859c9ec9a5fdb202bd63157cec703a179e1a699bb96c5" ))