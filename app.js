( function() {

		$(document).ready(function() {
			var key = "0AvYMScvV9vpcdE1CZk02YWJ6N29SRnpOUXcya1NzalE";
			var make_chart = function(data, tabletop) {
				/* index: 0 - 12
				 * keys: opponent, date, result, completions, attempts, passyards, completionpercent, longestpass, passtouchdowns, interceptions, passerrating, rushattempts, rushyards, rushaverage, longestrush, rushtouchdowns
				 */
				console.log(data);
				var margin = {
					top : 20,
					right : 20,
					bottom : 30,
					left : 50
				}, width = 1100 - margin.left - margin.right, height = 573 - margin.top - margin.bottom;
				var parseDate = d3.time.format("%m-%d-%Y").parse;
				var x = d3.time.scale().range([0, width]);
				var y = d3.scale.linear().range([height, 0]);
				var xAxis = d3.svg.axis().scale(x).orient("bottom");
				var yAxis = d3.svg.axis().scale(y).orient("left");
				var line = d3.svg.line().x(function(d) {
					return x(d.date);
				}).y(function(d) {
					return y(d.passerrating);
				});
				var svg = d3.select("#content").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
				data.forEach(function(d) {
					d.date = parseDate(d.date);
					d.passerrating = parseFloat(d.passerrating);
				});
				x.domain(d3.extent(data, function(d) {
					return d.date;
				}));
				y.domain(d3.extent(data, function(d) {
					return d.passerrating;
				}));
				svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
				svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Price ($)");
				svg.append("path").datum(data).attr("class", "line").attr("d", line);
			};
			Tabletop.init({
				key : key,
				callback : make_chart,
				simpleSheet : true
			});
		});

	}())
