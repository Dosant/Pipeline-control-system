import React from 'react';
import {PieChart, Pie, Sector, ResponsiveContainer, Tooltip, Cell} from 'recharts';
// const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
//                   {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Количество: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={payload.color}>
        {`(Процент ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class TwoLevelPieChart extends React.Component {
	constructor() {
    super();
    this.state = {
      activeIndex: 0
    };

    this.onPieEnter = this.onPieEnter.bind(this);
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index
    });
  };


	render () {
  	return (
      <div className="pie-chart-container">
        <ResponsiveContainer >
          <PieChart onMouseEnter={this.onPieEnter}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={this.props.data}
              fill="#7A9E9F">
              {
          	    this.props.data.map((entry, index) => <Cell key={index} fill={entry.color}/>)
              }
            </Pie>
              <Tooltip/>
          </PieChart>
          </ResponsiveContainer >
       </div>
    );
  }
}

export default TwoLevelPieChart;