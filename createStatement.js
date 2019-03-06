function createStatement (invoice, plays) {
    let data = {};
    data.customer = invoice.customer;
    data.performances = invoice.performances.map(enrichPerformance);
    data.totalAmount = getTotalAmount(data);
    data.totalVolumeCredits = getTotalVolumeCredits(data);
    return data;

    function enrichPerformance(perf) {
        let result = Object.assign({}, perf);
        result.play = getPlay(result);
        result.amount = getAmount(result);
        result.volumeCredits = getVolumeCredits(result);
        return result;

        function getPlay(perf) {
            return plays[perf.playID];
        }

        function getAmount(perf) {
            let thisAmount = 0;
            switch (perf.play.type) {
                case "tragedy":
                    thisAmount = 40000;
                    if (perf.audience > 30) {
                        thisAmount += 1000 * (perf.audience - 30);
                    }
                    break;
                case "comedy":
                    thisAmount = 30000;
                    if (perf.audience > 20) {
                        thisAmount += 10000 + 500 * (perf.audience - 20);
                    }
                    thisAmount += 300 * perf.audience;
                    break;
                default:
                    throw new Error(`unknown type: ${perf.play.type}`);
            }
            return thisAmount;
        }

        function getVolumeCredits(perf) {
            let volumeCredits = 0;
            volumeCredits += Math.max(perf.audience - 30, 0);
            if ("comedy" === perf.play.type) {
                volumeCredits += Math.floor(perf.audience / 5);
            }
            return volumeCredits;
        }
    }

    function getTotalAmount(data) {
        let totalAmount = 0;
        for (let perf of data.performances) {
            totalAmount += perf.amount;
        }
        return totalAmount;
    }

    function getTotalVolumeCredits(data) {
        let volumeCredits = 0;
        for (let perf of data.performances) {
            volumeCredits += perf.volumeCredits;
        }
        return volumeCredits;
    }
}

module.exports = createStatement;
