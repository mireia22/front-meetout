import { Event } from "../types/Types";
import runningImage from "../assets/running.jpg";
import skateparkImage from "../assets/skatepark.jpg";

const exampleEvents: Event[] = [
  {
    _id: "1",
    title: "Running  Meetup",
    date: "19-02-2024",
    description: "Morning run in Central Park!",
    ubication: "New York",
    sport: "Running",
    createdBy: {
      _id: "1",
      name: "Mire",
      email: "mire@mire.com",
      password: "mire",
    },

    createdAt: "2024-02-18",
    difficulty: "🟡 Medium",
    eventImage: runningImage,
    participants: [
      {
        _id: "1",
        name: "Mire",
        email: "mire@mire.com",
        avatar: ".",
      },
      {
        _id: "2",
        name: "Admin",
        email: "admin@admin.com",
        avatar: ".",
      },
    ],
  },
  {
    _id: "2",
    title: "Roller Route",
    date: "03-04-2024",
    description: "Friendly roller route.",
    ubication: "La Seu ",
    sport: "Roller",
    createdBy: {
      _id: "2",
      name: "Admin",
      email: "admin@admin.com",
      password: "admin",
    },
    createdAt: "2024-02-18",
    difficulty: "🟢 Easy",
    eventImage: skateparkImage,
    participants: [
      {
        _id: "2",
        name: "Admin",
        email: "admin@admin.com",
        avatar: "",
      },
    ],
  },
];

export default exampleEvents;
