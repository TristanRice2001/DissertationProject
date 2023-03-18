import { createContext, ReactNode, useState } from "react";
import { View } from "types/general";

type Context = {
  searchQuery: string;
  setSearchQuery: (value: string) => void | (() => {});
  viewType: View;
  setViewType: (viewType: View) => void | (() => {});
};

export const FilterContext = createContext<Context>({
  searchQuery: "",
  setSearchQuery: () => {},
  viewType: "LIST",
  setViewType: () => {},
});

interface Props {
  children: ReactNode;
}

export const FilterContextProvider = ({ children }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<View>("LIST");

  return (
    <FilterContext.Provider
      value={{
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
        viewType: viewType,
        setViewType: setViewType,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
