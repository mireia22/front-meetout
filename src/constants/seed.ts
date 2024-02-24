import { Event } from "../types/Types";

const exampleEvents: Event[] = [
  {
    _id: "1",
    title: "Running  Meetup",
    date: "19-04-2024",
    description: "Morning run in Central Park!",
    ubication: "New York",
    sport: "Running",
    createdBy: {
      _id: "1",
      name: "Mire",
      email: "mire@mire.com",
      password: "mire",
    },

    createdAt: "2024-04-18",
    difficulty: "🟡 Medium",
    eventImage: "../../src/public/running.jpg",
    participants: [
      {
        _id: "1",
        name: "Mire",
        email: "mire@mire.com",
      },
      {
        _id: "2",
        name: "Admin",
        email: "admin@admin.com",
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
    createdAt: "2024-04-18",
    difficulty: "🟢 Easy",
    eventImage: "../../src/public/skatepark.jpg",
    participants: [
      {
        _id: "2",
        name: "Admin",
        email: "admin@admin.com",
      },
    ],
  },
];

export default exampleEvents;
