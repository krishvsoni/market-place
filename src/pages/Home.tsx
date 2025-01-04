import { useNavigate } from 'react-router-dom';
import '../App.css';
import Navbar from '../components/Navbar';

export default function Home() {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    navigate('/onboard');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 text-green-800">
            Welcome to Sustain Scan
          </h1>
          <p className="text-xl mb-8 text-green-700">
            Your Marketplace for Recycled Products
          </p>
          <button
            onClick={handleStartShopping}
            className="bg-green-600 border-4 border-green-800 shadow-lg hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 transform hover:scale-105"
          >
            Start Shopping Sustainably
          </button>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold mb-10 text-center text-green-800">
            Why Choose Sustain Scan?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '♻️', title: '100% Recycled', description: 'All products are made from recycled materials' },
              { icon: '🛍️', title: 'Wide Selection', description: 'Thousands of sustainable products to choose from' },
              { icon: '🍃', title: 'Eco-Friendly', description: 'Reduce your carbon footprint with every purchase' },
              { icon: '📈', title: 'Support Green Businesses', description: 'Help sustainable companies grow' },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border-4 border-green-700 shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold mb-10 text-center text-green-800">
            How Sustain Scan Works
          </h2>
          <div className="flex flex-col md:flex-row justify-around items-center gap-5 space-y-8 md:space-y-0">
            {[
              { step: 1, title: 'Browse', description: 'Explore our wide range of recycled products' },
              { step: 2, title: 'Choose', description: 'Select the items that match your sustainable lifestyle' },
              { step: 3, title: 'Purchase', description: 'Buy with confidence, knowing you\'re making a difference' },
              { step: 4, title: 'Enjoy', description: 'Receive your eco-friendly products and feel good about your choice' },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center bg-green-50 border-4 border-green-700 rounded-lg p-6 shadow-lg transform hover:scale-105 transition duration-300"
              >
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 max-w-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6 text-green-800">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-green-700">
            Join Sustain Scan today and start your journey towards a more sustainable lifestyle.
          </p>
          <button
            onClick={handleStartShopping}
            className="bg-green-600 border-4 border-green-800 shadow-lg hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 transform hover:scale-105"
          >
            Sign Up Now
          </button>
        </section>
      </div>
    </>
  );
}
