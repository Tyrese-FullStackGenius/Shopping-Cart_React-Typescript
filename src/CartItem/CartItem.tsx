import Button from "@material-ui/core/Button";
import { CartItemType } from "../interfaces/CartItem";
import { Wrapper } from "./CartItem.styles";

type CartItemProps = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  addToCart,
  removeFromCart,
}): JSX.Element => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className='information'>
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className='buttons'>
        <Button size='small' disableElevation variant='contained' onClick={() => removeFromCart(item.id)}> - </Button>
        <p>{item.amount}</p>
        <Button size='small' disableElevation variant='contained' onClick={() => addToCart(item)}> + </Button>
      </div>
    </div>

    <img src={item.image} alt={item.title}/>
  </Wrapper>
);

export default CartItem;
