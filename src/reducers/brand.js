import * as types from "../types/brand";
let initialState = {
  brands: [],
  selectedBrand: {},
  brand:{}
};
const brand = (state = initialState, action) => {
  switch (action.type) {
    case types.BRAND_SAVE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        brand: action.payload,
        selectedBrand: action.payload
      };
    case types.BRAND_SAVE_REQUEST:
      return {
        ...state,
        brand: action.payload
      };

    case types.BRAND_CREATE_SUCCESS:

      let tempBrands = [...state.brands, action.payload];
      return {
        ...state,
        brands: tempBrands
      };
    case types.SAVE_API_BRAND:
      return {
        ...state,
        brands: action.payload
      };
    case types.SET_SELECTED_BRAND:
      return {
        ...state,
        selectedBrand: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default brand;
