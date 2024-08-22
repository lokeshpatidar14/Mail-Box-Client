import axios from "axios";

const useDeleteEmail = (emailPath) => {
  const deleteEmail = async (id, setEmails) => {
    try {
      await axios.delete(`${emailPath}/${id}.json`);
      setEmails((prevEmails) => prevEmails.filter((email) => email.id !== id));
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  return deleteEmail;
};

export default useDeleteEmail;
