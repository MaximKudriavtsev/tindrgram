import * as React from 'react';
import checkCookie from '../utils/check-cookie';
import Auth from './auth';

export default class Home extends React.PureComponent {
  render() {
    const userData = checkCookie('userData');

    console.log(userData);

    return (
      <div>
        Home
        {userData ? (
          `Hello ${userData.name} | ${userData.email}`
        ) : (
          <React.Fragment>
            Please authorize!
            <Auth />
          </React.Fragment>
        )}
      </div>
    );
  }
}
