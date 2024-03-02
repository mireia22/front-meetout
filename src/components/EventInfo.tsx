import { Link } from "react-router-dom";
import { useUserDataContext } from "../hooks/useUserData";
import { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Event } from "../types/Types";
import { useCommonState } from "../hooks/useCommonState";
import Creator from "./molecules/Creator";

interface EventInfoProps {
  event: Event;
}

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
  const {
    _id,
    title,
    date,
    description,
    ubication,
    sport,
    difficulty,
    createdBy,
    eventImage,
    createdAt,
  } = event;
  const { error, setError } = useCommonState();
  const { userData, fetchUser } = useUserDataContext();
  const user = userData?.user;

  const isUserInscribed = user?.asistedEvents?.some(
    (assistedEvent) => assistedEvent._id === event._id
  );

  const isUserCreator = user?.postedEvents?.some(
    (postedEvent) => postedEvent._id === event._id
  );

  const { navigate } = useCommonState();
  useEffect(() => {
    fetchUser();
  }, []);
  const handleInscriptionClick = () => {
    if (!userData) {
      setError("You must be registered.");
    } else {
      navigate(`/${_id}/inscription`);
    }
  };

  return (
    <div className="event-info">
      <h2>{title?.toUpperCase()}</h2>
      <article>
        <h4>{date}</h4>
        <h4>{sport}</h4>
      </article>
      <article>
        <p className="ubication">
          <FaMapMarkerAlt />
          {ubication?.toUpperCase()}
        </p>
        <p>{difficulty}</p>
      </article>
      <article className="card-event-image">
        <img
          src={eventImage || "../assets/event.png"}
          alt="Event image"
          loading="lazy"
        />
      </article>
      <article>
        <p>{description}</p>
      </article>
      {error && <p> 🚫{error}</p>}
      <article>
        <button
          onClick={handleInscriptionClick}
          style={{
            backgroundColor: isUserInscribed ? "var(--gold)" : "var(--yellow)",
            color: isUserInscribed ? "white" : "var(--black)",
          }}
          disabled={isUserInscribed}
        >
          {isUserInscribed ? "Inscribed!" : "Inscription"}
        </button>
        <Link to={`/${_id}/asistants`}>Assistants</Link>
        {isUserCreator && (
          <Link to={`/${_id}/edit`} className="warning-link">
            Edit
          </Link>
        )}
      </article>
      <article>
        <Creator creator={createdBy} createdAt={createdAt} />
      </article>
    </div>
  );
};

export default EventInfo;
