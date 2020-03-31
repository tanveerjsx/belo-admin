import API from '../lib/Api'
//brand registration
export async function brandRegister(brand,token) {
    let headers={
        "Content-Type":"application/json",
        token
    };
    return API.post('/brand',{brand},{headers});
}

export async function updateBrand(brand,id,token) {
    let headers={
        "Content-Type":"application/json",
        token
    };
    return API.put(`/brand/${id}`,{brand},{headers});
}

export async function deleteBrand(id,token) {
    let headers={
        "Content-Type":"application/json",
        token
    };
    return API.delete(`/brand/${id}`,{headers});
}

