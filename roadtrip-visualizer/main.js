import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import {Circle, Fill, Stroke, Style} from 'ol/style';

import background from './background';

const confdir="/examples/florida/"

fetch(confdir+"config.json").then((request)=>request.json()).then((config)=>{
  config = {...{view:{center:[0,0], zoom:0}, trips:[]}, ...config}

  const view = new View({
    center: config.view.center,
    zoom: config.view.zoom
  })

  const layers = [
    background
  ]

  for(let trip in config.trips){
    trip = {...{}, ...config.trips[trip]}
    const style = [
      new Style({
        stroke: new Stroke({
          color: [255,255,255,1],
          width: trip.width+2,
        }),
      }),
      new Style({
        stroke: new Stroke({
          color: trip.color,
          width: trip.width,
        }),
      })
    ]
    for(let file in trip.files){
      file = trip.files[file]
      layers.push(new VectorLayer({
        source: new VectorSource({
          url: confdir+file,
          format: new GeoJSON(),
        }),
        style: style,
      }));
    }
  }

  const map = new Map({
    target: 'map',
    layers,
    view
  });
})



