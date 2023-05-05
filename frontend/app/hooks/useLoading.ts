import { useReducer } from "react";

type LoadingQueryAction = {
  type: "add_loading_item" | "remove_loading_item";
  id: number;
};

const loadingQueries = (state: number[], action: LoadingQueryAction) => {
  // If the action is add_loading_item, the add an item to the state array
  if (action.type == "add_loading_item") {
    return [...state, action.id];
  } else if (action.type == "remove_loading_item") {
    // Otherwise, remove the item from the state array
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
  /*
  This hook will allow multiple items to be loading at once, using one state variable.
  When one item starts loading, add it to the array. The isItemLoading function can be used
  To check if that item is loading
  */
  const [loadingItems, dispatchLoadingItems] = useReducer(loadingQueries, []);

  // To check if an item is loading, just check if its ID exists in the loadingItems array
  const isItemLoading = (id: number) => loadingItems.indexOf(id) > -1;

  // in order to set an item as loading, just add it to the loadingItems array
  const setItemLoading = (id: number, isLoading: boolean) => {
    const type = isLoading ? "add_loading_item" : "remove_loading_item";
    dispatchLoadingItems({ type, id });
  };

  return { isItemLoading, setItemLoading };
};

export default useLoading;
