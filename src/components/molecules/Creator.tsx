import React from "react";
import { formatTimeAgo } from "../../utils/formatDates";
import Avatar from "../atoms/Avatar";
import { UserData } from "../../types/Types";

interface CreatorProps {
  creator?: UserData | null;
  createdAt?: string | null;
}

const Creator: React.FC<CreatorProps> = ({ creator, createdAt }) => {
  if (!creator || !createdAt) {
    return null;
  }
  return (
    <small>
      <Avatar user={creator} size="small" />
      <span>{creator.name}</span>
      {formatTimeAgo(createdAt)}
    </small>
  );
};

export default Creator;
