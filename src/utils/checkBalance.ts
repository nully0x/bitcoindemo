const axiosBalance = require("axios");
const bitcoreBalance = require("bitcore-lib");

//check balance function
const checkBalance = async (address)=> {
  try {
    const sochain_network = "BTCTEST";
    address = address.toString();
    const response = await axiosBalance.get(
      `https://sochain.com/api/v2/get_address_balance/${sochain_network}/${address}`
    );
    console.log(response.data.data.confirmed_balance);
  } catch (error) {
    throw new Error("Error while checking balance");
  }
};

const unconfirmedBalance = async (address)=> {
    try {
        const sochain_network = "BTCTEST";
        address = address.toString();
        const response = await axiosBalance.get(
            `https://sochain.com/api/v2/get_address_balance/${sochain_network}/${address}`
        );
        console.log(response.data.data.unconfirmed_balance);
    } catch (error) {
        throw new Error("Error while checking balance");
    }
};


console.log(checkBalance("ms3pw6XTD4FLq3K6GQ9cQmHofEPnCQd8Qr"));
console.log(unconfirmedBalance("ms3pw6XTD4FLq3K6GQ9cQmHofEPnCQd8Qr"));
