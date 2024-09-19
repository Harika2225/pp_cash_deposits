import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const url = `${process.env.REACT_APP_RAILS_BACKEND}/user_id/current_user_id`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCurrentUserId(data.user_id);
      } catch (error) {
        console.error("Failed to fetch current user ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUserId();
  }, []);

  // added a loader
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ currentUserId }}>
      {children}
    </UserContext.Provider>
  );
};
