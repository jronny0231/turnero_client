import { useState } from "react";
import { getLocalStorage, setLocalStorage, stateType } from "../store/localStorage";

export const useLocalStorage = (key: string, defaultValue: any|null) => {

  const [storedValue, setStoredValue] = useState(() => {

    // Obtener valor actual en el localStorage
    const value: stateType = getLocalStorage(key);

    if(value){
      return value;

    } else {

      // Setear defaultValue al localStorage
      if(setLocalStorage(key, defaultValue)){
        return getLocalStorage(key)
      }

      return defaultValue;
    }
    

  });

  const setValue = (newValue: stateType) => {

    // Setear el newValue en el localstorage
    setLocalStorage(key, newValue);

    // Setear el newValue en el state
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};