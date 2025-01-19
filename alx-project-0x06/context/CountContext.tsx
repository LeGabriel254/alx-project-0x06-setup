import { createContext, useContext, useState, ReactNode } from "react";

//The shape of the context value using an interface.
interface CountContextProps {
  count: number; // The current count value.
  increment: () => void; // Function to increase the count.
  decrement: () => void; // Function to decrease the count.
}

// A context with an initial value of `undefined`.
// This allows us to handle cases where the context is used outside of its provider.
export const CountContext = createContext<CountContextProps | undefined>(undefined);

// Created a provider component to supply the context value to child components.
export const CountProvider = ({ children }: { children: ReactNode }) => {
  // State to manage the count value.
  const [count, setCount] = useState<number>(0);

  // Function to increment the count.
  const increment = () => setCount((count) => count + 1);

  // Function to decrement the count, ensuring it doesn't go below 0.
  const decrement = () => setCount((count) => (count > 0 ? count - 1 : 0));

  return (
    // Provide the count, increment, and decrement functions to the context.
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  );
};

// Custom hook to access the CountContext.
export const useCount = () => {
  // Access the context value using useContext.
  const context = useContext(CountContext);

  // Throw an error if the hook is used outside the CountProvider.
  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }

  // Return the context value to the component.
  return context;
};
