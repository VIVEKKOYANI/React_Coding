import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "./redux/cartAction";
import "./App.css";

function App() {
  const state = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  return (
    <>
      <div className="cart">
        <h2>Number of items in Cart: {state.numOfItems}</h2>
        <button
          onClick={() => {
            dispatch(addItem());
          }}
        >
          Add Item to Cart
        </button>
        <button
          disabled={state.numOfItems > 0 ? false : true}
          onClick={() => {
            dispatch(deleteItem());
          }}
        >
          Remove Item to Cart
        </button>
      </div>
    </>
  );
}

export default App;