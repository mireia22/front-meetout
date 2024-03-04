import { Asistant, UserData } from "../../../types/Types";
import { countItems } from "../../../utils/countItems";
import Avatar from "../../atoms/Avatar/Avatar";
import "./EventAssistants.css";
interface EventAssistantsProps {
  asistants: Asistant[];
  user: UserData | undefined;
  error: string;
}

const EventAssistants = ({ asistants, user, error }: EventAssistantsProps) => {
  return (
    <article>
      <ul className="asistants-list">
        <h3>Asistants: {countItems(asistants)}</h3>
        {asistants ? (
          <>
            {asistants.map((assistant) => (
              <li key={assistant._id} className="asistant">
                <Avatar user={user} size="small" />
                <p> {assistant.name}</p>
              </li>
            ))}
          </>
        ) : (
          error && <p>🚫{error}</p>
        )}
      </ul>
    </article>
  );
};

export default EventAssistants;
