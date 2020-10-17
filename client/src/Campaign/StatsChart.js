import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import moment from 'moment'

am4core.useTheme(am4themes_animated);

class StatsChart extends Component {
  componentDidMount() {
    const sentAt = moment(this.props.campaign.sent_at).format('l').split('/').map(e => parseInt(e))
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.legend = new am4charts.Legend();

    chart.data = [{
      date: new Date(sentAt[2], sentAt[0] - 1, sentAt[1]),
      "delivered": 5,
      "opened": 2,
      "clicked": 1
    }, {
      date: new Date(sentAt[2], sentAt[0] - 1, sentAt[1] + 1),
      "delivered": 1,
      "opened": 2,
      "clicked": 1
    }, {
      date: new Date(sentAt[2], sentAt[0] - 1, sentAt[1] + 2),
      "delivered": 3,
      "opened": 2,
      "clicked": 1
    }, {
      date: new Date(sentAt[2], sentAt[0] - 1, sentAt[1] + 3),
      "delivered": 4,
      "opened": 2,
      "clicked": 1
    }, {
      date: new Date(sentAt[2], sentAt[0] - 1, sentAt[1] + 4),
      "delivered": 2,
      "opened": 2,
      "clicked": 1
    }, {
      date: new Date(sentAt[2], sentAt[0] - 1, sentAt[1] + 5),
      "delivered": 10,
      "opened": 2,
      "clicked": 1
    }, {
      date: new Date(sentAt[2], sentAt[0] - 1, sentAt[1] + 6),
      "delivered": 3,
      "opened": 1,
      "clicked": 1
    }]

    chart.xAxes.push(new am4charts.DateAxis());
    chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.name = "Delivered"
    series.dataFields.valueY = "delivered";
    series.dataFields.dateX = "date";
    series.tooltipText = "[bold]{valueY}"
    series.strokeWidth = 3;
    series.minBulletDistance = 15;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "Opened";
    series2.dataFields.valueY = "opened";
    series2.dataFields.dateX = "date";
    series2.tooltipText = "[bold]{valueY} "
    series2.strokeWidth = 3;
    series.minBulletDistance = 15;

    let series3 = chart.series.push(new am4charts.LineSeries());
    series3.name = "Clicked";
    series3.dataFields.valueY = "clicked";
    series3.dataFields.dateX = "date";
    series3.tooltipText = "[bold]{valueY}"
    series3.strokeWidth = 3;
    series.minBulletDistance = 15;

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

    series3.tooltip.background.strokeOpacity = 0;
    series3.tooltip.pointerOrientation = "left";
    series3.tooltip.label.minWidth = 30;
    series3.tooltip.label.minHeight = 30;
    series3.tooltip.label.textAlign = "middle";

    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
    bullet2.circle.strokeWidth = 2;
    bullet2.circle.radius = 4;
    bullet2.circle.fill = am4core.color("#fff");

    var bullet3 = series3.bullets.push(new am4charts.CircleBullet());
    bullet3.circle.strokeWidth = 2;
    bullet3.circle.radius = 4;
    bullet3.circle.fill = am4core.color("#fff");

    // // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

export default StatsChart;
