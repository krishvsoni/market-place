import { useState, useEffect } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const TokenAirdropPage = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [airdropData, setAirdropData] = useState({
    contractAddress: '',
    recipients: '',
    amount: '',
  });
  const handleAirdrop = async (e : any) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://47f0-2401-4900-555b-bafd-d4d0-4715-66b7-eb2d.ngrok-free.app/airdrop' , {address :localStorage.getItem('walletAddress')});
      console.log(response.data);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      console.log(isMetaMaskInstalled);
      setIsMetaMaskInstalled(true);
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAirdropData({ ...airdropData, [name]: value });
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Airdrop Tokens</h1>
        <form onSubmit={handleAirdrop}>
          <div className="mb-4">
            <label htmlFor="contractAddress" className="block text-blue-700 font-medium mb-2">
              Token Contract Address
            </label>
            <input
              type="text"
              id="contractAddress"
              name="contractAddress"
              value="0x6BaDeC2351268Db17DBe8B6a794d1c9254dcc3bC"
              onChange={handleInputChange}
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="wallet" className="block text-blue-700 font-medium mb-2">
              Your Wallet Address
            </label>
            <input
              type="text"
              id="wallet"
              value={walletAddress}
              readOnly
              className="w-full border border-blue-300 rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full"
          >
            Airdrop Tokens
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default TokenAirdropPage;
