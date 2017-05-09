import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';
import Banner from '../components/Banner';


import * as authService from '../services/authService';

const BACKGROUND_STYLE = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
}

const LOGIN_STYLE = {
  maxWidth: 400,
  margin: 30,
}

const TITLE_LOGIN_STYLE = {
  margin: "10px",
}

const INPUT_LOGIN_STYLE = {
  padding: "16px 24px",
}

class Login extends Component {

  state = {
    username: 'eee',
    password: '1244',
  }

  handleClick = () => {
    const { username, password } = this.state;
    authService.login(username, password).then(res => {
      this.props.history.push('/');
    }).catch(err => {
      console.log(err.message);
    })
  }

  render() {
    const error = false;
    return (
      <div>
        <Banner>
          <div style={BACKGROUND_STYLE}>
            <div style={LOGIN_STYLE}>
              <Card zDepth={3}>
                <CardText style={INPUT_LOGIN_STYLE}>
                  <h1 className="primary-color center" style={TITLE_LOGIN_STYLE}>GCFA</h1>
                  <TextField
                    hintText="Nom d'utilisateur"
                    onChange={(e) => this.setState({ username: e.target.value })}
                    fullWidth
                    />
                  <TextField
                    type="password"
                    hintText="Mot de passe"
                    errorText={error && "This field is required."}
                    onChange={(e) => this.setState({ password: e.target.value })}
                    fullWidth
                    />
                </CardText>
                <CardActions style={{ textAlign: 'center' }}>
                  <FlatButton
                    secondary
                    label="Connexion"
                    labelPosition="after"
                    icon={<ActionLockOpen />}
                    onTouchTap={this.handleClick}
                    />
                  <FlatButton href="http://moncompte.isep.fr" label="Mot de passe oublié" />
                </CardActions>
              </Card>
            </div>
          </div>
        </Banner>
      </div>
    );

  }
}

export default Login;
