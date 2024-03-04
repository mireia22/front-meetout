import { FaMapMarkerAlt } from "react-icons/fa";
import "./FilterEvents.css";
import { DIFFICULTY, SPORTS } from "../../../constants/constants";
interface FilterEventsProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  filters: {
    sport: string;
    difficulty: string;
    title: string;
    ubication: string;
  };
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterEvents: React.FC<FilterEventsProps> = ({
  onChange,
  filters,
  setIsFiltering,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange(e);
    setIsFiltering(true);
  };
  return (
    <article>
      <h3>Find Event: </h3>
      <div className="filter">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Search "
            name="title"
            onChange={handleInputChange}
            value={filters.title}
          />
          <label htmlFor="ubication" className="ubication">
            <FaMapMarkerAlt />
            Ubication
          </label>
          <input
            type="text"
            placeholder="Ubication  "
            name="ubication"
            onChange={handleInputChange}
            value={filters.ubication}
          />
        </div>
        <div>
          <label htmlFor="sport">Sport:</label>
          <select
            name="sport"
            onChange={handleInputChange}
            value={filters.sport}
          >
            <option value=""> All</option>
            {SPORTS.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            name="difficulty"
            onChange={handleInputChange}
            value={filters.difficulty}
          >
            <option value=""> All</option>
            {DIFFICULTY.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>
    </article>
  );
};

export default FilterEvents;
