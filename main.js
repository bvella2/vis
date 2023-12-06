
d3.csv('Red_Light_Camera_ViolationsPreprocessed.csv').then(data => {
    
    let currentVisualization = 'year';

    // Create a dropdown menu
    const dropdown = d3.select('#timeDropdown');

    dropdown.on('change', () => {
        // Update current visualization type
        currentVisualization = dropdown.node().value;
        updateVisualization();
    });

    // Function to update the visualization based on the selected type
    function updateVisualization() {
        // Clear previous visualization
        d3.select('#visualization').html('');

        // Check the selected type and create the corresponding visualization
        if (currentVisualization === 'year') {
            createYearlyBarChart(data);
           // createMonthlyBubbleChart(data,selectedYear);
           
        } else if (currentVisualization === 'month') {
            createMonthlyBarChart(data);
        }
        else if (currentVisualization === 'week') {
            createWeeklyBarChart(data);
        }
        // Add more conditions for other visualization types if needed
    }

    // Initial update
    updateVisualization();
});




// Function to create a yearly bar chart
function createYearlyBarChart(data) {
 
    const yearlyData = d3.nest()
        .key(d => d.Year)
        .rollup(d => d3.sum(d, v => v.VIOLATIONS))
        .entries(data);

    const margin = { top: 10, right: 40, bottom: 30, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select('#visualization')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand()
        .domain(yearlyData.map(d => d.key))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(yearlyData, d => d.value)])
        .range([height, 0]);

    svg.selectAll('rect')
        .data(yearlyData)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.key))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d.value))
        .attr('fill', 'steelblue')
        .attr('cursor', 'pointer') // Change cursor to pointer on hover
        .on('click', function (event, d) {
            // Show bubble chart for the selected year
            createMonthlyBubbleChart(data, d.key);
        });
       

    // Add x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g')
        .call(d3.axisLeft(yScale));

    // Add labels
    svg.append('text')
    .attr('x', width / 2)
    .attr('y', height + margin.top + 20) // Increased space
    .attr('text-anchor', 'middle')
    .text('Year');
       

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0 - height / 2)
        .attr('y', 0 - margin.left)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .text('Total Violations');

        
}

function createMonthlyBarChart(data) {
  
    const monthlyData = d3.nest()
        .key(d => d.Month)
        .rollup(d => d3.sum(d, v => v.VIOLATIONS))
        .entries(data);

    const margin = { top: 20, right: 30, bottom: 30, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select('#visualization')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand()
        .domain(monthlyData.map(d => d.key))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(monthlyData, d => d.value)])
        .range([height, 0]);

    svg.selectAll('rect')
        .data(monthlyData)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.key))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d.value))
        .attr('fill', 'steelblue').attr('cursor', 'pointer') // Change cursor to pointer on hover
        .on('mouseover', function (event, d) {
            // Show tooltip on hover
            d3.select(this)
                .attr('fill', 'orange'); // Change color on hover
            
        })
        .on('mouseout', function () {
            // Hide tooltip on mouseout
            d3.select(this)
                .attr('fill', 'steelblue'); // Restore original color
          
        });

    // Add x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g')
        .call(d3.axisLeft(yScale));

    // Add labels
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.top + 10)
        .attr('text-anchor', 'middle')
        .text('Month');

        svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0 - height / 2)
        .attr('y', 0 - margin.left)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .text('Total Violations');
}


function createWeeklyBarChart(data) {
    // D3 code for creating a weekly bar chart
    // ...

    // Example code:
    const weeklyData = d3.nest()
        .key(d => d.Week)
        .rollup(d => d3.sum(d, v => v.VIOLATIONS))
        .entries(data);

    const margin = { top: 20, right: 30, bottom: 30, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select('#visualization')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand()
        .domain(weeklyData.map(d => d.key))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(weeklyData, d => d.value)])
        .range([height, 0]);

    svg.selectAll('rect')
        .data(weeklyData)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.key))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d.value))
        .attr('fill', 'steelblue').attr('cursor', 'pointer') // Change cursor to pointer on hover
        .on('mouseover', function (event, d) {
            // Show tooltip on hover
            d3.select(this)
                .attr('fill', 'orange'); // Change color on hover
            
        })
        .on('mouseout', function () {
            // Hide tooltip on mouseout
            d3.select(this)
                .attr('fill', 'steelblue'); // Restore original color
          
        });

    // Add x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g')
        .call(d3.axisLeft(yScale));

    // Add labels
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.top + 10)
        .attr('text-anchor', 'middle')
        .text('Week');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0 - height / 2)
        .attr('y', 0 - margin.left)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .text('Total Violations');
}

