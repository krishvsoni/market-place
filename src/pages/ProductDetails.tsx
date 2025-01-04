import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const ProductDetails = () => {
  const { productId } = useParams();
  const [account, setAccount] = useState<string | null>(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Recycled Bag',
      price: 25.99,
      description:
        'A stylish bag made from 100% recycled materials. Perfect for daily use while promoting sustainability.',
      images: ['/images/bag.jpg'],
      category: 'Accessories',
    },
    // Other products...
  ];

  // Fetch the product by ID
  const product = products.find((p) => p.id === parseInt(productId ?? '0'));

  // Check if MetaMask is installed
  useEffect(() => {
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });
    }
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100">
        <p className="text-2xl font-bold text-green-800">Product not found!</p>
      </div>
    );
  }

  // Handle the Buy Now click
  const handleBuyNow = async () => {
    if (!isMetaMaskInstalled) {
      alert('MetaMask is not installed. Please install MetaMask to proceed.');
      return;
    }

    if (!account) {
      alert('Please connect your MetaMask wallet.');
      return;
    }

    try {
      // Connect to MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Token contract ABI (ERC-20)
      const tokenAbi = [
        'function transfer(address recipient, uint256 amount) public returns (bool)',
      ];

      // The smart contract address (replace with your token contract address)
      const tokenAddress = '0x6BaDeC2351268Db17DBe8B6a794d1c9254dcc3bC'; // Token contract address

      // Create contract instance
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

      // Convert the price to the token's smallest unit (e.g., for ERC-20 tokens with 18 decimals)
      const amountInTokens = ethers.parseUnits("10", 18);

      // Send the transaction to transfer tokens
      const tx = await tokenContract.transfer('0xB8Cf1d00F959F0F15e21c961814727dEd0aAd139', amountInTokens); // Replace with the recipient's address

      console.log('Transaction Sent:', tx);
      alert('Transaction Sent! Check your MetaMask for confirmation.');

      // Optionally wait for transaction confirmation
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);
    } catch (error) {
      console.error('Error sending transaction:', error);
      alert('An error occurred while sending the transaction.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Product Images */}
            <div>
              <img
                src={product.images[0]}
                alt={product.name}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            {/* Product Details */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold text-green-800 mb-4">{product.name}</h1>
              <p className="text-xl text-green-700 mb-4">${product.price.toFixed(2)}</p>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <div className="mb-4">
                <span className="font-semibold text-green-800">Category: </span>
                <span className="text-green-600">{product.category}</span>
              </div>
              <button
                onClick={handleBuyNow}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
