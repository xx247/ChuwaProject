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
  fetch("/createProduct", {
    method: 'POST',
    body: JSON.stringify(inputs),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function editProduct(inputs, id) {
  fetch("/editProduct/" + id, {
    method: 'POST',
    body: JSON.stringify(inputs),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function getProduct(id) {
  const resp = await fetch("/getProduct/" + id);
  return resp.json();
}
