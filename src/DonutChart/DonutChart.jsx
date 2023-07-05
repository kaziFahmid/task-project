import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

export default function DonutChart() {
  const [data, setData] = useState([]);

  const svgRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/chartcount');
        const chartData = await response.json();
        setData(Object.entries(chartData).map(([property, count]) => ({ property, count })));
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const w = 500;
    const h = 300;
    const radius = Math.min(w, h) / 2;
    const margin = { top: 20, right: 120, bottom: 20, left: 20 };
    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${w + margin.left + margin.right} ${h + margin.top + margin.bottom}`)
      .append('g')
      .attr('transform', `translate(${w / 2 + margin.left}, ${h / 2 + margin.top})`);

    const pie = d3.pie().value((d) => d.count)(data);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll('path')
      .data(pie)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', (d, i) => color(i))
      .style('opacity', 0.7);

    svg.selectAll('text')
      .data(pie)
      .join('text')
      .text((d) => d.data.count)
      .attr('transform', (d) => `translate(${arcGenerator.centroid(d)})`)
      .style('text-anchor', 'middle');

    // Create legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${radius + 20}, -${radius})`);

    const legendItems = legend.selectAll('.legend-item')
      .data(pie)
      .join('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`);

    legendItems.append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', (d, i) => color(i));

    legendItems.append('text')
      .attr('x', 20)
      .attr('y', 9)
      .text((d) => `${d.data.property}: ${d.data.count}`);
  }, [data]);

  return (
    <div className=" mt-20 md:mt-0">
      <svg ref={svgRef}></svg>
    </div>
  );
}
