import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    if (storedAddress) {
      setWalletAddress(storedAddress);
    }
  }, []);
  

  const connectWallet = async () => {
    // @ts-ignore
    if (window.ethereum) {
      try {
        // @ts-ignore
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        const address = accounts[0];
        setWalletAddress(address);
        localStorage.setItem("walletAddress", address);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect.");
    }
  };

  return (
    <nav className="bg-green-800 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Sustain Scan</div>
        <div className="flex items-center space-x-4">
          <button className="flex flex-col justify-center items-center bg-white text-green-500 py-2 rounded-xl px-4 font-semibold" onClick={() => navigate('/productupload')}>
            Upload Product
          </button>
          <button className="flex flex-col justify-center items-center bg-white text-green-500 py-2 rounded-xl px-4 font-semibold" onClick={() => navigate('/products')}>
            See all Projects
          </button>
          <button
            onClick={connectWallet}
            className="bg-white text-green-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200"
          >
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
          </button>
          {!walletAddress && (
            <span className="text-sm text-gray-300">
              Use the MetaMask browser extension to connect your wallet.
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
