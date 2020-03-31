import * as types from "../types/brand";

export function registerBrand(brand) {
   console.log('action call which will be called by component', brand)
  return {
    type: types.BRAND_CREATE_REQUEST,
    payload: brand
  };
}

export const saveApiBrand = (brands) =>{
   return{
     type:types.SAVE_API_BRAND,
     payload:brands
   }
}

export function registerBrandSuccess(payload) {

  return {
    type: types.BRAND_CREATE_SUCCESS,
    payload
  };
}

export function updateBrand(payload) {
  return {
    type: types.UPDATE_BRAND_SUCCESS,
    payload
  };
}
export function updateBrandSuccess(payload) {
  return {
    type: types.UPDATE_BRAND_SUCCESS,
    payload
  };
}


export function saveBrand(brand) {
  return {
    type: types.BRAND_SAVE_SUCCESS,
    payload: brand
  };
}

export function saveBrandRequest(brand) {
  console.log(brand);
  return {
    type: types.BRAND_SAVE_REQUEST,
    payload: brand
  };
}
 export function setSelectedBrand (brand){
   return{
     type: types.SET_SELECTED_BRAND,
     payload:brand
   }
 }

