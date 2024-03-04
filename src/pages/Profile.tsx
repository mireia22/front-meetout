import React, { useEffect } from "react";
import { useUserDataContext } from "../hooks/useUserData";
import UserInfo from "../components/molecules/UserInfo/UserInfo";
import UserEvents from "../components/molecules/UserEvents/UserEvents";

const Profile: React.FC = () => {
  const { userData, fetchUser } = useUserDataContext();
  const user = userData?.user;

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section className="profile-container">
      <UserInfo user={user} />
      <article className="user-events">
        <UserEvents events={user?.postedEvents} title="POSTED EVENTS:" />
        <UserEvents events={user?.asistedEvents} title="ASSSITED EVENTS:" />
      </article>
    </section>
  );
};

export default Profile;
