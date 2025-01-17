import productData from "./productData";

export function getProducts() {
  return productData;
}

// api later
// export async function getProducts() {
//   const response = await fetch("api");
//   const data = await response.json();
//   return data;
// }

export async function createProduct(inputs) {
  fetch("http://localhost:3001/createProduct", {
    method: 'POST',
    body: JSON.stringify(inputs),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function editProduct(inputs, id) {
  fetch("http://localhost:3001/editProduct/" + id, {
    method: 'POST',
    body: JSON.stringify(inputs),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function getProduct(id) {
  const resp = await fetch("http://localhost:3001/getProduct/" + id);
  return resp.json();
}
