import { submitFlag } from "api/submitFlag";
import FormItem from "components/FormItem/FormItem";
import Modal from "components/Modal";
import TextBox from "components/TextBox";
import { getJwtToken } from "helpers";
import { useToggle } from "hooks/useToggle";
import { FormEvent, useState, ChangeEvent } from "react";
import { SubmitModalStyled } from "./SubmitModalStyled";

interface Props {
  className?: string;
  chalId: number;
  onClose: () => void;
  isOpen?: boolean;
}

const SubmitModal = ({ isOpen, chalId, className, onClose }: Props) => {
  const [flag, setFlag] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFlag(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const authToken = getJwtToken();

    let response;

    if (!authToken) {
      alert("error");
      return;
    }

    try {
      response = await submitFlag(authToken, chalId, flag);
    } catch {
      setError("Error with API request");
    }

    if (!response || !response.data.success) {
      setError(response?.data.message || "Incorrect flag");
      return;
    }

    onClose();
  };

  return (
    <SubmitModalStyled className={className}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form action="" onSubmit={handleSubmit}>
          <TextBox
            name="test"
            disabled={isLoading}
            value={flag}
            onChange={handleChange}
          />
          <input type="submit" />
        </form>
        {error}
        {isLoading && <p>Loading...</p>}
        <form method="dialog">
          <button onClick={onClose}>Close</button>
        </form>
      </Modal>
    </SubmitModalStyled>
  );
};

export default SubmitModal;
