export const initialState = {
  basket: [],
  user: null,
  basket1: [],
  username:"",
  adresse:"",
  user1:null,
  four:null,
  count:10
  
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0).toFixed(2);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_COUNT":
      return {
        ...state,
        count: action.count
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
        basket1: [action.item],
      };
      case "SET_FOUR":
      return {
        ...state,
       
        four: action.four,
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
        basket1: [],
      };
    case "REMOVE":
      return {
        ...state,

        basket1: [],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        user1: action.user1,
        username:action.username,
        adresse:action.address
      };
      
      
    default:
      return state;
  }
};

export default reducer;
