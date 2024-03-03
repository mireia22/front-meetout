import FilterEvents from "../components/FilterEvents";
import { useFormInput } from "../hooks/useFormInput";
import { useEffect, useState } from "react";
import { useCommonState } from "../hooks/useCommonState";
import { useUserDataContext } from "../hooks/useUserData";
import Loader from "../components/atoms/Loader";
import RenderEvents from "../components/RenderEvents";
import exampleEvents from "../constants/seed";

const Home = () => {
  const { formState: filters, handleInputChange } = useFormInput({
    sport: "",
    difficulty: "",
    title: "",
    ubication: "",
  });
  const [events, setEvents] = useState([]);
  const { userData } = useUserDataContext();
  const { loading, setLoading } = useCommonState();
  const [defaultEvents, setDefaultEvents] = useState(exampleEvents);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const fetchFilteredEvents = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/events/filtered`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch events. Status: ${response.status}`);
      }
      const filteredEventsData = await response.json();
      setEvents(filteredEventsData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events`);
      const fetchedEvents = await response.json();

      if (fetchedEvents.length === 0) {
        setDefaultEvents(defaultEvents);
      } else {
        setEvents(fetchedEvents);
        setDefaultEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isFiltering) {
      fetchAllEvents();
    }
  }, [isFiltering]);

  useEffect(() => {
    if (isFiltering) {
      fetchFilteredEvents();
    }
  }, [filters]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section>
      <FilterEvents
        onChange={handleInputChange}
        filters={filters}
        setIsFiltering={setIsFiltering}
      />
      <RenderEvents
        events={events}
        userData={userData}
        defaultEvents={defaultEvents}
      />
    </section>
  );
};

export default Home;
