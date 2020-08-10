import React from 'react';

import { AuthContext } from './core/Context'
import { MainTabScreens, LoginStackScreens } from './navigations';
import { IndicatorScreen } from './screens/OtherScreens';


const IndexScreens = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setUserToken("fgjk");
      setIsLoading(false);
    },
    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    signUp: () => {
      setUserToken("fgjk");
      setIsLoading(false);
    },
  }) ,[]);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [])

  if (isLoading) {
    return (<IndicatorScreen />)
  }
  else {
    return (
      <AuthContext.Provider value={authContext}>
        {userToken != null ? (<MainTabScreens />) : (<LoginStackScreens />)}
      </AuthContext.Provider>
    )
  }
}

export default IndexScreens;
