import * as types from "../types/branch";
let initialState = {
  branches : [
    {
      id: 1,
      branch_name: "Hashlogics",
      Address: "Pakistan",
      Publicty:"Public",
      Status:'Live',
      Access:'none',
      Dine_in: true,
      Takeaway: false,
      Drive_Through:false,
      Delivery: false,
      Public_location:true,
      Private_location:false
    },
    {
      id: 2,
      branch_name: "Otista",
      Address: "USA",
      Publicty:"Public",
      Status:'Live',
      Access:'none',
      Dine_in: true,
      Takeaway: false,
      Drive_Through:false,
      Delivery: false,
      Public_location:true,
      Private_location:false

    },
    {
      id: 3,
      branch_name: "Nearshore",
      Address: "Germany",
      Publicty:"Public",
      Status:'Live',
      Access:'none',
      Dine_in: true,
      Takeaway: false,
      Drive_Through:false,
      Delivery: false,
      Public_location:true,
      Private_location:false

    },
    {
      id: 4,
      branch_name: "Goopax",
      Address: "France",
      Publicty:"Public",
      Status:'Live',
      Access:'none',
      Dine_in: true,
      Takeaway: false,
      Drive_Through:false,
      Delivery: false,
      Public_location:true,
      Private_location:false

    }
  ]
};

const branch = (state = initialState, action) => {
  switch (action.type) {
    case types.BRANCH_CREATE_SUCCESS: 
      let tempBranches = [...state.branches, action.payload];
      return {
        ...state,
        branches: tempBranches,
        created: true
      };

    case types.UPDATE_BRANCH:
      return {
        ...state,
        branch: action.payload
      };

    case types.UPDATE_BRANCH_SUCCESS:
      return {
        ...state,
        branch: action.payload
      };

    case types.DELETE_BRANCH:
      {
      return {
        ...state,
        branch: action.payload
      }
    }

      case types.DELETE_BRANCH_SUCCESS:
      let branches = [...state.branches]
      branches = branches.filter(x=>x.id !=action.payload)
      return {
        ...state,
        branches
      };

      case types.DELETE_BRANCH_FAILED:
      return {
        ...state,
        branch: action.payload
      };
    default:
      return{
        ...state
      }
  }
};

export default branch;
