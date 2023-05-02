

function useCart() {
  const getCart = () => {
    return (
      JSON.parse(localStorage.getItem("cart")) || {
        restaurantId: null,
        items: {},
      }
    );
  };

  function addToCart(item, restaurantId) {
    const cart = getCart() || { restaurantId: null, items: {} };
    if (cart.restaurantId && cart.restaurantId !== restaurantId) {
      // toast.error("You have items from another restaurant in the Cart")
      return false; // Restaurant ids do not match, cannot add item
    }
    const itemId = item._id;
    if (cart.items[itemId]) {
      cart.items[itemId].count += 1;
    } else {
      cart.items[itemId] = { ...item, count: 1 };
    }
    cart.restaurantId = restaurantId;
    localStorage.setItem("cart", JSON.stringify(cart));
    return true;
  }

  function increaseCount(item) {
    const cart = getCart();
    const itemId = item._id;
    cart.items[itemId].count += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function decreaseCount(item) {
    const cart = getCart();
    const itemId = item._id;
    if (cart.items[itemId].count === 1) {
      delete cart.items[itemId];
    } else {
      cart.items[itemId].count -= 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const removeFromCart = (item) => {
    const cart = getCart();
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
  };

  const clearCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    cart.items = {};
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  function calculateTotal(cart) {
    let total = 0;
    // eslint-disable-next-line array-callback-return
    Object.keys(cart).map((key) => {
      total += cart[key].count * cart[key].sellingPrice;
    });
    return total;
  }

  return {
    getCart,
    addToCart,
    increaseCount,
    decreaseCount,
    removeFromCart,
    clearCart,
    calculateTotal,
    clearCartItems
  };
}

export default useCart;
