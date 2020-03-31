
import API from '../lib/Api'
//brand registration
export async function rewardRegister(reward,token) {
    let headers={
        "Content-Type":"application/json",
        token
    };
    return API.post('/reward', {reward},{headers});
}
export async function updateReward(reward,id,token) {
    let headers={
        "Content-Type":"application/json",
        token
    };
    return API.put(`/reward/${id}`,{reward},{headers});
}
export async function deleteReward(reward,id, token){
    let headers={
        "Content-Type":"application/json",
        token
    };
    return API.delete(`/reward/${id}`,{reward},{headers});
}