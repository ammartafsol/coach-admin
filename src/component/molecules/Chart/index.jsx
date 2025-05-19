"use client"

import { useRef, useEffect } from "react"
import Chart from "chart.js/auto"
import classes from "./Chart.module.css"

export default function EarningsChart() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        // Create the chart
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
            datasets: [
              {
                label: "Earnings",
                data: [35000, 38000, 42000, 45000, 45591, 47000, 48000, 50000, 53000, 58000, 60000, 63489.5],
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
                  let tooltipEl = document.getElementById("chartjs-tooltip")

                  // Create element on first render
                  if (!tooltipEl) {
                    tooltipEl = document.createElement("div")
                    tooltipEl.id = "chartjs-tooltip"
                    tooltipEl.className = classes.tooltip
                    document.body.appendChild(tooltipEl)
                  }

                  // Hide if no tooltip
                  const tooltipModel = context.tooltip
                  if (tooltipModel.opacity === 0) {
                    tooltipEl.style.opacity = "0"
                    return
                  }

                  // Set Text
                  if (tooltipModel.body) {
                    const index = tooltipModel.dataPoints[0].dataIndex
                    const value = tooltipModel.dataPoints[0].raw
                    const month = context.chart.data.labels?.[index]

                    tooltipEl.innerHTML = `
                      <div class="${classes.tooltipContent}">
                        <div class="${classes.tooltipDate}">${month} 2021</div>
                        <div class="${classes.tooltipValue}">$${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                      </div>
                    `
                  }

                  // Position tooltip
                  const position = context.chart.canvas.getBoundingClientRect()

                  // Display, position, and set styles for font
                  tooltipEl.style.opacity = "1"
                  tooltipEl.style.position = "absolute"
                  tooltipEl.style.left =
                    position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.offsetWidth / 2 + "px"
                  tooltipEl.style.top =
                    position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.offsetHeight - 15 + "px"
                  tooltipEl.style.pointerEvents = "none"
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
                display: false,
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
        })

        // Add point for June
        const juneIndex = 4 // June is the 5th element (0-indexed)
        const junePoint = document.createElement("div")
        junePoint.className = classes.highlightPoint
        const chartContainer = chartRef.current.parentElement
        if (chartContainer) {
          chartContainer.appendChild(junePoint)

          // Position the point
          setTimeout(() => {
            if (chartInstance.current) {
              const meta = chartInstance.current.getDatasetMeta(0)
              const point = meta.data[juneIndex]
              const x = point.x
              const y = point.y
              junePoint.style.left = `${x}px`
              junePoint.style.top = `${y}px`
            }
          }, 100)
        }
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <h2 className={classes.amount}>$63,489.50</h2>
          <p className={classes.label}>Total Earnings</p>
        </div>
        <div className={classes.yearSelector}>
          <span>This Year</span>
          <div className={classes.checkboxContainer}>
            <input type="checkbox" id="thisYear" className={classes.checkboxInput} checked readOnly />
            <label htmlFor="thisYear" className={classes.checkboxLabel}></label>
          </div>
        </div>
      </div>
      <div className={classes.chartContainer}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}
