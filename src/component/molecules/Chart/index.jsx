  "use client";

  import { useRef, useEffect, useState } from "react";
  import Chart from "chart.js/auto";
  import classes from "./Chart.module.css";
  import BorderWrapper from "@/component/atoms/BorderWrapper";
  import DropDown from "../DropDown/DropDown";
  import NoData from "@/component/atoms/NoData/NoData";
  import { Loader } from "@/component/atoms/Loader";

  export default function EarningsChart({ data, onYearChange, loading = false }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    console.log("graph data", data);

    // Function to generate years options (current year and previous years)
    const generateYearsOptions = () => {
      const currentYear = new Date().getFullYear();
      const years = [];
      
      // Add current year and previous 3 years
      for (let i = 0; i < 4; i++) {
        const year = currentYear - i;
        years.push({
          label: year.toString(),
          value: year.toString()
        });
      }
      
      return years;
    };

    // Extract year from data or use current year as fallback
    const year = data?.[0]?.year || new Date().getFullYear();

    // Check if there's no data or all values are 0
    const hasData = data && 
      Array.isArray(data) && 
      data.length > 0 && 
      data.some(item => item && item.count > 0);

    console.log("hasData check:", {
      dataExists: !!data,
      isArray: Array.isArray(data),
      length: data?.length,
      hasValidItems: data?.some(item => item && item.count > 0),
      hasData: hasData
    });

    // Handle year selection
    const handleYearChange = (selectedValue) => {
      const yearValue = selectedValue?.value || selectedValue;
      setSelectedYear(yearValue);
      
      // Call the callback function to fetch data for the selected year
      if (onYearChange && typeof onYearChange === 'function') {
        onYearChange(yearValue);
      }
      
      console.log("Selected year:", yearValue);
    };

    useEffect(() => {
      // Always destroy existing chart instance when data changes
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }

      // Only create new chart if we have valid data
      if (chartRef.current && Array.isArray(data) && data.length > 0) {
        const ctx = chartRef.current.getContext("2d");

        if (ctx) {
          // Extract labels and data from the provided dataset
          const labels = data.map((item) => item.monthName);
          const earningsData = data.map((item) => item?.count ?? 0);

          // Create the chart
          chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Earnings",
                  data: earningsData,
                  borderColor: "#ff7e67",
                  backgroundColor: "rgba(255, 126, 103, 0.1)",
                  tension: 0.4,
                  fill: true,
                  pointRadius: 0,
                  pointHoverRadius: 6,
                  pointBackgroundColor: "#fff",
                  pointHoverBackgroundColor: "#fff",
                  pointBorderColor: "#ff7e67",
                  pointHoverBorderColor: "#ff7e67",
                  pointBorderWidth: 2,
                  pointHoverBorderWidth: 2,
                  borderDash: earningsData.every(v => v === 0) ? [5, 5] : [], // ← Added here
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: false,
                  external: (context) => {
                    // Tooltip Element
                    let tooltipEl = document.getElementById("chartjs-tooltip");

                    // Create element on first render
                    if (!tooltipEl) {
                      tooltipEl = document.createElement("div");
                      tooltipEl.id = "chartjs-tooltip";
                      tooltipEl.className = classes.tooltip;
                      document.body.appendChild(tooltipEl);
                    }

                    // Hide if no tooltip
                    const tooltipModel = context.tooltip;
                    if (tooltipModel.opacity === 0) {
                      tooltipEl.style.opacity = "0";
                      return;
                    }

                    // Set Text
                    if (tooltipModel.body) {
                      const index = tooltipModel.dataPoints[0].dataIndex;
                      const value = tooltipModel.dataPoints[0].raw;
                      const month = context.chart.data.labels?.[index];

                      tooltipEl.innerHTML = `
                        <div class="${classes.tooltipContent}">
                          <div class="${
                            classes.tooltipDate
                          }">${month} ${year}</div>
                          <div class="${
                            classes.tooltipValue
                          }">£${value.toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}</div>
                        </div>
                      `;
                    }

                    // Position tooltip
                    const position = context.chart.canvas.getBoundingClientRect();

                    // Display, position, and set styles for font
                    tooltipEl.style.opacity = "1";
                    tooltipEl.style.position = "absolute";
                    tooltipEl.style.left =
                      position.left +
                      window.pageXOffset +
                      tooltipModel.caretX -
                      tooltipEl.offsetWidth / 2 +
                      "px";
                    tooltipEl.style.top =
                      position.top +
                      window.pageYOffset +
                      tooltipModel.caretY -
                      tooltipEl.offsetHeight -
                      15 +
                      "px";
                    tooltipEl.style.pointerEvents = "none";
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    color: "#888",
                    font: {
                      size: 12,
                    },
                    padding: 10,
                  },
                  border: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  min: 0,
                  
                  // grid: {
                  //   display: false,
                  //   drawBorder: false,
                  // },
                },
              },
              interaction: {
                intersect: false,
                mode: "index",
              },
              elements: {
                point: {
                  radius: 0,
                },
              },
            },
          });

          // Add point for June (if it has data)
          const juneIndex = 5; // June is the 6th element (0-indexed)
          if (data[juneIndex] && data[juneIndex].count > 0) {
            const junePoint = document.createElement("div");
            junePoint.className = classes.highlightPoint;
            const chartContainer = chartRef.current.parentElement;
            if (chartContainer) {
              chartContainer.appendChild(junePoint);

              // Position the point
              setTimeout(() => {
                if (chartInstance.current) {
                  const meta = chartInstance.current.getDatasetMeta(0);
                  const point = meta.data[juneIndex];
                  if (point) {
                    const x = point.x;
                    const y = point.y;
                    junePoint.style.left = `${x}px`;
                    junePoint.style.top = `${y}px`;
                  }
                }
              }, 100);
            }
          }
        }
      }

      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
          chartInstance.current = null;
        }
      };
    }, [data, hasData]);

    // Reset loading state when data changes
    useEffect(() => {
      if (data) {
        // Loading state is managed by parent component
      }
    }, [data]);

    // Calculate total earnings from the data
    const totalEarnings = data && Array.isArray(data)
      ? data.reduce((sum, item) => {
          const count = item && typeof item.count === 'number' ? item.count : 0;
          // Ensure we only use positive values or zero
          const safeCount = Math.max(0, count);
          return sum + safeCount;
        }, 0)
      : 0;

    return (
      <BorderWrapper>
        <div className={classes.header}>
          <div>
            <h2 className={classes.amount}>
              £
              {totalEarnings.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
            <p className={classes.label}>Total Earnings</p>
          </div>
          <div className={classes.yearSelector}>
            <DropDown
              options={generateYearsOptions()}
              placeholder={"Years"}
              value={generateYearsOptions().find(option => option.value === selectedYear.toString())}
              setValue={handleYearChange}
            />
          </div>
        </div>
        <div className={classes.chartContainer}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Loader />
            </div>
          ) : (
            <canvas ref={chartRef}></canvas>
          )}
        </div>
      </BorderWrapper>
    );
  }
