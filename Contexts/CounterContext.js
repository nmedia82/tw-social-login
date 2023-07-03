import React, { createContext, useState } from "react";

export const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
  const [counters, setCounters] = useState([]);

  const updateCounters = (updatedCounters) => {
    setCounters(updatedCounters);
  };

  return (
    <CounterContext.Provider value={{ counters, updateCounters }}>
      {children}
    </CounterContext.Provider>
  );
};
