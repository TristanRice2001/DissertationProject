import { FilterContext } from "context/FilterContext";
import { Challenge } from "types/challenge";
import { useChallenges } from "./useChallenges";
import { useFilters } from "./useFilters";
import { useContext } from "react";

export const useFilteredChallenges = () => {
  const { searchQuery } = useContext(FilterContext);
  const { challenges } = useChallenges();

  const isChallengeFiltered = (challenge: Challenge) => {
    const doesNameContainSearchQuery = !challenge.name
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase());

    return doesNameContainSearchQuery;
  };

  const filteredChallenges = challenges.map((challenge) => ({
    challenge,
    isHidden: isChallengeFiltered(challenge),
  }));

  return {
    filteredChallenges,
  };
};
