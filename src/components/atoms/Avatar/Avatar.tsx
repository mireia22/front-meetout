import React from "react";
import { UserData } from "../../../types/Types";
import "./Avatar.css";
interface AvatarProps {
  user: UserData | null | undefined;
  size?: "small" | "standard";
}

const Avatar: React.FC<AvatarProps> = ({ user, size = "standard" }) => {
  const imageSize = size === "small" ? "2rem" : "12rem";
  return (
    <article
      className="profile-photo"
      style={{ width: imageSize, height: imageSize }}
    >
      <img
        src={user?.avatar || ""}
        alt={user?.name || "USERNAME"}
        loading="lazy"
      />
    </article>
  );
};

export default Avatar;
