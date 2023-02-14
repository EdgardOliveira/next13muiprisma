import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface ISidebarOptions {
  label: string;
  url: string;
  icon: string;
}

interface ISidebarContextData {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  sidebarOptions: ISidebarOptions[];
  setSidebarOptions: (newSidebarOptions: ISidebarOptions[]) => void;
}

const SidebarContext = createContext({} as ISidebarContextData);

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

interface ISidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: ISidebarProviderProps) => {
  const [sidebarOptions, setSidebarOptions] = useState<ISidebarOptions[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((oldSidebarOpen) => !oldSidebarOpen);
  }, []);

  const handleSetSidebarOptions = useCallback(
    (newSidebarOptions: ISidebarOptions[]) => {
      setSidebarOptions(newSidebarOptions);
    },
    []
  );

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        sidebarOptions,
        toggleSidebar,
        setSidebarOptions: handleSetSidebarOptions,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
