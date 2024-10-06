"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteProvider } from "@/app/context/favoriteContext";

const queryClient = new QueryClient();

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteProvider>{children}</FavoriteProvider>
    </QueryClientProvider>
  );
};

export default Providers;
