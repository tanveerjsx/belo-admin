import * as types from '../types/reward';
const initialState = {
  rewards:[],
}
const reward= (state = initialState, action)=>{
  switch (action.type) {
    case types.REWARD_CREATE_SUCCESS:
      console.log(action);
      let tempRewards=[...state.rewards,action.payload]
      return {
        ...state,
        rewards:tempRewards,
        created:true
      };
      
    case types.UPDATE_REWARD:
        return {
          ...state,
          reward: action.payload
        };
  
      case types.UPDATE_REWARD_SUCCESS:
        return {
          ...state,
          reward: action.payload
        };
  
      case types.DELETE_REWARD:
        {
        return {
          ...state,
          reward: action.payload
        }
      }
  
        case types.DELETE_REWARD_SUCCESS:
        return {
          ...state,
          reward
        };
  
        case types.DELETE_REWARD_FAILED:
        return {
          ...state,
          reward: action.payload
        };
      default:
        
     return {...state};
    }
    
}
export default reward;