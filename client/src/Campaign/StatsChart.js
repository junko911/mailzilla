import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { getStats } from '../redux/actions'
import { connect } from 'react-redux'

am4core.useTheme(am4themes_animated);

class StatsChart extends React.Component {
  componentDidMount() {
    this.props.fetchStats(this.props.campaign.id).then(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.legend = new am4charts.Legend()

      chart.data = this.props.stats.map(e => ({ date: new Date(e.date), opened: e.open_at, clicked: e.clicked_at }))

      chart.xAxes.push(new am4charts.DateAxis());
      chart.yAxes.push(new am4charts.ValueAxis());

      let series = chart.series.push(new am4charts.LineSeries());
      series.name = "Opened";
      series.dataFields.valueY = "opened";
      series.dataFields.dateX = "date";
      series.tooltipText = "[bold]{valueY} "
      series.strokeWidth = 3;
      series.minBulletDistance = 15;

      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = "Clicked";
      series2.dataFields.valueY = "clicked";
      series2.dataFields.dateX = "date";
      series2.tooltipText = "[bold]{valueY}"
      series2.strokeWidth = 3;
      series2.minBulletDistance = 15;

      series.tooltip.background.strokeOpacity = 0;
      series.tooltip.pointerOrientation = "left";
      series.tooltip.label.minWidth = 30;
      series.tooltip.label.minHeight = 30;
      series.tooltip.label.textAlign = "middle";

      series2.tooltip.background.strokeOpacity = 0;
      series2.tooltip.pointerOrientation = "left";
      series2.tooltip.label.minWidth = 30;
      series2.tooltip.label.minHeight = 30;
      series2.tooltip.label.textAlign = "middle";

      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 4;
      bullet.circle.fill = am4core.color("#fff");

      var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
      bullet2.circle.strokeWidth = 2;
      bullet2.circle.radius = 4;
      bullet2.circle.fill = am4core.color("#fff");

      chart.cursor = new am4charts.XYCursor()
    })
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

const msp = state => {
  return { stats: state.stats }
}

const mdp = dispatch => {
  return { fetchStats: campaignId => dispatch(getStats(campaignId)) }
}

export default connect(msp, mdp)(StatsChart)
