import { useReducer } from "react";

type LoadingQueryAction = {
  type: "add_loading_item" | "remove_loading_item";
  id: number;
};

const loadingQueries = (state: number[], action: LoadingQueryAction) => {
  // Replace this with react-query soon
  if (action.type == "add_loading_item") {
    return [...state, action.id];
  } else if (action.type == "remove_loading_item") {
    const idIndex = state.indexOf(action.id);
    if (idIndex < 0) {
      return state;
    }
    state.splice(idIndex, 1);
    return state;
  }
  return state;
};

const useLoading = () => {
  const [loadingItems, dispatchLoadingItems] = useReducer(loadingQueries, []);

  const isItemLoading = (id: number) => loadingItems.indexOf(id) > -1;

  const setItemLoading = (id: number, isLoading: boolean) => {
    const type = isLoading ? "add_loading_item" : "remove_loading_item";
    dispatchLoadingItems({ type, id });
  };

  return { isItemLoading, setItemLoading };
};

export default useLoading;
