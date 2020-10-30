import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const { default: Navi } = require('../navi/Navi');

function App(props) {
	return (
		<Container>
			<Navi />
			{props.isAuthenticated ? <h3>You got it boi</h3> : <h3>Just click the fucking login button</h3>}
			{/* <Switch>
				<Route exact path={[ '/', '/products' ]} component={Dashboard} />
			</Switch> */}
		</Container>
	);
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.authReducer
	};
}

export default connect(mapStateToProps)(App);
