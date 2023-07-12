
function calculate() {
    var amount = parseFloat(document.getElementById('amount').value)
    var tax = parseFloat(document.getElementById('tax').value)/100
    var interest = parseFloat(document.getElementById('interest').value)/100
    var years = parseFloat(document.getElementById('years').value) * 12
    var total = amount
    var totalInterest = 0
    var totalTax = 0
    var originalAmount = amount


    for (var i = 0; i < years; i++) {
        var currentInterest = total * (interest/12)
        var currentTax = currentInterest * tax 
        totalInterest += currentInterest
        totalTax += currentTax
        total += (currentInterest - currentTax) // Subtracts the tax from the interest before adding to the total
        console.log(totalTax)

    }
    


function formatISK(amount) {
    // Convert to a string, using a dot for the decimal separator
    let amountStr = amount.toFixed(2);

    // Split the string into the integer part and the decimal part
    let parts = amountStr.split('.');

    // Use a regular expression to insert dots for the thousands separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Return the formatted number
    return parts.join(',');
}

let totalFormatted = formatISK(total);
let interestFormatted = formatISK(totalInterest/years);
let taxFormatted = formatISK(totalTax/years);
let profit = formatISK(total - originalAmount);
let monthlyProfit = formatISK(totalInterest/years - totalTax/years);
document.getElementById('totalresult').innerHTML = "Heildarupphæð eftir " + years/12 + " ár: " + totalFormatted + "kr";
document.getElementById('interestresult').innerHTML = "meðalvextir á mánuði: " + interestFormatted + "kr";
document.getElementById('taxresult').innerHTML = "meðalskattur á mánuði: " + taxFormatted + "kr";
document.getElementById('profitresult').innerHTML = "hagnaður: " + profit + "kr";
document.getElementById('monthlyprofit').innerHTML = "hagnaður á mánuði: " + monthlyProfit + "kr";
}
document.getElementById('submit').onclick = calculate
