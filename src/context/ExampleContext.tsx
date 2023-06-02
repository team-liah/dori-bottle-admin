import React, { createContext, useCallback, useState } from 'react';

interface ExampleContextType {
  data: string;
  handleData: (_data: string) => void;
}

interface ExampleContextProps {
  children: React.ReactNode;
  initialData: string;
}

export const ExampleContext = createContext<ExampleContextType>({} as ExampleContextType);

export const ExampleProvider = (props: ExampleContextProps) => {
  const [data, setData] = useState<string>(props.initialData);

  const handleData = useCallback((_data: string) => setData(_data), []);

  return <ExampleContext.Provider value={{ data, handleData }}>{props.children}</ExampleContext.Provider>;
};
