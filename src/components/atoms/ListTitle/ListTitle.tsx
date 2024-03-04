import { Event } from "../../../types/Types";
import { countItems } from "../../../utils/countItems";

interface ListTitleProps {
  title: string;
  events: Event[] | undefined;
}
const ListTitle = ({ title, events }: ListTitleProps) => {
  return (
    <h3>
      {title} {countItems(events)}
    </h3>
  );
};

export default ListTitle;
