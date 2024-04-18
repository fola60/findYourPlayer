import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  
  const [playerList,setPlayerList] = useState({});

  return (
    <DataContext.Provider value={{ playerId, setPlayerId }}>
      {children}
    </DataContext.Provider>
  );
};

