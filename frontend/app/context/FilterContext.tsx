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
  /*
  This function makes a filter context, which allows global variables to be
  used across the app, and changed at will
  */

  // Set the initial search query to be empty
  const [searchQuery, setSearchQuery] = useState("");
  // Set the initial view type to list
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
