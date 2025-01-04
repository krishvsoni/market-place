import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <div className="container mx-auto flex flex-row md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold mb-4 md:mb-0" onClick={()=>{navigate('/'}>Sustain Scan</div>

        {/* Hamburger Menu (Mobile View) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navbar Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row items-center w-full md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-4`}
        >
          <button
            className="bg-white text-green-500 py-2 px-4 rounded-xl font-semibold w-full md:w-auto"
            onClick={() => navigate("/productupload")}
          >
            Upload Product
          </button>
          <button
            className="bg-white text-green-500 py-2 px-4 rounded-xl font-semibold w-full md:w-auto"
            onClick={() => navigate("/products")}
          >
            See all Projects
          </button>
          <button
            onClick={connectWallet}
            className="bg-white text-green-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 w-full md:w-auto"
          >
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
          </button>
          {!walletAddress && (
            <span className="text-sm text-gray-300 md:w-auto">
              Use the MetaMask browser extension to connect your wallet.
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
