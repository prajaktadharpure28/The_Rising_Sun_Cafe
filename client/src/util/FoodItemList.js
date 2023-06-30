const FoodItemCart = JSON.parse(localStorage.getItem("cart")) || [];

const FoodItemListCount = FoodItemCart.length;
//eslint-disable-next-line
export default { FoodItemCart, FoodItemListCount}