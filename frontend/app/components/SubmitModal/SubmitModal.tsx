import { submitFlag } from "api/submitFlag";
import { toast } from "react-toastify";
import Modal from "components/Modal";
import TextBox from "components/TextBox";
import { getJwtToken } from "helpers";
import { useChallenges } from "hooks/useChallenges";
import { FormEvent, useState, ChangeEvent } from "react";
import { SubmitModalStyled } from "./SubmitModalStyled";
import FormItem from "components/FormItem/FormItem";
import SubmitButton from "components/SubmitButton/SubmitButton";

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
  const { completeChallenge } = useChallenges();

  const handleChange = (name: string, value: string) => {
    setFlag(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const authToken = getJwtToken();
    setIsLoading(true);
    let response;

    if (!authToken) {
      alert("error");
      return;
    }

    try {
      response = await submitFlag(authToken, chalId, flag);
      setIsLoading(false);
    } catch {
      setError("Error with API request");
      setIsLoading(false);
      return;
    }

    if (!response || !response.data.success) {
      setError(response?.data.message || "Incorrect flag");
      return;
    }
    completeChallenge(chalId);
    toast("Flag submitted successfully!");
    onClose();
  };

  return (
    <SubmitModalStyled className={className}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form action="" onSubmit={handleSubmit}>
          <FormItem
            name="flagContent"
            disabled={isLoading}
            value={flag}
            onChange={handleChange}
            label="Flag"
          />
          <SubmitButton
            isLoading={isLoading}
            isDisabled={!flag}
            className="submit-button"
          />
        </form>
        <p className="api-error">{error}</p>
      </Modal>
    </SubmitModalStyled>
  );
};

export default SubmitModal;
