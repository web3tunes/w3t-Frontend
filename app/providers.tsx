"use client";
import { ThemeProvider } from "next-themes";
import { MetaMaskProvider } from "metamask-react";
import { useDispatch, useSelector } from "react-redux";
import loadingSlice, {
  loadingState,
  setLoading,
} from "@/store/slice/loadingSlice";
import Loader from "./components/Loader";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const { loading }: any = useSelector(loadingState);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      themes={["is_light", "is_dark"]}
    >
      {loading && <Loader />}
      <MetaMaskProvider>{children}</MetaMaskProvider>
    </ThemeProvider>
  );
}
