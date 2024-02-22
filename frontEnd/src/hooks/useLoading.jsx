import { useMemo, useState, createContext, useContext } from 'react';

const LoadingContext = createContext();

const LoadingProvider = ({children}) => {
  const [isloading, setLoading] = useState(false)

  return(
    <LoadingContext.Provider value={{isloading, setLoading}}>
      {children}
    </LoadingContext.Provider>
  )
}

const useLoading = () => {
  return(useContext(LoadingContext))
}

export default useLoading;
export {LoadingProvider};