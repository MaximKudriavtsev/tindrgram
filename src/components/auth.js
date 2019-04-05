import * as React from 'react';
import { CLIENT_ID, APP_URL } from '../keys';

export default class Auth extends React.PureComponent {
  render() {

    return (
      <div>
        Auth
        <br />
          <a href={`https://${APP_URL}/login?response_type=token&client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/log-in`}>
          <button>
            Sign In
          </button>
          </a>
      </div>
    );
  }
}
