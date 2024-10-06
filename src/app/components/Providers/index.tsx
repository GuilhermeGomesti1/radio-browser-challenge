"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteProvider } from "@/app/context/favoriteContext";
import { EditRadioProvider } from "@/app/context/editContext";

const queryClient = new QueryClient();

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteProvider>
        <EditRadioProvider>{children}</EditRadioProvider>
      </FavoriteProvider>
    </QueryClientProvider>
  );
};

export default Providers;
