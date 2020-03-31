import API from "../lib/Api";

export async function login(email, password) {
  return API.post("/auth/admin/login");
}

export async function register(name, email, password) {
  console.log("sending ", name);
  console.log("sending ", password);
  console.log("sending ", email);
  return API.post("/auth/admin/signup", { name: name, email: email, password: password });
}

//brand registration

// export async function brandRegister(brand) {
//     return API.post('/brand', brand );
// }
// export async function allbrand(brand) {
//     return API.get('/brand');
// }
