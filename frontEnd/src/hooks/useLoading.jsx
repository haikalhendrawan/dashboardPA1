import { useMemo, useState, createContext, useContext } from 'react';

const LoadingContext = createContext();

const LoadingProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false)

  return(
    <LoadingContext.Provider value={{isLoading, setIsLoading}}>
      {children}
    </LoadingContext.Provider>
  )
}

const useLoading = () => {
  return(useContext(LoadingContext))
}

export default useLoading;
export {LoadingProvider};