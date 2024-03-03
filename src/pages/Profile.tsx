import { useEffect } from "react";
import { useUserDataContext } from "../hooks/useUserData";
import { Link } from "react-router-dom";
import { Event } from "../types/Types";
import Avatar from "../components/atoms/Avatar";
const Profile = () => {
  const { userData, fetchUser } = useUserDataContext();
  const user = userData?.user;

  useEffect(() => {
    fetchUser();
  }, []);

  const countEvents = (events: Event[] | undefined) => {
    return events ? events.length : 0;
  };
  return (
    <section className="profile-container">
      <article>
        <div>{user && <Avatar user={user} size="standard" />} </div>
        <div>
          <h3>Name: </h3>
          <p>{user?.name}</p>
          <h3>Email:</h3>
          <p>{user?.email}</p>
        </div>
        <Link className="warning-link" to="/edit-profile">
          Edit Profile
        </Link>
      </article>
      <article>
        <ul className="asistants-list">
          <h3>Posted Events: {countEvents(user?.postedEvents)}</h3>
          {user?.postedEvents ? (
            user.postedEvents.map((event) => (
              <li key={event._id} className="asistant">
                <p>{event.date}</p>
                <p> {event.title?.toUpperCase()}</p>
                <p> {event.sport}</p>{" "}
              </li>
            ))
          ) : (
            <p>No events.</p>
          )}
        </ul>
        <ul className="asistants-list">
          <h3>Asisted Events: {countEvents(user?.asistedEvents)} </h3>
          {user?.asistedEvents ? (
            user.asistedEvents.map((event) => (
              <li key={event._id} className="asistant">
                <p>{event.date}</p>
                <p> {event.title?.toUpperCase()}</p>
                <p> {event.sport}</p>
              </li>
            ))
          ) : (
            <p>No events.</p>
          )}
        </ul>
      </article>
    </section>
  );
};

export default Profile;
