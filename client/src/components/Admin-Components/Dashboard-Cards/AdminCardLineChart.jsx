import React, { useEffect, useState  } from "react";
import Chart from "chart.js";
import axios from "axios";


export default function AdminCardLineChart({data}) {

  const [statistics, setStatistics] = useState([])

  useEffect(() => {
    axios.get("/api/admin/linechart-stats").then((res) => {
      console.log(res.data)
      setStatistics(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  useEffect(() => {

    const salesData = statistics?.map((item) => {
      const backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      const borderColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    
      return {
        label: item?.restaurantName,
        backgroundColor,
        borderColor,
        data: item?.sales.map((data) => data?.noOfOrders),
        fill: false,
      };
    });
    

    const monthNames = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    
    const currentMonth = new Date().getMonth();
    const labels = monthNames.slice(0, currentMonth + 1);
    console.log(labels);  
    var config = {
      type: "line",
      data: {
        labels: labels,
        datasets: salesData
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [statistics]);


  // useEffect(() => {
  //   if (data) {
  //     const monthNames = [
  //       "January", "February", "March", "April",
  //       "May", "June", "July", "August",
  //       "September", "October", "November", "December"
  //     ];
      
  //     const currentMonth = new Date().getMonth();
  //     const labels = monthNames.slice(0, currentMonth + 1);
  //     console.log(labels);  
  //     var config = {
  //       type: "line",
  //       data: {
  //         labels:labels,
  //         datasets: [
  //           {
  //             label: new Date().getFullYear(),
  //             backgroundColor: "#4c51bf",
  //             borderColor: "#4c51bf",
  //             data: data || [],
  //             fill: false,
  //           },
  //         ],
  //       },
  //       options: {
  //         maintainAspectRatio: false,
  //         responsive: true,
  //         title: {
  //           display: false,
  //           text: "Sales Charts",
  //           fontColor: "white",
  //         },
  //         legend: {
  //           labels: {
  //             fontColor: "white",
  //           },
  //           align: "end",
  //           position: "bottom",
  //         },
  //         tooltips: {
  //           mode: "index",
  //           intersect: false,
  //         },
  //         hover: {
  //           mode: "nearest",
  //           intersect: true,
  //         },
  //         scales: {
  //           xAxes: [
  //             {
  //               ticks: {
  //                 fontColor: "rgba(255,255,255,.7)",
  //               },
  //               display: true,
  //               scaleLabel: {
  //                 display: false,
  //                 labelString: "Month",
  //                 fontColor: "white",
  //               },
  //               gridLines: {
  //                 display: false,
  //                 borderDash: [2],
  //                 borderDashOffset: [2],
  //                 color: "rgba(33, 37, 41, 0.3)",
  //                 zeroLineColor: "rgba(0, 0, 0, 0)",
  //                 zeroLineBorderDash: [2],
  //                 zeroLineBorderDashOffset: [2],
  //               },
  //             },
  //           ],
  //           yAxes: [
  //             {
  //               ticks: {
  //                 fontColor: "rgba(255,255,255,.7)",
  //               },
  //               display: true,
  //               scaleLabel: {
  //                 display: false,
  //                 labelString: "Value",
  //                 fontColor: "white",
  //               },
  //               gridLines: {
  //                 borderDash: [3],
  //                 borderDashOffset: [3],
  //                 drawBorder: false,
  //                 color: "rgba(255, 255, 255, 0.15)",
  //                 zeroLineColor: "rgba(33, 37, 41, 0)",
  //                 zeroLineBorderDash: [2],
  //                 zeroLineBorderDashOffset: [2],
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     };
  //     var ctx = document.getElementById("line-chart").getContext("2d");
  //     window.myLine = new Chart(ctx, config);
  //   }
  // }, [data]);

  const canvasStyle = {
    display: 'block',
    height: '300px',
    width: '473px',
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-white mb-1 text-xs font-semibold">
                Overview : {new Date().getFullYear()}
              </h6>
              <h2 className="text-white text-xl font-semibold">Total Orders</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative ">
            <canvas id="line-chart" style={canvasStyle}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
