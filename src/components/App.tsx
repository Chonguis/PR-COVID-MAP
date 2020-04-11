import * as React from 'react';
import './App.css';
import EsriMap from './EsriMap/EsriMap';
import data from './abril9';

class App extends React.Component {
  render() {
    console.log(data);
    let municipalitiesData = data;
    let municipalityByName = {};
    municipalitiesData.forEach(municipality => {
      municipalityByName[municipality.municipality] = municipality;
    });
    console.log(municipalityByName, 'municipalityByName');
    return (
      <div className="App-container">
        <EsriMap municipalityData={municipalityByName} />
      </div>
    )
  }
}

export default App;
