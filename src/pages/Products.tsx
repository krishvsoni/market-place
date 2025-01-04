import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { ethers } from 'ethers';

interface Seller {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[]; // Base64 encoded image array
  description: string;
  seller: Seller;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    console.log(account)
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
      console.log(isMetaMaskInstalled);
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });
    }
  }, []);

  const handleProducts = async () => {
    try {
      const response = await axios.get('https://sustain-server-hndkbfg6c8gvgwcc.southindia-01.azurewebsites.net/market/all-products');
      const data = response.data;

      console.log(data.products[0].name);  // Logs the name of the first product
      console.log(data.products[0].description);  // Logs the description of the first product
      console.log(data.products);

      if (Array.isArray(data.products)) {
        setProducts(data.products); // Set the product list in state
      } else {
        console.error('Unexpected API response:', data);
        setProducts([]); // Fallback to an empty array if the response is not as expected
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // Fallback to an empty array on error
    }
  };

  useEffect(() => {
    handleProducts();
  }, []);

  const handleBuyNow = async () => {

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

  const ProductCard = ({ product }: { product: Product }) => {
    const image = product.images[0]; // Assuming the first image is the main image

    return (
      <div className="border-2 border-green-600 shadow-lg rounded-lg p-4 bg-white">
        <img
          src={image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-bold text-green-800">{product.name}</h3>
        <p className="text-green-700 mt-2">${product.price.toFixed(2)}</p>
        <p className="text-green-600 mt-2">{product.description}</p>
        <button
          onClick={handleBuyNow}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4 inline-block"
        >
          Buy Now
        </button>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <main className="p-8 bg-gradient-to-b from-green-50 to-green-100 w-full min-h-screen">
          <h1 className="text-3xl font-bold text-green-800 mb-8">Marketplace Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <p className="text-green-700 text-lg">No products available at the moment.</p>
            ) : (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductsPage;
