const createStatement = require('./createStatement');

function statement (invoice, plays) {
  return renderPlainText(createStatement(invoice, plays));
}

function renderPlainText (data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${formatUSD(perf.amount)} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${formatUSD(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;

  function formatUSD(number) {
    return new Intl.NumberFormat("en-US",
        {
          style: "currency", currency: "USD",
          minimumFractionDigits: 2
        }).format(number / 100);
  }
}

module.exports = statement;
