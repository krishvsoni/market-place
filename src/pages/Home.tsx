
import '../App.css'
import Navbar from '../components/Navbar'
export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-green-800">Welcome to Sustain Scan</h1>
        <p className="text-xl mb-8 text-green-700">Your Marketplace for Recycled Products</p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
          Start Shopping Sustainably
        </button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center text-green-800">Why Choose Sustain Scan?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: "♻️", title: "100% Recycled", description: "All products are made from recycled materials" },
            { icon: "🛍️", title: "Wide Selection", description: "Thousands of sustainable products to choose from" },
            { icon: "🍃", title: "Eco-Friendly", description: "Reduce your carbon footprint with every purchase" },
            { icon: "📈", title: "Support Green Businesses", description: "Help sustainable companies grow" },
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <h2 className="text-3xl font-semibold mb-10 text-center text-green-800">Explore Our Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            "Home & Living", "Fashion", "Electronics", "Outdoor",
            "Beauty & Personal Care", "Toys & Games", "Stationery", "Accessories"
          ].map((category, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-200 rounded-lg mb-4 mx-auto w-48 h-48 flex items-center justify-center">
                <span className="text-4xl">🔄</span>
              </div>
              <h3 className="text-lg font-semibold">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center text-green-800">How Sustain Scan Works</h2>
        <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
          {[
            { step: 1, title: "Browse", description: "Explore our wide range of recycled products" },
            { step: 2, title: "Choose", description: "Select the items that match your sustainable lifestyle" },
            { step: 3, title: "Purchase", description: "Buy with confidence, knowing you're making a difference" },
            { step: 4, title: "Enjoy", description: "Receive your eco-friendly products and feel good about your choice" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 max-w-xs">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="container mx-auto px-4 py-16 bg-green-800 text-white">
        <h2 className="text-3xl font-semibold mb-10 text-center">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "1M+", description: "Products Sold" },
            { number: "500K", description: "Trees Saved" },
            { number: "10K", description: "Tons of Plastic Recycled" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold mb-2">{stat.number}</p>
              <p className="text-xl">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6 text-green-800">Ready to Make a Difference?</h2>
        <p className="text-xl mb-8 text-green-700">Join Sustain Scan today and start your journey towards a more sustainable lifestyle.</p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
          Sign Up Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Sustain Scan</h3>
              <p className="text-sm">Sustain Scan is your go-to marketplace for recycled and eco-friendly products. We're committed to promoting sustainability and reducing waste.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-300">Home</a></li>
                <li><a href="#" className="hover:text-green-300">Products</a></li>
                <li><a href="#" className="hover:text-green-300">About Us</a></li>
                <li><a href="#" className="hover:text-green-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-300">Facebook</a>
                <a href="#" className="hover:text-green-300">Twitter</a>
                <a href="#" className="hover:text-green-300">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2023 Sustain Scan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}

