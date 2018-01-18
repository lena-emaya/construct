mapboxgl.accessToken = 'pk.eyJ1IjoibW9zY293Y2l0eW1hcCIsImEiOiJjajc3ZnQ1aGUxem41MzNudXU3MnBnZDA2In0.akDBtVzE-R3FgVs64ObGLg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/moscowcitymap/cjcg6vzz93pez2sobx2br0obs',
  zoom: 13,
  center: [37.560147, 55.745279]
});

map.addControl(new mapboxgl.NavigationControl());





map.on('load', function () {
  map.on('zoom', function () {
    var x = map.getZoom();
    document.getElementById('panelzoom').innerHTML = '<p>Current zoom</p>' + (Number(x).toFixed(1));
  });








  map.addSource('stray_point', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/lena-emaya/construct/master/stray_point.geojson'
  });
  map.addSource('stray_polygon', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/lena-emaya/construct/master/stray_polygon.geojson'
  });
  map.addSource('local_point', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/lena-emaya/construct/master/local_point2.geojson'
  });
  map.addSource('world_dot', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/lena-emaya/construct/master/world_dot.geojson'
  });
  map.addSource('local_choropleth', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/lena-emaya/construct/master/local_choropleth.geojson'
  });

  map.addSource('PTAL', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/lena-emaya/construct/master/ptal_hex100.geojson'
  });

  map.addSource('Velo', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/lena-emaya/construct/master/velo.geojson'
  });


  map.addLayer({
    'id': 'Cycleways',
    'type': 'line',
    'minzoom': 10,
    'source': 'Velo',
    'layout': {
      'visibility': 'none',
      "line-join": "round",
      "line-cap": "round"
    },
    'paint': {
      "line-color": "#F52677",
      "line-width": 1.3
    }
  });



  map.addLayer({
    'id': 'PTAL',
    'type': 'fill',
    'minzoom': 10,
    'source': 'PTAL',
    'paint': {
      'fill-antialias': true,
      'fill-color': {
        property: 'ptal_score',
        stops: [
          [2, '#616389'],
          [3, '#B46486'],
          [4, '#FD6B78'],
          [5, '#FD846F'],
          [6, '#FC9168']
        ]
      },
      'fill-outline-color': '#FFFFFF',
      'fill-opacity': 0.6
    }
  });

  // map.addLayer({
  //   'id': 'World choropleth',
  //   'type': 'fill',
  //   'maxzoom': 5,
  //   'source': 'stray_polygon',
  //   'paint': {
  //     'fill-antialias': true,
  //     'fill-color': {
  //       property: 'classify',
  //       stops: [
  //         [1, '#F9F8EB'],
  //         [2, '#7A9EB1'],
  //         [3, '#415865'],
  //         [4, '#F9F8EB'],
  //         [5, '#7A9EB1']
  //       ]
  //     },
  //     'fill-outline-color': '#FFFFFF',
  //     'fill-opacity': 0.6
  //   }
  // });

  map.addLayer({
    'id': 'World points',
    'type': 'circle',
    'maxzoom': 5,
    'source': 'stray_point',
    'layout': {
      'visibility': 'none'
    },
    'paint': {
      'circle-radius': {
        property: 'class',
        stops: [
          [1, 1],
          [2, 2],
          [3, 6],
          [4, 4],
          [5, 3]
        ]
      },
      'circle-color': '#FF667F',
      'circle-opacity': 1,
      'circle-stroke-width': 0.5,
      'circle-stroke-color': '#FFFFFF',
      'circle-stroke-opacity': 0.35
    }
  });

  // map.addLayer({
  //   'id': 'World markers',
  //   'type': 'symbol',
  //   'source': 'world_dot',
  //   'layout': {
  //     'icon-image': 'marker_test',
  //     'icon-size': 0.4
  //   }
  // });
  // map.addLayer({
  //   'id': 'Local points',
  //   'type': 'symbol',
  //   'source': 'local_point',
  //   'layout': {
  //     'icon-image': 'marker_test',
  //     'icon-size': 0.45
  //   }
  // });
  map.addLayer({
    'id': 'Local choropleth',
    'type': 'fill',
    'source': 'local_choropleth',
    'layout': {
      'visibility': 'none'
    },
    'minzoom': 6,
    'paint': {
      'fill-antialias': true,
      'fill-color': {
        property: 'class',
        stops: [
          [1, '#FF6619'],
          [2, '#FFD919'],
          [3, '#FF9919']
        ]
      },
      'fill-outline-color': '#fff',
      'fill-opacity': 0.4
    }
  });


  map.addLayer({
    'id': 'Local points',
    'type': 'circle',
    'minzoom': 5,
    'source': 'local_point',
    'layout': {
      'visibility': 'none'
    },
    'paint': {
      'circle-radius': {
        'stops': [[5, 1], [22, 8]]
      },
      'circle-color': '#B46486',
      'circle-opacity': 1,
      'circle-stroke-width': {
        'stops': [[5, 0.1], [22, 3]]
      },
      'circle-stroke-color': '#FFFFFF',
      'circle-stroke-opacity': 0.75
    }
  });

  var toggleableLayerIds = ['Cycleways', 'PTAL', 'Local points','Local choropleth'];

  for (var k = 0; k < toggleableLayerIds.length; k++) {
    var id = toggleableLayerIds[k];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'visible';
    link.textContent = id;

    link.onclick = function (e) {
      var clickedLayer = this.textContent;
      e.preventDefault();
      e.stopPropagation();

      var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

      if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';

      } else {
        this.className = 'active';
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');

      }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
  }



});
  // var layerList = document.getElementById('menumap');
  // var inputs = layerList.getElementsByTagName('input');
  //
  // function switchLayer(layer) {
  //   var layerId = layer.target.id;
  //   map.setStyle('mapbox://styles/lenaemaya/' + layerId);
  // }
  //
  // for (var i = 0; i < inputs.length; i++) {
  //   inputs[i].onclick = switchLayer;
  // }


//   map.on('click', function (e) {
//
//     var features1 = map.queryRenderedFeatures(e.point, { layers: ['Local points'] });
//     console.log(features1);
//     }
// );
