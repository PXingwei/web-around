import React from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps'
import { AroundMarker } from './AroundMarker'
import { POS_KEY} from '../constant'

class AroundMap extends  React.Component {
    reloadMarkers = () => {
        const center = this.map.getCenter();
        const location = { lat: center.lat(), lon: center.lng() };
        const range = this.getRange();
        this.props.loadNearbyPosts(location, range);
    }

    getRange = () => {
        const google = window.google;
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new google.maps.LatLng(center.lat(), ne.lng());
            return 0.001 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    }


    getMapRef = (map) => {
        this.map = map;
        window.map = map;
    }
    render() {
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        // const location ={ lat: -34.397, lng: 150.644 };

        return (
            <GoogleMap
                ref={this.getMapRef}
                onDragEnd={this.reloadMarkers}
                defaultZoom={8}
                defaultCenter={{ lat, lng: lon}}
                defaultOptions={{scaleControl: true}}
                onZoomChanged={this.reloadMarkers}
            >
                {this.props.posts.map((post) => {
                    return <AroundMarker post={post}  key={post.url}/>
                })}
            </GoogleMap>
        )
    }
}
export const WrappedAroundMap = withScriptjs(withGoogleMap((AroundMap)));