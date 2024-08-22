import { useState, useEffect } from "react";
import axios from "axios";

const useFetchEmails = (emailPath) => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(emailPath);

        if (response.data) {
          const emailsArray = Object.entries(response.data).map(
            ([key, value]) => ({
              id: key,
              ...value,
            })
          );
          setEmails(emailsArray);
        } else {
          setEmails([]);
        }
      } catch (error) {
        setError(error.response?.data || error.message);
      }
    };

    fetchEmails();
    const intervalId = setInterval(fetchEmails, 2000); // Polling every 2 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [emailPath]);

  return { emails, setEmails, error };
};

export default useFetchEmails;
