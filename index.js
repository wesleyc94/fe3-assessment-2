//Gebaseerd op code van https://bl.ocks.org/mbostock/3885304 van Mike Bostocks, 
//ook met hulp van https://github.com/cmda-fe3/course-17-18/tree/master/site/class-4/axis van Titus Wormer. (Werkcolleges + Lesmateriaal)
//De data komt van de CBS, Centraal Bureau voor Statistiek. Original link to dataset: http://statline.cbs.nl/Statweb/publication/?DM=SLEN&PA=82044eng&D1=1,12&D2=1-10&D3=0-9,13-17&LA=EN&HDR=T&STB=G1,G2&VW=T
//

var margin = { top: 20, right: 20, bottom: 30, left: 100 },
    width = 750 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Hieronder worden de grootte van de kaart in kaart gebracht door middel van de scaleBand functie.
var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);
// Met scaleLieaner worden de ranges bepaald van het grafiek.
var y = d3.scaleLinear()
    .range([height, 0]);
//De Axes worden hier gedefineerd zodat d3 die vervolgens kan gebruiken om een referentie te geven aan de scales.
var xAxis = d3.axisBottom(x)
var yAxis = d3.axisLeft(y)

//Hieronder is de body geselecteerd door de d3.select en geef hier een svg aan mee. Tijdens deze creatie worden en attributen aan mee gegeven
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//De ruwe data komt uit het index.txt bestand. De ruwe data is vervolgens weer gecleaned door het goed te parsen, door een stuk weg te knippen, 
// niet zo zeer een echte inleiding maar wel regels die boven de data staat. In de data worden punt komma's vervangen door kommas zodat deze gelezen worden.
d3.text('index.txt')
    .mimeType('text/plain;charset=iso88591')
    // function(d) {
    .get(onload);

//In dit gedeelte maak ik de data schoon door de header te laten zoeken naar het stukje "Less".
//Bij de footer zoek ik naar het woord statistics en haal ik de 4 vier letters die ervoor staan eruit, dit betreft het speciale teken.
function onload(err, doc) {
    if (err) {
        throw err
    }
    var header = doc.indexOf('"Less')
    var footer = doc.indexOf('Statistics') - 4
    doc = doc.substring(header, footer).trim()
    var data = d3.csvParseRows(doc, map)
    console.log(data)
    // In de map functie verander ik waardes van strings naar nummers.
    function map(d) {
        return {
            year: Number(d[1]),
            number: Number(d[2])
        }

    }
    //Bij dit stukje worden de range van de data aangepast.
    x.domain(data.map(function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { console.log(d.number); return d.number; })]);

    //Hieronder worden er verschillende attributen aan een (svg) groep meegegeven, dit gedeelte is bedoeld voor de X as.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    //Hieronder worden er verschillende attributen aan een (svg) groep meegegeven, dit gedeelte is bedoeld voor de Y as.
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text");

    //In dit gedeelte worden alle bar elementen geselecteerd en attributen meegegeven.
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.year); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.number); })
        .attr("height", function(d) { return height - y(d.number); });

    // Dit is een stukje code uit het voorbeeld dat in de les werd vertoond. 
    // De code is oorsponkelijk van Titus Wormer en heb ik bestudeerd om zo goed mogelijk te begrijpen wat er precies gebeurt na het klikken op het event.
    // De waardes worden gesorteerd op jaar, vanaf 2017 tot het jaar 2000
    d3.select("input").on("change", change);

    // Na het selecteren van de checkbox ontstaant er een timeout van 2 seconden.
    var sortTimeout = setTimeout(function() {
        d3.select("input").property("checked", true).each(change);
    }, 2000);

    function change() {
        clearTimeout(sortTimeout);

        //     // Copy-on-write since tweens are evaluated after a delay.
        var x0 = x.domain(data.sort(this.checked ?
                    function(a, b) { return b.number - a.number; } :
                    function(a, b) { return d3.ascending(b.year, a.year); })
                .map(function(d) { return d.year; }))
            .copy();
        //Met selectAll worden alle elementen met de bar class geselecteert en opnieuw gesorteerd.
        svg.selectAll(".bar")
            .sort(function(a, b) { return x0(a.number) - x0(b.number); });
        // De transitie die meegegeven word heeft een duratie van 0,75seconden
        var transition = svg.transition().duration(750),
            delay = function(d, i) { return i * 50; };
        transition.selectAll(".bar")
            .delay(delay)
            .attr("x", function(d) { return x0(d.year); });
        //Ook bij de xAxis worden alle elementen opnieuw op de juiste plek gezet.
        transition.select(".x.axis")
            .call(xAxis)
            .selectAll("g")
            .delay(delay);
    };
};