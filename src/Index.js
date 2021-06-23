// Aumenta o tamanho da fonte do grafico
var dat={}
var vazao ={}
var data= [5.5,45.857,99.1,57.9,85.3]
var labels = ['27/05/2021 10:05:05','27/05/2021 10:05:05','27/05/2021 10:05:05','27/05/2021 10:05:05','27/05/2021 10:05:05']

Chart.defaults.font.size = 16;
Chart.defaults.color='#000000';
var ctx = document.getElementById('vazao').getContext('2d');
var vazao = new Chart(ctx, {
    type: 'line',
    data: {
    labels: labels,
    datasets: [{
        label: 'Vazão',
        data: data,
        backgroundColor: [
            'rgba(0,0,205)',
            'rgba(30,144,255)',
            'rgba(30,144,255)',
            'rgba(30,144,255)',
            'rgba(30,144,255)'
        ],
        borderColor: [
            'rgba(0,0,205)',
            'rgba(30,144,255)',
            'rgba(30,144,255)',
            'rgba(30,144,255)',
            'rgba(30,144,255)'
        ],
        borderWidth: 5,
    }],
},
options: {
    responsive: true,
    scales: {
        y: {
            beginAtZero: false,
        },
        x:{
            beginAtZero: false,
        },
    },
    plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Vazão'
        }
      }
}
});
    