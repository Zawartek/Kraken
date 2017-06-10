import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import BarCard, { UserCard, List } from '../../BarCard';
import Loader from '../../Loader';

import * as userManagementService from '../../../services/userManagementService';

const CONTENT_STYLE = {
	margin: '0 auto',
	marginTop: 60,
	fontWeight: 'normal',
}

const BUTTON_STYLE = {
  fontSize: 15,
}

const DATE = {
	currentYear: new Date().getFullYear(),
	currentMonth: new Date().getMonth()
}

class ApprenticeList extends Component {

	state = {
		apprenticeList: [[],[],[]],
		loadingApprentices: false,
		errorApprentices : false,
	}

	componentDidMount() {
	    if (this.props.tutor==null) {
		     this.getAllApprentices();
	    }
	    else {
		     this.requestAllApprenticesFromTutor();
	    }
	}

	getAllApprentices = () => {
		this.setState({ loadingApprentices: true });

    	userManagementService.getAllApprentices()
        .then(userManagementService.filterApprenticesByYear)
	  		.then(list => {
	  			this.setState({
	          		apprenticeList: list,
	        		loadingApprentices: false
	        	});
	    	})
	    	.catch(err => {
		      this.setState({ loadingApprentices: false, errorApprentices: true });
	    })

    }

    requestAllApprenticesFromTutor = () => {
  		this.setState({ loadingApprentices: true });

      	userManagementService.getAllApprenticesFromTutor(this.props.tutor)
          .then(userManagementService.filterApprenticesByYear)
      		.then(list => {
      			this.setState({
              apprenticeList: list,
              loadingApprentices: false
            });
        	})
        	.catch(err => {
  		      this.setState({ loadingApprentices: false, errorApprentices: true });
  		    })
      }

    viewApprenticeDetails = (user) => {
    	this.setState({ selectedApprentice: user });
    }

	render() {

		const {apprenticeList, loadingApprentices, errorApprentices} = this.state;

		return (
			<div className="row" style={CONTENT_STYLE}>
				<div className="col-4">
					<p className="sub-title">A1</p>
					<Loader loading={loadingApprentices} error={errorApprentices}>
			          <List data={apprenticeList[0]} emptyLabel="Aucun apprenti A1 trouvé">
			            {
			              apprenticeList[0].map(data => {

			                return (
			                  <BarCard key={data.id} actions={
			                      <Link to={{
			                  		pathname: '/users/apprentices/detail',
			                  		state: {data: data}
			                  	
			                  	}}>
			                      <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
			                        onTouchTap={(e) => this.viewApprenticeDetails(data)}
			                      />
			                      </Link>
			                    }>

			                    <UserCard title= {
			                    	<span>{data.user.firstName} {data.user.lastName}</span>
			                    }
			                    />
			                  </BarCard>
			                )
			              })
			            }
			          </List>
			        </Loader>

				</div>
				<div className="col-4">
					<p className="sub-title">A2</p>
					<Loader loading={loadingApprentices} error={errorApprentices}>
			          <List data={apprenticeList[1]} emptyLabel="Aucun apprenti A2 trouvé">
			            {
			              apprenticeList[1].map(data => {

			                return (
			                  <BarCard key={data.id} actions={
			                      <Link to={{
			                  		pathname: '/users/apprentices/detail',
			                  		state: {data: data}
			                  	
			                  	}}>
			                      <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
			                        onTouchTap={(e) => this.viewApprenticeDetails(data)}
			                      />
			                      </Link>
			                    }>

			                    <UserCard title= {
			                    	<span>{data.user.firstName} {data.user.lastName}</span>
			                    }
			                    />
			                  </BarCard>
			                )
			              })
			            }
			          </List>
			        </Loader>

				</div>
				<div className="col-4">
					<p className="sub-title">A3</p>
					<Loader loading={loadingApprentices} error={errorApprentices}>
			          <List data={apprenticeList[2]} emptyLabel="Aucun apprenti A3 trouvé">
			            {
			              apprenticeList[2].map(data => {
			                return (
			                  <BarCard key={data.id} actions={
			                      <Link to={{
			                  		pathname: '/users/apprentices/detail',
			                  		state: {data: data}
			                  	
			                  	}}>
			                      <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
			                        onTouchTap={(e) => this.viewApprenticeDetails(data)}
			                      />
			                      </Link>
			                    }>

			                    <UserCard title= {
			                    	<span>{data.user.firstName} {data.user.lastName}</span>
			                    }
			                    />
			                  </BarCard>
			                )
			              })
			            }
			          </List>
			        </Loader>
				</div>
			</div>
		)
	}
}

export default ApprenticeList;
