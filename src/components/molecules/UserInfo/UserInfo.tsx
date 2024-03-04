import { Link } from "react-router-dom";
import { UserData } from "../../../types/Types";
import Avatar from "../../atoms/Avatar/Avatar";
import "./UserInfo.css";
interface UserInfoProps {
  user: UserData | undefined;
}
const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <article>
      <div>{user && <Avatar user={user} size="standard" />} </div>
      <div>
        <h3>Name: </h3>
        <p>{user?.name}</p>
        <h3>Email:</h3>
        <p>{user?.email}</p>
      </div>
      <Link className="warning-link" to="/edit-profile">
        Edit Profile
      </Link>
    </article>
  );
};

export default UserInfo;
