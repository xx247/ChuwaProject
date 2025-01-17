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
