import { useNavigate, useParams } from 'react-router-dom';
import Heading from '../components/Heading';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { CartItem } from '../types/CartItem';

function BuyPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();

  // Initialize price state with 0 (fallback)
  const [priceState, setPrice] = useState<number>(0);

  // Update price when URL changes or component mounts
  useEffect(() => {
    if (price) {
      setPrice(Number(price)); // Use setPrice to set the price from the URL
    }
  }, [price]); // Only re-run when price changes

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Book Found',
      price: priceState,  // Use the state-set price
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <Heading />
      <h2>Buy {title}</h2>

      <div>
        <p>Price: ${priceState.toFixed(2)}</p>  {/* Display the price from state */}
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default BuyPage;
