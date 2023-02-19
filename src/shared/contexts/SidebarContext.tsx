import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface ISidebarContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext({} as ISidebarContextProps);

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

interface ISidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: ISidebarProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((oldSidebarOpen) => !oldSidebarOpen);
  }, []);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
