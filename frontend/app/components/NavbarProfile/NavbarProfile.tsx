import { useRef } from "react";
import { CARET_DOWN_ICON } from "assets";
import Image from "next/image";
import { NavbarProfileStyled } from "./NavbarProfileStyled";
import { useToggle } from "hooks/useToggle";
import { useUser } from "hooks/useUser";
import ChallengePoints from "components/ChallengePoints";
import NavLink from "components/NavLink/NavLink";

interface Props {
  profilePicture: string;
  username: string;
}

const NavbarProfile = ({ username, profilePicture }: Props) => {
  const [isDropdownOpen, toggleIsDropdownOpen] = useToggle(false);
  const { user } = useUser();
  const dropDownRef = useRef<HTMLDivElement>(null);

  window.onclick = (event: any) => {
    if (!dropDownRef.current?.contains(event.target) && isDropdownOpen) {
      toggleIsDropdownOpen();
    }
  };

  return (
    <NavbarProfileStyled ref={dropDownRef}>
      <div className="profile-dropdown-link" onClick={toggleIsDropdownOpen}>
        <div className="profile-image">
          <Image src={profilePicture} fill alt={`${username} profile image`} />
        </div>
        <p>{username}</p>
        <Image
          src={CARET_DOWN_ICON}
          width={15}
          height={15}
          className={`caret ${isDropdownOpen && "caret-dropdown-open"}`}
          alt="Caret down icon"
        />
      </div>
      {isDropdownOpen && (
        <div className="profile-dropdown-content">
          <ChallengePoints
            points={user?.points || 0}
            className="challenge-points"
          />
          <NavLink href="/profile">Profile</NavLink>
          <NavLink href="/logout">Logout</NavLink>
        </div>
      )}
    </NavbarProfileStyled>
  );
};

export default NavbarProfile;
