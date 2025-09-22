// app/ClientWrapper.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
export default function ClientWrapper({ children }: { children: React.ReactNode }) {


  return (
    <Provider store={store}>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        {children}
    </Provider>
  );
}
