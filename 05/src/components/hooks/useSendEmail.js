import axios from "axios";

const useSendEmail = () => {
  const sendEmail = async (receiverPath, senderPath, emailData, onSuccess) => {
    try {
      // Store email in the receiver's inbox
      await axios.post(`${receiverPath}.json`, emailData);

      // Store email in the sender's sent box
      await axios.post(`${senderPath}.json`, emailData);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return sendEmail;
};

export default useSendEmail;
