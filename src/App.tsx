import { useState } from "react";
import { useQuery } from "react-query";
import { LinearProgress, Drawer, Grid, Badge } from "@material-ui/core";
import { Wrapper, StyledButton } from "./App.styles";
import Item from "./Item/Item";
import { AddShoppingCart } from "@material-ui/icons";
import Cart from "./Cart/Cart";
import { CartItemType } from "./interfaces/CartItem";
import { getProducts } from "./services/StoreService";

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  /**
   * @description Add items to the cart
   *
   * @param {CartItemType} clickedItem Item on which is clicked
   */
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // if the item is already added in the cart
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      // first time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  /**
   * @description Remove items from the cart
   *
   * @param {number} id Item id on which will be removed from cart
   */
  const handleRemoveToCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        // If item id is equal to the id of removed item
        if (item.id === id) {
          // If item amount is equal to 1 return empty []
          if (item.amount === 1) {
            return acc
          };
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };

  /**
   * @description Get total number of items in the cart
   * 
   * @param {CartItemType[]} items All items in the cart
   */
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0);

  /**
   * @desciption Display LinearProgress bar when loading the data
   */
  if (isLoading) return <LinearProgress />;

  /**
   * @description Display error message when there is error in the request
   */
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveToCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
