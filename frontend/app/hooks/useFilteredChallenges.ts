import { FilterContext } from "context/FilterContext";
import { Challenge } from "types/challenge";
import { useChallenges } from "./useChallenges";
import { useFilters } from "./useFilters";
import { useContext } from "react";

export const useFilteredChallenges = () => {
  const { searchQuery } = useContext(FilterContext);
  const { challenges } = useChallenges();

  const isChallengeFiltered = (challenge: Challenge) => {
    // Check if the name contains the search query
    const doesNameContainSearchQuery = !challenge.name
      // Make sure that the search is case insensitive
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase());

    return doesNameContainSearchQuery;
  };

  // map over the challenges, and add the 'isHidden' attribute
  // to any item that matches the filter function on line 11
  const filteredChallenges = challenges.map((challenge) => ({
    challenge,
    isHidden: isChallengeFiltered(challenge),
  }));

  return {
    filteredChallenges,
  };
};
