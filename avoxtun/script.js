var myChart; // Declare myChart as a global variable

function formatIcelandic(amount) {
    let amountStr = amount.toFixed(2);
    let parts = amountStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',');
}
function formatISK(amount) {
  const suffixes = ['', 'þúsund', 'milljón', 'milljarður', 'billjón', 'billjarður', 'trilljón', 'trilljarður', 'kvadrilljón', 'kvadrilljarður'];
  let suffixIndex = 0;
  let originalAmount = amount;

  while (amount >= 1000 && suffixIndex < suffixes.length - 1) {
    amount /= 1000;
    suffixIndex++;
  }
  let amountStr = amount.toFixed(2);
  let parts = amountStr.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
//   formattedAmount
  const integerPart = Math.floor(amount).toLocaleString('is-IS');
  const decimalPart = (amount % 1).toFixed(3).substring(2).replace('.', ',');
//   const formattedAmount = integerPart + '.' + decimalPart;
const formattedAmount =   parts.join(',');

  const textAmount = formattedAmount + ' ' + suffixes[suffixIndex];
  const fullAmountText = formatIcelandic(originalAmount) + 'kr (' + textAmount + ')';
  return fullAmountText;
}

function calculate() {
  var amount = parseFloat(document.getElementById('amount').value);
  var tax = parseFloat(document.getElementById('tax').value) / 100;
  var interest = parseFloat(document.getElementById('interest').value) / 100;
  var years = parseFloat(document.getElementById('years').value) * 12;
  var total = amount;
  var totalInterest = 0;
  var totalTax = 0;
  var originalAmount = amount;
  var taxValues = [];
  var interestValues = [];
  var totalValues = [];
  var differenceValues = [];
  var difference = 0;
  if (isNaN(amount) || isNaN(tax) || isNaN(interest) || isNaN(years)) {
    return;
  }
  for (var i = 0; i < years; i++) {
    difference = total;
    var currentInterest = total * (interest / 12);
    var currentTax = currentInterest * tax;
    totalInterest += currentInterest;
    totalTax += currentTax;
    total += currentInterest - currentTax;
    difference = total - difference;
    differenceValues.push(difference);
    taxValues.push(totalTax);
    interestValues.push(totalInterest);
    totalValues.push(total);
  }

  var ctx = document.getElementById('myChart').getContext('2d');

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [...Array(years).keys()].map(i => i + 1),
      datasets: [{
        label: 'skattur',
        data: taxValues,
        borderColor: 'rgb(255, 99, 132)',
        fill: false
      }, {
        label: 'Vextir',
        data: interestValues,
        borderColor: 'rgb(54, 162, 235)',
        fill: false
      }, {
        label: 'Heildarupphæð',
        data: totalValues,
        borderColor: 'rgb(75, 192, 192)',
        fill: false
      }, {
        label: 'Hagnaður',
        data: differenceValues,
        borderColor: 'rgb(255, 206, 86)',
        fill: false
      }]
    },
    options: {
      // responsive: true,
      title: {
        display: true,
        text: 'Financial Overview'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Mánuðir'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'upphæð'
          },
          ticks: {
            callback: function (value) {
              return formatISK(value);
            }
          }
        }
      }
    }
  });

  let totalFormatted = formatISK(total);
  let interestFormatted = formatISK(totalInterest / years);
  let taxFormatted = formatISK(totalTax / years);
  let profit = formatISK(total - originalAmount);
  let monthlyProfit = formatISK(totalInterest / years - totalTax / years);
  let totalTaxFormatted = formatISK(totalTax);

  document.getElementById('totalresult').innerHTML = "Heildarupphæð eftir " + years / 12 + " ár: " + totalFormatted;
  document.getElementById('interestresult').innerHTML = "meðalvextir á mánuði: " + interestFormatted;
  document.getElementById('taxresult').innerHTML = "meðalskattur á mánuði: " + taxFormatted;
  document.getElementById('profitresult').innerHTML = "heildar hagnaður: " + profit;
  document.getElementById('monthlyprofit').innerHTML = "hagnaður á mánuði: " + monthlyProfit;
  document.getElementById('totaltax').innerHTML = "heildar skattur: " + totalTaxFormatted;
}

// document.getElementById('submit').onclick = calculate;
document.getElementById('amount').onchange = calculate;
document.getElementById('tax').onchange = calculate;
document.getElementById('interest').onchange = calculate;
document.getElementById('years').onchange = calculate;
window.onload = calculate;