// Function to create a bubble chart for monthly violations of a specific year
function createMonthlyBubbleChart(data, selectedYear) {
    // Filter data for the selected year
    const monthlyData = data.filter(d => d.Year === selectedYear);

    // Group data by month and calculate total violations per month
    const monthlyViolations = d3.nest()
        .key(d => d.Month)
        .rollup(d => d3.sum(d, v => v.VIOLATIONS))
        .entries(monthlyData);

    // Convert month names to numbers for scale
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthScale = d3.scaleBand()
        .domain(months)
        .range([0, 600])
        .padding(0.1);

    const maxViolations = d3.max(monthlyViolations, d => d.value);

    const radiusScale = d3.scaleSqrt()
        .domain([0, maxViolations])
        .range([0, 50]);

    const svg = d3.select('#bubbleChart')
        .append('svg')
        .attr('width', 800)
        .attr('height', 400);

    svg.selectAll('circle')
        .data(monthlyViolations)
        .enter()
        .append('circle')
        .attr('cx', d => monthScale(d.key))
        .attr('cy', 200)
        .attr('r', d => radiusScale(d.value))
        .attr('fill', 'steelblue')
        .attr('opacity', 0.7)
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .append('title') // Tooltip
        .text(d => `Month: ${d.key}\nViolations: ${d.value}`);
}


