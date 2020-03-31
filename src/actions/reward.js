import * as types from '../types/reward';
export function registerReward(reward) {
    return {
      type: types.REWARD_CREATE_REQUEST,
      payload: reward
    };
  }
  export function registerRewardSuccess(data) {
    return {
      type: types.REWARD_CREATE_SUCCESS,
      payload:data
    };
  }
  
export function registerRewardFailed(payload) {
    return {
      type: types.REWARD_CREATE_FAILURE,
      payload
    };
}

export function updateReward(data){
  return{
    type: types.UPDATE_REWARD,
    payload:data

  }
}
export function updateRewardSuccess(data){
  return{
    type: types.UPDATE_REWARD_SUCCESS,
    payload:data

  }
}
export function updateRewardFailed(data){
  return{
    type: types.UPDATE_REWARD_FAILED,
    payload:data

  }
}

export function deleteReward(data){
  return{
    type: types.DELETE_REWARD,
    payload:data
  }
}
export function deleteRewardSuccess(data){
  return{
    type: types.DELETE_REWARD_SUCCESS,
    payload:data

  }
}
export function deleteRewardFailed(){
  return{
    type: types.DELETE_REWARD_FAILED,

  }
}