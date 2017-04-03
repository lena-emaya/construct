mapboxgl.accessToken = 'pk.eyJ1IjoibGVuYWVtYXlhIiwiYSI6ImNpa3VhbXE5ZjAwMXB3eG00ajVyc2J6ZTIifQ.kmZ4yVcNrupl4H8EonM3aQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lenaemaya/cj0jfr25700j22spbd6ifg5z1',
    zoom: 8,
    center: [37.634,55.742]
});




var layerList = document.getElementById('menumap');
var inputs = layerList.getElementsByTagName('input');
function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/lenaemaya/' + layerId);
}
for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}


map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {
  map.addSource('stray_point', {
      type: 'point',
      data: './stray_point.geojson'
  });
  map.addLayer({
      'id': 'stray_point',
      'type': 'circle',
      'source': 'stray_point',
      'source-layer': 'stray_point',
      'layout': {
          'visibility': 'visible'
      },
      'paint': {
          'circle-radius': 8,
          'circle-color': 'rgba(55,148,179,1)'
      },
  });


toggleLayer(['Dots'], 'Markers');
toggleLayer(['p_1', 'p_2', 'p_3','p_4'], 'Classified markers');
toggleLayer(['Cartogram_1', 'Cartogram_2', 'Cartogram_3', 'Cartogram_4'], 'Сhoropleth');
toggleLayer(['aero_1', 'aero_1_1', 'aero_2', 'aero_2_2','aero_3', 'aero_3_3','aero_4', 'aero_4_4',], 'Сhoropleth1');

function toggleLayer(ids, name) {
    var link = document.createElement('a');
    link.href = '#';
    // link.className = 'active';
    link.textContent = name;

    link.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        for (layers in ids){
            var visibility = map.getLayoutProperty(ids[layers], 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty(ids[layers], 'visibility', 'none');
                this.className = '';

            } else {
                this.className = 'active';
                map.setLayoutProperty(ids[layers], 'visibility', 'visible');

            }
         }

    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}
});



map.on('load', function () {
  map.on('zoom', function (){
    var x = map.getZoom()
    document.getElementById('panelzoom').innerHTML = '<p>Current zoom</p>'+ (Number(x).toFixed(1));
  });
});
