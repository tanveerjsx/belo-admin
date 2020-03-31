import API from '../lib/Api'

export async function branchRegister(branch,token) {
    let headers={
        "Content-Type":"application/json",
        token
    };
    return API.post('/branch',{branch},{headers});
}
export async function updateBranch(branch,id,token) {
    let headers={
        "Content-Type":"application/json",
        token
    };
    return API.put(`/branch/${id}`,{branch},{headers});
}
export async function deleteBranch(id,token) {
    let headers={
        "Content-Type":"application/json",
        token
    };
    return API.delete(`/branch/${id}`,{headers});
}
