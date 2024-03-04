import { Event } from "../../../types/Types";
import ListTitle from "../../atoms/ListTitle/ListTitle";
import "./UserEvents.css";
interface UserEventsProps {
  events: Event[] | undefined;
  title: string;
}
const UserEvents = ({ events, title }: UserEventsProps) => {
  return (
    <div>
      <ul className="user-list">
        <h3>
          <ListTitle title={title} events={events} />
        </h3>
        {events ? (
          events.map((event) => (
            <li key={event._id} className="user-event">
              <p>{event.date}</p>
              <p> {event.title?.toUpperCase()}</p>
              <p> {event.sport}</p>
            </li>
          ))
        ) : (
          <p>No events.</p>
        )}
      </ul>
    </div>
  );
};

export default UserEvents;
