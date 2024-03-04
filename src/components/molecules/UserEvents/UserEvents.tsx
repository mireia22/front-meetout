import { Event } from "../../../types/Types";
import ListTitle from "../../atoms/ListTitle/ListTitle";

interface UserEventsProps {
  events: Event[] | undefined;
  title: string;
}
const UserEvents = ({ events, title }: UserEventsProps) => {
  return (
    <article>
      <ul className="asistants-list">
        <h3>
          <ListTitle title={title} events={events} />
        </h3>
        {events ? (
          events.map((event) => (
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
    </article>
  );
};

export default UserEvents;
