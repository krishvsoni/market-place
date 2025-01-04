import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border-2 border-green-600 shadow-lg rounded-lg p-4 bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold text-green-800">{product.name}</h3>
      <p className="text-green-700 mt-2">${product.price.toFixed(2)}</p>
      <Link
        to={`/product/${product.id}`}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4 inline-block"
      >
        View Details
      </Link>
    </div>
  );
};


export default ProductCard;