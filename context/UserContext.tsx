"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useWeb3 } from "./Web3Context";
import { TOKEN_SYMBOL } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slice/loadingSlice";

// Define the type for the user context.
type UserContextType = {
  user: string | null;
  address: string | null;
  balance: string | null;
  symbol: string | null;
};

// Create a context for user data.
const UserContext = createContext<UserContextType>({
  user: null,
  address: null,
  balance: null,
  symbol: null,
});

// Custom hook for accessing user context data.
export const useUser = () => useContext(UserContext);

// Provider component that wraps parts of the app that need user context.
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Use the web3 context.
  const { web3 } = useWeb3();
  const dispatch = useDispatch();

  // Initialize user state to hold user's account information.
  const [user, setUser] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string | null>(null);

  // Function to retrieve and set user's account.
  const fetchUserAccount = async () => {
    // Use Web3 to get user's accounts.
    dispatch(setLoading(true));
    const accounts = await web3?.eth.getAccounts();

    // Update the user state with the first account (if available), otherwise set to null.
    setUser(accounts ? accounts[0] : null);
    setAddress(accounts ? accounts[0] : null);
    setSymbol(TOKEN_SYMBOL);
    dispatch(setLoading(false));
    if (accounts && accounts[0]) {
      const b = web3?.utils.fromWei(
        await web3?.eth?.getBalance(accounts[0]),
        "ether"
      );
      console.log(b);
      if (!b?.toString()) return;
      setBalance(b.toString());
    }
  };

  // Run fetchUserAccount function whenever the web3 instance changes.
  useEffect(() => {
    fetchUserAccount();
  }, [web3]);

  return (
    <UserContext.Provider
      value={{
        user: user,
        address: address,
        balance: balance,
        symbol: symbol,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
