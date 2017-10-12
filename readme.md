# Assessment 2
I've added new, clean data and interactivity into my chart.

[![][cover]][url]

## Background
For Assessment 2 I've created a new interactive chart, which is able to sort the years from 2017 to 2010 and it will sort the bars by the amount of vehicles.
##### My First Idea
My original idea was creating a non-basic basic chart and i had picked the bubble chart described on the following link https://bl.ocks.org/mbostock/4063269. After cleaning up the data (Remove header/footer and replace semicommas), I had tried to insert the data into the chart but I could not get it working..
Due to this and time management i've had started all over again and decided to go off with a bar chart to get it working. 
##### The Bar Chart
With the clean data i've had managed to get the new chart up and running and I was able to get the data working. I've thought about what kind of a chart to pick, i've picked a bar chart because it's able to get a visual sight how the data is displayed.
##### Meanwhile coding
The problems I was facing while coding was about to get the data cleaned and insert it into a chart, the exercises in the program helped me to clean data but it was hard to get it into a new chart, due to my lack of knowledge in Javascript this was quite hard for me.
In the code I've added a small bit of code to create interactivity into my chart, In the code i've added an on click event onto a checkbox which will trigger a small transition making the columns move from left to right.

## Data
The data comes from a TXT file, the dirty data is a dataset from the CBS, Centraal voor Bureau statistiek and its about the classes of motor vehicles. 

## Features
- [`d3.select`](https://github.com/d3/d3-selection/blob/master/README.md#select)
- [`d3.axis`](https://github.com/d3/d3-axis/blob/master/README.md#axisBottom)
- [`d3.scaleBand`](https://github.com/d3/d3-scale/blob/master/README.md#scaleBand)
- [`d3.scaleLinear`](https://github.com/d3/d3-scale/blob/master/README.md#scaleLinear)
- [`d3.csvFormatRows`](https://github.com/d3/d3-dsv/blob/master/README.md#csvParseRows)
- [`d3.ascending`](https://github.com/d3/d3-array/blob/master/README.md#ascending)

## License
GPL-3.0 © Mike Bostock, Titus Wormer.

[cover]: preview.png

[url]: https://wesleyc94.github.io/fe3-assessment-2/
