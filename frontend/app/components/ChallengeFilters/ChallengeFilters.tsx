import DesktopContent from "components/DesktopContent/DesktopContent";
import FormItem from "components/FormItem/FormItem";
import { useFilters } from "hooks/useFilters";
import { ChallengeFiltersStyled } from "./ChallengeFiltersStyled";
import { ChangeEvent } from "react";
import { View } from "types/general";
import Image from "next/image";
import { GRID_ICON, LIST_ICON } from "assets";

const ChallengeFilters = () => {
  const { searchQuery, setSearchQuery, setViewType, viewType } = useFilters();

  const onSearchQueryChange = (_: string, value: string) => {
    setSearchQuery(value);
  };

  const onListViewSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value as View;
    setViewType(inputValue);
  };

  return (
    <ChallengeFiltersStyled>
      <FormItem
        name="searchQuery"
        label="Search"
        onChange={onSearchQueryChange}
        className="search-input"
        value={searchQuery}
      />
      <DesktopContent>
        <div className="view-filters">
          <input
            className="view-filter-input"
            name="view-filter"
            type="radio"
            id="gridview"
            value="GRID"
            checked={viewType === "GRID"}
            onChange={onListViewSelected}
          />
          <label className="view-filter-label" htmlFor="gridview">
            <Image src={GRID_ICON} width={15} height={15} alt="grid icon" />
          </label>
          <input
            className="view-filter-input"
            name="view-filter"
            type="radio"
            id="listview"
            value="LIST"
            onChange={onListViewSelected}
            checked={viewType === "LIST"}
          />
          <label className="view-filter-label" htmlFor="listview">
            <Image src={LIST_ICON} width={15} height={15} alt="grid icon" />
          </label>
        </div>
      </DesktopContent>
    </ChallengeFiltersStyled>
  );
};

export default ChallengeFilters;