d3.csv('Red_Light_Camera_ViolationsPreprocessed_a.csv').then(data => {
    // Convert the string coordinates to numbers
    data.forEach(d => {
        d.LATITUDE = +d.LATITUDE;
        d.LONGITUDE = +d.LONGITUDE;
        d['VIOLATION DATE'] = new Date(d['VIOLATION DATE']);
    });

    const map = L.map('map').setView([41.8781, -87.6298], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const svgLayer = L.svg();
    svgLayer.addTo(map);

    const svg = d3.select("#map").select("svg");

    const circles = data.map(d => {
        const circle = L.circleMarker([d.LATITUDE, d.LONGITUDE], { radius: 8 })
            .addTo(map)
            .bindPopup(`Intersection: ${d.INTERSECTION}<br>Camera ID: ${d['CAMERA ID']}`);
        
        circle.cameraId = d['CAMERA ID']; // Set the camera ID directly on the circle
        circle.year = d3.timeFormat("%Y")(d['VIOLATION DATE']);
        circle.month=d3.timeFormat("%m")(d['VIOLATION DATE']);
        circle.week=d3.timeFormat("%w")(d['VIOLATION DATE']);
        circle.violations = d.VIOLATIONS;

        circle.on('click', function (event) {
            const cameraData = data.filter(entry => entry['CAMERA ID'] === this.cameraId);
            const yearsData = cameraData.map(entry => ({ year: d3.timeFormat("%Y")(entry['VIOLATION DATE']), violations: entry.VIOLATIONS }));
            const monthData=cameraData.map(entry => ({ year: d3.timeFormat("%m")(entry['VIOLATION DATE']), violations: entry.VIOLATIONS }));
            const weekData=cameraData.map(entry => ({ year: d3.timeFormat("%w")(entry['VIOLATION DATE']), violations: entry.VIOLATIONS }));
           
           
           // Initial visualization type
    let currentVisualizations = 'year';

    // Create a dropdown menu
    const dropdowns = d3.select('#timeDropdown');

    dropdowns.on('change', () => {
        // Update current visualization type
        currentVisualizations = dropdowns.node().value;
        updateVisualizations();
    });

    // Function to update the visualization based on the selected type
    function updateVisualizations() {
        // Clear previous visualization
        d3.select('#bar-charts').html('');
         // Clear previous visualization
         d3.select('#visualization').html('');
         showYearlyLineChart(yearsData);
        // Check the selected type and create the corresponding visualization
        if (currentVisualizations === 'year') {
            //showYearlyBarChart(yearsData);
            showYearlyLineChart(yearsData);
            createYearlyBarChart(data);
           // createMonthlyBubbleChart(data,selectedYear);
           
        } else if (currentVisualizations === 'month') {
            //showMonthlyBarChart(monthData);
            showMonthlyLineChart(monthData);
            createMonthlyBarChart(data);
        }
        else if (currentVisualizations === 'week') {
           // showWeeklyBarChart(weekData);
           showWeeklyLineChart(weekData);
            createWeeklyBarChart(data);
        }
     
    }

    // Initial update
    updateVisualizations();
           
            //showBarChart(monthData);
        });

        return circle;
    });



    function showYearlyLineChart(data) {
        const barChartContainer = d3.select("#Line-charts-maps");
        barChartContainer.html("");  // Clear previous content
    
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 400 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
    
        const svgLineChart = barChartContainer.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        // Calculate total violations for each year
        const yearlyViolations = d3.rollup(data, v => d3.sum(v, d => d.violations), d => d.year);
    
        // Convert map to an array of objects for easier handling
        const yearlyViolationsArray = Array.from(yearlyViolations, ([year, violations]) => ({ year, violations }));
    
        const x = d3.scaleBand()
            .domain(yearlyViolationsArray.map(d => d.year))
            .range([0, width])
            .padding(0.1);
    
        const y = d3.scaleLinear()
            .domain([0, d3.max(yearlyViolationsArray, d => d.violations)])
            .range([height, 0]);
    
        const line = d3.line()
            .x(d => x(d.year) + x.bandwidth() / 2)
            .y(d => y(d.violations));
    
        svgLineChart.append("path")
            .datum(yearlyViolationsArray)
            .attr("fill", "none")
            .attr("stroke", "yellow")
            .attr("stroke-width", 2)
            .attr("d", line);
    
        svgLineChart.selectAll(".dot")
            .data(yearlyViolationsArray)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.year) + x.bandwidth() / 2)
            .attr("cy", d => y(d.violations))
            .attr("r", 4)
            .attr("fill", "steelblue");
    
        // Add x-axis
        svgLineChart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
    
        // Add y-axis
        svgLineChart.append("g")
            .call(d3.axisLeft(y));
    
        // Add labels
        svgLineChart.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 10)
            .attr("text-anchor", "middle")
            .text("Year");
    
        svgLineChart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0 - height / 2)
            .attr("y", 0 - margin.left)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .text("Violations");
    }

    function showMonthlyLineChart(data) {
        const barChartContainer = d3.select("#Line-charts-maps");
        barChartContainer.html("");  // Clear previous content
    
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 400 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
    
        const svgLineChart = barChartContainer.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        // Calculate total violations for each year
        const yearlyViolations = d3.rollup(data, v => d3.sum(v, d => d.violations), d => d.year);
    
        // Convert map to an array of objects for easier handling
        const yearlyViolationsArray = Array.from(yearlyViolations, ([year, violations]) => ({ year, violations }));
        
        const x = d3.scaleBand()
            .domain(yearlyViolationsArray.map(d => d.year))
            .range([0, width])
            .padding(0.1);
    
        const y = d3.scaleLinear()
            .domain([0, d3.max(yearlyViolationsArray, d => d.violations)])
            .range([height, 0]);
    
        const line = d3.line()
            .x(d => x(d.year) + x.bandwidth() / 2)
            .y(d => y(d.violations));
    
        svgLineChart.append("path")
            .datum(yearlyViolationsArray)
            .attr("fill", "none")
            .attr("stroke", "violet")
            .attr("stroke-width", 2)
            .attr("d", line);
    
        svgLineChart.selectAll(".dot")
            .data(yearlyViolationsArray)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.year) + x.bandwidth() / 2)
            .attr("cy", d => y(d.violations))
            .attr("r", 4)
            .attr("fill", "steelblue");
    
        // Add x-axis
        svgLineChart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
    
        // Add y-axis
        svgLineChart.append("g")
            .call(d3.axisLeft(y));
    
        // Add labels
        svgLineChart.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 10)
            .attr("text-anchor", "middle")
            .text("Month");
    
        svgLineChart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0 - height / 2)
            .attr("y", 0 - margin.left)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .text("Violations");
    }
    
    function showWeeklyLineChart(data){
        const barChartContainer = d3.select("#Line-charts-maps");
        barChartContainer.html("");  // Clear previous content
    
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 400 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
    
        const svgLineChart = barChartContainer.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        // Calculate total violations for each year
        const yearlyViolations = d3.rollup(data, v => d3.sum(v, d => d.violations), d => d.year);
    
        // Convert map to an array of objects for easier handling
        const yearlyViolationsArray = Array.from(yearlyViolations, ([year, violations]) => ({ year, violations }));
    
        const x = d3.scaleBand()
            .domain(yearlyViolationsArray.map(d => d.year))
            .range([0, width])
            .padding(0.1);
    
        const y = d3.scaleLinear()
            .domain([0, d3.max(yearlyViolationsArray, d => d.violations)])
            .range([height, 0]);
    
        const line = d3.line()
            .x(d => x(d.year) + x.bandwidth() / 2)
            .y(d => y(d.violations));
    
        svgLineChart.append("path")
            .datum(yearlyViolationsArray)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", line);
    
        svgLineChart.selectAll(".dot")
            .data(yearlyViolationsArray)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.year) + x.bandwidth() / 2)
            .attr("cy", d => y(d.violations))
            .attr("r", 4)
            .attr("fill", "steelblue");
    
        // Add x-axis
        svgLineChart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
    
        // Add y-axis
        svgLineChart.append("g")
            .call(d3.axisLeft(y));
    
        // Add labels
        svgLineChart.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 10)
            .attr("text-anchor", "middle")
            .text("Day");
    
        svgLineChart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0 - height / 2)
            .attr("y", 0 - margin.left)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .text("Violations");
        }



});
