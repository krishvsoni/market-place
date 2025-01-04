import { useState } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Onboard() {
  const [formType, setFormType] = useState('consumer'); // Default to 'consumer'
  const walletAddress = localStorage.getItem('walletAddress') || 'Not available';
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const navigate = useNavigate();

  const handleConsumer = async (e  :any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://sustain-server-hndkbfg6c8gvgwcc.southindia-01.azurewebsites.net/market/onboard',
        {
          walletAddress,
          email,
          name : fullName,
        }
      );
      navigate('/products')
      alert('Consumer registered successfully!');
      console.log(response.data)
      
    } catch (error) {
      console.error('Error registering consumer:', error);
      alert('Failed to register consumer.');
    }
  };

  const handleBusiness = async (e : any) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://sustain-server-hndkbfg6c8gvgwcc.southindia-01.azurewebsites.net/market/onboard',
        {
          formType,
          walletAddress,
          email,
          businessName,
          businessType,
        }
      );
      alert('Business registered successfully!');

    } catch (error) {
      console.error('Error registering business:', error);
      alert('Failed to register business.');
    }
  };

  const renderForm = () => {
    return formType === 'consumer' ? (
      <form
        onSubmit={handleConsumer}
        className="bg-white border-4 border-green-700 shadow-lg rounded-lg p-6 max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-4">Consumer Registration</h2>
        <div className="mb-4">
          <label className="block text-green-800 font-bold mb-2">Wallet Address</label>
          <input
            type="text"
            className="w-full border-2 border-green-600 text-black rounded-lg p-2"
            value={walletAddress}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-green-800 font-bold mb-2">Full Name</label>
          <input
            type="text"
            className="w-full border-2 border-green-600 rounded-lg p-2"
            placeholder="Enter your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-green-800 font-bold mb-2">Email</label>
          <input
            type="email"
            className="w-full border-2 border-green-600 rounded-lg p-2"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Register as Consumer
        </button>
      </form>
    ) : (
      <form
        onSubmit={handleBusiness}
        className="bg-white border-4 border-green-700 shadow-lg rounded-lg p-6 max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-4">Business Registration</h2>
        <div className="mb-4">
          <label className="block text-green-800 font-bold mb-2">Wallet Address</label>
          <input
            type="text"
            className="w-full border-2 border-green-600 text-black rounded-lg p-2"
            value={walletAddress}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-green-800 font-bold mb-2">Business Name</label>
          <input
            type="text"
            className="w-full border-2 border-green-600 rounded-lg p-2"
            placeholder="Enter your business name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-green-800 font-bold mb-2">Business Type</label>
          <select
            className="w-full border-2 border-green-600 rounded-lg p-2"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="retail">Retail</option>
            <option value="wholesale">Wholesale</option>
            <option value="service">Service</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Register as Business
          </button>
        </div>
      </form>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 text-green-800">Welcome to Sustain Scan</h1>
          <p className="text-xl mb-8 text-green-700">Your Marketplace for Recycled Products</p>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="bg-green-100 p-6 rounded-lg shadow-lg">
            <div className="flex justify-center space-x-6 mb-8">
              <button
                onClick={() => setFormType('consumer')}
                className={`py-3 px-6 rounded-lg text-lg font-bold ${
                  formType === 'consumer'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-green-800 hover:bg-gray-300'
                }`}
              >
                Consumer
              </button>
              <button
                onClick={() => setFormType('business')}
                className={`py-3 px-6 rounded-lg text-lg font-bold ${
                  formType === 'business'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-green-800 hover:bg-gray-300'
                }`}
              >
                Business
              </button>
            </div>
            {renderForm()}
          </div>
        </section>
      </div>
    </>
  );
}
