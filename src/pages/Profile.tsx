import { useEffect } from "react";
import { useUserDataContext } from "../hooks/useUserData";
import UserInfo from "../components/molecules/UserInfo/UserInfo";
import UserEvents from "../components/molecules/UserEvents/UserEvents";
const Profile = () => {
  const { userData, fetchUser } = useUserDataContext();
  const user = userData?.user;

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section className="profile-container">
      <UserInfo user={user} />
      <UserEvents events={user?.postedEvents} title="POSTED EVENTS:" />
      <UserEvents events={user?.asistedEvents} title="ASSSITED EVENTS:" />
    </section>
  );
};

export default Profile;
