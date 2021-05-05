anychart.onDocumentReady(function () {

    // Cria um conjunto de dados

var dataSet = anychart.data.set(getData());

    // Mapeia dados da primeira linha

var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });

    // Mapeia dados da segunda linha

var secondSeriesData = dataSet.mapAs({ x: 0, value: 2 });

// Mapeia dados da Terceira linha

var thirdSeriesData = dataSet.mapAs({ x: 0, value: 3 });

// cria a linha do grafico

var chart = anychart.line();

 // Animação para o grafico

chart.animation(true);

// Preenchimento do grafico

chart.padding([10, 20, 5, 20]);

// Mostra a linha do eixo y que interage com o grafico

chart.crosshair().enabled(true).yLabel(false).yStroke(null);

//Tooltip

chart.tooltip().positionMode('point');

 // Titulo do grafico

chart.title(
  'Vazão da água'
);

  // Titulo dos dados na vertical

chart.yAxis().title('Volume m³');
chart.xAxis().labels().padding(5);

  // Titulo dos dados na horizontal

chart.xAxis().title('Tempo s');
chart.yAxis().labels().padding(5);


  // Legenda da primeira linha linha

var firstSeries = chart.line(firstSeriesData);
firstSeries.name('Recente');
firstSeries.hovered().markers().enabled(true).type('circle').size(6);
firstSeries
  .tooltip()
  .position('right')
  .anchor('left-center')
  .offsetX(5)
  .offsetY(5);

  // Legenda da segunda linha linha

var secondSeries = chart.line(secondSeriesData);
secondSeries.name('2 Minutos');
secondSeries.hovered().markers().enabled(true).type('circle').size(6);
secondSeries
  .tooltip()
  .position('right')
  .anchor('left-center')
  .offsetX(5)
  .offsetY(5);


  // Legenda da terceira linha linha

var thirdSeries = chart.line(thirdSeriesData);
thirdSeries.name('3 Minutos');
thirdSeries.hovered().markers().enabled(true).type('circle').size(6);
thirdSeries
  .tooltip()
  .position('right')
  .anchor('left-center')
  .offsetX(5)
  .offsetY(5);

  // Legenda

chart.legend().enabled(true).fontSize(13).padding([0, 0, 10, 0]);
chart.xScale().mode('continuous');

  // Id do grafico

chart.container('container');

 // Desenha o grafico

chart.draw();
});

function getData() {
return [
  ['60', 10, 20, 30, 40, 80, 90, 100],
  ['120', 5.1, 8, 2, 0, 0,1, 5],
  ['180', 10, 20, 30, 10, 0,9,10],
  ['240', 10, 55, 60, 40,7,9.5,4],
  ['300', 10, 90, 80, 40,0,56,8],
  ]; }

