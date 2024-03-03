import { useCommonState } from "../../../hooks/useCommonState";
import Loader from "../../atoms/Loader";

interface InscriptionFormProps {
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  data: {
    name: string;
    email: string;
  };
}

const InscriptionForm: React.FC<InscriptionFormProps> = ({
  handleInputChange,
  handleSubmit,
  data,
}) => {
  const { error, loading } = useCommonState();
  return (
    <form onSubmit={handleSubmit}>
      <article>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
          />
        </div>
      </article>

      {error && <p>🚫 {error}</p>}
      <button>{loading ? <Loader /> : "Inscribe"}</button>
    </form>
  );
};

export default InscriptionForm;
