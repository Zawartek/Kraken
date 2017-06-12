import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Loader from '../../components/Loader';
import BarCard, { List, UserCard } from '../../components/BarCard';
import UsersList from '../../components/UserList';
import UploadModal from '../../components/Modal/Upload';

import * as userManagementService from '../../services/userManagementService';


const BUTTON_STYLE = {
  fontSize: 15,
}

export default class Apprentices extends Component {

  state = {
    users: [[], [], []],
    loading: false,
    error: false,

    openDocModal: false,
    file: null,
    uploadStarted: false,
    uploadProgress: 0,
    docSelected: null,
    isValidFile: false,
  }

  componentDidMount() {
    this.requestApprentices();
  }

  requestApprentices() {
    this.setState({ loading: true });
    userManagementService.getAllApprentices()
      .then(userManagementService.filterApprenticesByYear)
      .then(users => {
        this.setState({users: users, loading: false});
      });
  }

  importApprentice = () => {
    this.setState({ openDocModal: true });
  }

  onUploadDoc = (type) => {
    this.setState({ uploadProgress: 0, uploadStarted: true });

    const { file, fileType } = this.state;

    userManagementService.createApprenticeFromCSV(file, this.onUploadProgress)
      .then(res => {
        this.closeDocModal();
      });
  }

  closeDocModal = () => {
    this.setState({
      uploadProgress: 0,
      uploadStarted: false,
      openDocModal: false,
      docSelected: null,
    });
  }

  checkSelectedFile = (file) => {
    let isValid = false;

    isValid = file == null ? false : true;
    this.setState({isValidFile: isValid});

    if(isValid) {
      this.setState({file: file});
    }
  }

  renderActions = (apprentice) => {
    return (
      <div>
        <Link to={{
          pathname: '/users/apprentices/detail',
          state: {data: apprentice}

        }}>
          <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}/>
        </Link>

        <FlatButton primary label="Supprimer"/>
      </div>
    )
  }

  renderTitle = (apprentice) => {
    return `${apprentice.user.firstName} ${apprentice.user.lastName}`;
  }

  renderSubtitle = () => {
    return "";
  }

  render() {
    const {
      loading,
      users,
      error,

      openDocModal,
      file,
      uploadStarted,
      uploadProgress,
      docSelected,
    } = this.state;

    const modalDocButtons = [
      <FlatButton
        label="Annuler"
        primary
        onTouchTap={this.closeDocModal}
      />,
      <FlatButton
        label="Déposer"
        primary
        onTouchTap={this.onUploadDoc}
        disabled={!this.state.isValidFile}
      />,
    ];

    return (
      <Loader loading={loading} error={error} >
        <RaisedButton primary label="Importer CSV" onTouchTap={this.importApprentice} style={{ marginBottom: 20 }} />
        <div className="row">
          <div className="col-4">
            <p className="sub-title">A1</p>
              <UsersList
                usersList={users[0]}
                renderActions={this.renderActions}
                title={this.renderTitle}
                subtitle={this.renderSubtitle}
                noUserLabel="Pas d'apprenti en A1"
              />
          </div>
          <div className="col-4">
            <p className="sub-title">A2</p>
            <UsersList
              usersList={users[1]}
              renderActions={this.renderActions}
              title={this.renderTitle}
              subtitle={this.renderSubtitle}
              noUserLabel="Pas d'apprenti en A2"
            />
          </div>
          <div className="col-4">
            <p className="sub-title">A3</p>
            <UsersList
              usersList={users[2]}
              renderActions={this.renderActions}
              title={this.renderTitle}
              subtitle={this.renderSubtitle}
              noUserLabel="Pas d'apprenti en A3"
            />
          </div>
        </div>
        <UploadModal
          title="Import CSV"
          open={openDocModal}
          actions={modalDocButtons}
          uploadProgress={uploadProgress}
          uploading={uploadStarted}
          onSelectFile={file => this.checkSelectedFile(file)}
          file={docSelected}
          acceptedType='.csv'
        />
      </Loader>
    )
  }
}
