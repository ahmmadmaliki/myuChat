import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	Dimensions,
	AsyncStorage,
	Image,
	Button,
	TouchableOpacity,
	FlatList
} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import firebase from '../../config'
import { withNavigation } from 'react-navigation'
import Geolocation from 'react-native-geolocation-service';
import permission from './Permission';
import blueflag from '../../../assets/flag-blue.png'
import pinkflag from '../../../assets/flag-pink.png'
let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Maps extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isMapReady: false,
	    	region: {
	    		latitude: LATITUDE,
	        	longitude: LONGITUDE,
	        	latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
	      	},
			  users: [],
			  me:null,
			  mystatus: null,
    	};
	}     
	async componentDidMount() {
		await permission
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
        		this._getDataFriends(user.uid)
		       	Geolocation.getCurrentPosition(
			      	position => {
			        	this.setState({
			          		region: {
			            		latitude: position.coords.latitude,
			            		longitude: position.coords.longitude,
			            		latitudeDelta: LATITUDE_DELTA,
			            		longitudeDelta: LONGITUDE_DELTA,
			          		}
			        	});
			        this._updateLocation(user.uid, position.coords)
			      	},
			    	(error) => console.warn(error.message),
			    	{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
			    );
			    this.watchID = Geolocation.watchPosition(
			      	position => {
			        	this.setState({
			          		region: {
			            		latitude: position.coords.latitude,
			            		longitude: position.coords.longitude,
			            		latitudeDelta: LATITUDE_DELTA,
			            		longitudeDelta: LONGITUDE_DELTA,
			          		}
			        	});
			      	}

			    );
        	}

		})
	}
	_getDataFriends = (uid) => {
		firebase.database().ref('users').on('child_added', (result) => {
            let person = result.val();
            person.uid = result.key;
            if (person.uid !== uid) {
            	this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                });

			}
			else{
				let person=result.val()
				person.uid=result.key
				this.setState({me: person})
			}
        })
	}

	_updateLocation = (uid, location) => {
		firebase.database().ref('users/' + uid ).update({
        	region: {
        		latitude: location.latitude,
				longitude: location.longitude,
				status: 'online'
        	}
		})
		this.setState({mystatus: 'online'})
	}
	onMapLayout = () => {
		this.setState({ isMapReady: true });
	  }

	render () {
		return (
			<React.Fragment >
				<View style={styles.container}>
				<MapView
					ref={(MapView) => {_mapView = MapView}}
			        provider={ PROVIDER_GOOGLE }
			        style={ styles.maps }
			        showsUserLocation={ false }
					region={ this.state.region }
					onLayout={this.onMapLayout}
			    >
					
			        <MapView.Marker
						title="Anda"
						description={this.state.mystatus}
						image={pinkflag}
						  coordinate={ this.state.region }
			    	/>
					
			    	{
                        this.state.users.map(data => (
                            <MapView.Marker
								title={data.fullname}
								description={data.region.status}
								image={blueflag}
                                coordinate={{
                                    latitude: data.region.latitude,
                                    longitude: data.region.longitude,
                                    latitudeDelta: 0.0043,
                                    longitudeDelta: 0.0034
                                }}
								>
                                
                            </MapView.Marker>
                        ))
                    }

		    	</MapView>
					</View>
			</React.Fragment>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	  },
	maps: {
		flex: 1,
	    height: height,
	    width: width,
	    
	}
})
export default withNavigation(Maps)