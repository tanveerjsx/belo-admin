import * as types from '../types/branch';

export function registerBranch(branch) {
  console.log('register branch',branch)
    return {
      type: types.BRANCH_CREATE_REQUEST,
      payload: branch
    };
  }
  export function registerBranchSuccess(payload) {
    return {
      type: types.BRANCH_CREATE_SUCCESS,
      payload
    };
  }
  
export function registerBranchFailed(payload) {
    return {
      type: types.BRANCH_CREATE_FAILURE,
      payload
    };
}
export function updateBranch(data){
  return{
    type: types.UPDATE_BRANCH,
    payload:data

  }
}
export function updateBranchSuccess(data){
  return{
    type: types.UPDATE_BRANCH_SUCCESS,
    payload:data

  }
}
export function updateBranchFailed(data){
  return{
    type: types.UPDATE_BRANCH_FAILED,
    payload:data

  }
}

export function deleteBranch(data){
  return{
    type: types.DELETE_BRANCH,
    payload:data
  }
}
export function deleteBranchSuccess(data){
  return{
    type: types.DELETE_BRANCH_SUCCESS,
    payload:data

  }
}
export function deleteBranchFailed(){
  return{
    type: types.DELETE_BRANCH_FAILED,

  }
}


