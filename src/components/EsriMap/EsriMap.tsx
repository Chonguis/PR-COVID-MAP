import * as React from 'react';
import { dojoRequire } from 'esri-loader';
import EsriLoader from 'esri-loader-react';

// export interface Props {
//     onMapViewCreated?: (mapView) => void;
// }

interface Props {
    municipalityData: {
        [key: string]: {},
    }
}

interface State {
    loaded?: boolean
}
class EsriMap extends React.Component<Props, State> {
    mapContainer;
    mapView;
    constructor(props: any) {
        super(props);
        this.state = {
            loaded: false
        }
    }
    ready() {
        this.setState({
            loaded: true
        });
    }
    createMap = () => {
        dojoRequire([
            'esri/Map', 
            'esri/views/MapView',
            'esri/widgets/Search',
            'esri/layers/FeatureLayer'], 
            (Map, MapView, Search, FeatureLayer) => {

            const searchWidget = new Search({
                view: this.mapView
            });
            const municipalitiesLayer = new FeatureLayer({
                url: 'https://services5.arcgis.com/tSRPsq29e3DI9PlH/arcgis/rest/services/limites_puerto_rico/FeatureServer',
            })

            const map = new Map({
                layers: [municipalitiesLayer],
            })

            this.mapView = new MapView({
                container: this.mapContainer,
                map: map,
            });

            this.mapView.ui.add(searchWidget, {
                position: "top-right",
                // index: 2
            });

            // this.props.onMapViewCreated(this.mapView);
        });
    }
    componentDidMount() {
        this.createMap();
    };
    render() {
        console.log(this.props.municipalityData, 'datadatadata');
        // you can omit options and it defaults to the latest version
        const options = {
            url: 'https://js.arcgis.com/4.5/'
            // url: '/arcgis_js_api/init.js'
        };
        return (
            <div style={{ height: '100%' }}>
                <EsriLoader options={options} ready={this.ready.bind(this)} />
                <div style={{ height: '100%' }} ref={node => this.mapContainer = node}></div>
            </div>
        );
    }
}

export default EsriMap;

