// components/ListItem.tsx
"use client";

import React from "react";
import { Station } from "@/app/types/types";

interface ListItemProps {
  data: Station; // A estação
  onClick: () => void; // Função a ser chamada ao clicar
}

const ListItem: React.FC<ListItemProps> = ({ data, onClick }) => {
  return (
    <li className="text-white cursor-pointer" onClick={onClick}>
      {data.name}
    </li>
  );
};

export default ListItem;
