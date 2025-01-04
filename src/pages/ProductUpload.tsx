import { useState, useEffect } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const ProductUpload = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    supply: '',
    image: '',
  });

  const handleProductUpload = async () => {
    const response = await axios.post(
      'https://sustain-server-hndkbfg6c8gvgwcc.southindia-01.azurewebsites.net/market/product',
      {
        name: productData.name,
        description: productData.description,
        supply: productData.supply,
        price: productData.price,
        walletAddress: localStorage.getItem('walletAddress'),
        image: productData.image,
      }
    );
    console.log(response.data);
  };

  // Check if MetaMask is installed
  useEffect(() => {
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
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

    console.log('Uploading product...', productData);

    await handleProductUpload();

    alert('Product uploaded successfully!');
    setProductData({
      name: '',
      description: '',
      price: '',
      supply: '',
      image: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Upload Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-green-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-green-700 font-medium mb-2">
              Product Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-green-700 font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="supply" className="block text-green-700 font-medium mb-2">
              Supply
            </label>
            <input
              type="number"
              id="supply"
              name="supply"
              value={productData.supply}
              onChange={handleInputChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-green-700 font-medium mb-2">
              Product Image URL (High-Quality Recommended)
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={productData.image}
              onChange={handleInputChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="https://example.com/high-quality-image.jpg"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="wallet" className="block text-green-700 font-medium mb-2">
              Wallet Address
            </label>
            <input
              type="text"
              id="wallet"
              value={walletAddress}
              readOnly
              className="w-full border border-green-300 rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpload;
