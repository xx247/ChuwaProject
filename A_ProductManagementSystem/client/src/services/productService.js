export async function getProducts() {
  return [
    {
      id: 1,
      name: "Meta Quest 2 VR Headset",
      price: 399,
      image:
        "https://cdn.shopify.com/s/files/1/0533/2089/files/vr-placeholder.png?height=628&pad_color=ffffff&v=1648922577&width=1200",
    },
    {
      id: 2,
      name: "Noise-Cancelling Headphones",
      price: 149,
      image:
        "https://cdn.shopify.com/s/files/1/0533/2089/files/headphones-placeholder.png?v=1648923141",
    },
    {
      id: 3,
      name: "Smartwatch",
      price: 199,
      image:
        "https://cdn.shopify.com/s/files/1/0533/2089/files/watch-placeholder.png?v=1648923128",
    },
  ];
}

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
