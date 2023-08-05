import authenticationRouteDocs from './authnentication.docs';
import basicInfo from './basicInfo';
import confirmEmailRoute from './emailVerificatio.docs';
import userRouteDocs from './user.docs';
import welcomeRouteDocs from './welcome.docs';

export default {
  ...basicInfo,
  paths: {
    ...welcomeRouteDocs,
    ...authenticationRouteDocs,
    ...confirmEmailRoute,
    ...userRouteDocs,
  },
};
