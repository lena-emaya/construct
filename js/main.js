mapboxgl.accessToken = 'pk.eyJ1IjoieWFjb25zdHJ1Y3QiLCJhIjoiY2l6NDFpN3k1MDAyZjJxbHdhcHU2eHQ0ZyJ9.8TtgxnHPThgkyXRDGGYMlQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/yaconstruct/cj2vowkhe00172rjumnajhao1',
  zoom: 8,
  center: [37.634, 55.742]
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


  map.addLayer({
    'id': 'World choropleth',
    'type': 'fill',
    'maxzoom': 5,
    'source': 'stray_polygon',
    'paint': {
      'fill-antialias': true,
      'fill-color': {
        property: 'classify',
        stops: [
          [1, '#F9F8EB'],
          [2, '#7A9EB1'],
          [3, '#415865'],
          [4, '#F9F8EB'],
          [5, '#7A9EB1']
        ]
      },
      'fill-outline-color': '#FFFFFF',
      'fill-opacity': 0.6
    }
  });


  map.addLayer({
    'id': 'World points',
    'type': 'circle',
    'maxzoom': 5,
    'source': 'stray_point',
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
      'fill-opacity': 0.6
    }
  });


  map.addLayer({
    'id': 'Local points',
    'type': 'circle',
    'minzoom': 5,
    'source': 'local_point',
    'paint': {
      'circle-radius': {
        'stops': [[5, 1], [22, 8]]
      },
      'circle-color': '#ff3333',
      'circle-opacity': 1,
      'circle-stroke-width': {
        'stops': [[5, 0.1], [22, 3]]
      },
      'circle-stroke-color': '#FFFFFF',
      'circle-stroke-opacity': 0.65
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







  var toggleableLayerIds = ['World points', 'World choropleth', 'Local points','Local choropleth'];

  for (var k = 0; k < toggleableLayerIds.length; k++) {
    var id = toggleableLayerIds[k];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
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


var toggleLayerIds = [ 'Vegetation'];

for (var k = 0; k < toggleLayerIds.length; k++) {
    var id = toggleLayerIds[k];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickLayer, 'visibility', 'visible');
        }
    };

    var layers1 = document.getElementById('menu1');
    layers1.appendChild(link);
}







// map.on('click', function() {
//
//
//         var bounds = coordinates.reduce(function(bounds, coord) {
//             return bounds.extend(coord);
//         }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
//
//         map.fitBounds(bounds, {
//             padding: 20
//         });
// });


// toggleLayer(['World points'], 'World points');
// toggleLayer(['World markers'], 'World markers');
// toggleLayer(['World choropleth'], 'World choropleth');
// // toggleLayer(['aero_1', 'aero_1_1', 'aero_2', 'aero_2_2','aero_3', 'aero_3_3','aero_4', 'aero_4_4',], 'Сhoropleth1');
//
// function toggleLayer(ids, name) {
//     var link = document.createElement('a');
//     link.href = '#';
//     link.className = 'active';
//     link.textContent = name;
//
//     link.onclick = function (e) {
//         e.preventDefault();
//         e.stopPropagation();
//         for (layers in ids){
//             var visibility = map.getLayoutProperty(ids[layers], 'visibility');
//
//             if (visibility === 'visible') {
//                 map.setLayoutProperty(ids[layers], 'visibility', 'none');
//                 this.className = '';
//
//             } else {
//                 this.className = 'active';
//                 map.setLayoutProperty(ids[layers], 'visibility', 'visible');
//
//             }
//          }
//
//     };
//
//     var layers = document.getElementById('menu');
//     layers.appendChild(link);
// }
//
// ;
