// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import store from "./store"; // your Redux store

const root = createRoot(document.getElementById("root"));
const queryClient = new QueryClient(); // React Query client

root.render(
  <React.StrictMode>
    {/* Provide Redux store */}
    <Provider store={store}>
      {/* Provide React Query client */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
