import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import Heading from '../components/Heading';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // Calculate the total price
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
    <Heading />
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookID}>
                {item.title}: ${item.price.toFixed(2)}
                <button onClick={() => removeFromCart(item.bookID)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Display the total price */}
      <h3 className='text-danger'>Total: ${totalAmount.toFixed(2)}</h3>
      <button>Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Browsing</button>
    </div>
    </>
  );
}

export default CartPage;
