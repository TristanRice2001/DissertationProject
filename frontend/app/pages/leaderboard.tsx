import { useEffect } from "react";
import PageSkeleton from "components/PageSkeleton/PageSkeleton";
import { GetServerSidePropsContext } from "next";
import LeaderboardContainer from "containers/Leaderboard";
import { Leaderboard as LeaderboardType } from "types/api/leaderboard";
import { getLeaderboard } from "api/getLeaderboard";
import constants from "appConstants";
import { User } from "types/user";
import { me } from "api/me";
import { useUser } from "hooks/useUser";

interface Props {
  leaderboard: LeaderboardType;
  user?: User;
  error?: string | null;
}

export default function Leaderboard({ leaderboard, user }: Props) {
  const { setCurrentUser } = useUser();

  useEffect(() => {
    if (!user) {
      return;
    }

    setCurrentUser(user);
  }, []);

  return (
    <PageSkeleton>
      <LeaderboardContainer leaderboard={leaderboard} />
    </PageSkeleton>
  );
}

type getPropsType = {
  props: {
    leaderboard: LeaderboardType | [];
    error: string | null;
    user: User | null;
  };
};

class LeaderboardPropsFactory {
  leaderboard: LeaderboardType | [];
  error: string | null;

  constructor() {
    this.leaderboard = [];
    this.error = null;
  }

  protected async _getLeaderboard() {
    try {
      let response = await getLeaderboard();
      this.leaderboard = response.data;
    } catch (e) {
      this.leaderboard = [];
      this.error = "Unable to retrieve ";
    }
  }

  async getProps(): Promise<getPropsType> {
    // Just get the leader board, without any user
    await this._getLeaderboard();
    return {
      props: {
        leaderboard: this.leaderboard,
        error: this.error,
        user: null,
      },
    };
  }
}

class AuthenticatedLeaderboardPropsFactory extends LeaderboardPropsFactory {
  private user: User | null;
  private authToken: string;

  constructor(authToken: string) {
    super();
    this.authToken = authToken;
    this.user = null;
  }

  protected async _getLeaderboard() {
    try {
      // send a request to the leaderboard with the authentication token
      // otherwise, set the error for the class
      let response = await getLeaderboard(this.authToken);
      this.leaderboard = response.data;
    } catch (e) {
      this.error = "Unable to load user";
    }
  }

  private async _getUser() {
    // Make sure that the user is valid by sending a request to the /me api
    try {
      let response = await me(this.authToken);
      this.user = response.data.user;
    } catch (e) {
      // If this request fails, then set the error of the class
      this.error = "Unable to load user";
    }
  }

  async getProps() {
    // make sure to not only verify that the leaderboard is returned properly, but also that
    // the user is loaded properly
    await this._getLeaderboard();
    await this._getUser();
    return {
      props: {
        leaderboard: this.leaderboard,
        error: this.error,
        user: this.user,
      },
    };
  }
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const authCookie = context.req.cookies[constants.AUTH_TOKEN_COOKIE_NAME];

  // If the authentication token cookie is present in the user's request, then load
  // the AuthenticatedLeaderboardPropsFactory class, otherwise, just load the
  // LeaderboardPropsFactory class

  const propsFactory = authCookie
    ? new AuthenticatedLeaderboardPropsFactory(authCookie)
    : new LeaderboardPropsFactory();

  const props = await propsFactory.getProps();

  return props;
};
