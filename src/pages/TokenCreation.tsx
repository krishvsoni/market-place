import { useState, useEffect } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const TokenCreationForm = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    initialSupply: '',
  });

  // Check if MetaMask is installed
  useEffect(() => {
    if (window.ethereum) {
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
    setTokenData({ ...tokenData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isMetaMaskInstalled) {
      alert('MetaMask is not installed. Please install MetaMask to proceed.');
      return;
    }

    if (!walletAddress) {
      alert('Please connect your MetaMask wallet.');
      return;
    }

    if (!tokenData.name || !tokenData.symbol || !tokenData.initialSupply) {
      alert('All fields are required.');
      return;
    }

    // Simulate token creation logic
    console.log('Creating token...', tokenData);

    alert(`Token "${tokenData.name}" created successfully!`);
    // Reset form
    setTokenData({
      name: '',
      symbol: '',
      initialSupply: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Create Token</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-blue-700 font-medium mb-2">
              Token Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={tokenData.name}
              onChange={handleInputChange}
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="symbol" className="block text-blue-700 font-medium mb-2">
              Token Symbol
            </label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={tokenData.symbol}
              onChange={handleInputChange}
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="initialSupply" className="block text-blue-700 font-medium mb-2">
              Initial Supply
            </label>
            <input
              type="number"
              id="initialSupply"
              name="initialSupply"
              value={tokenData.initialSupply}
              onChange={handleInputChange}
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="wallet" className="block text-blue-700 font-medium mb-2">
              Wallet Address
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
            Create Token
          </button>
        </form>
      </div>
    </div>
  );
};

export default TokenCreationForm;
