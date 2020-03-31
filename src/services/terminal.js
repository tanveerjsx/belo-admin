
import API from '../lib/Api'

export async function terminalRegister(terminal,token) {
    let headers={
        "Content-Type":"application/json",
        token
    };
    return API.post('/terminal', {terminal},{headers});
}

export async function updateTerminal(terminal,id,token) {
    let headers={
        "Content-Type":"application/json",
        token
    };
    return API.put(`/terminal/${id}`,{terminal},{headers});
}
export async function deleteTerminal(terminal,id, token){
    let headers={
        "Content-Type":"application/json",
        token
    };
    return API.delete(`/terminal/${id}`,{terminal},{headers});
}