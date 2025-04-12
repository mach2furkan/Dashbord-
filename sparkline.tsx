"use client"

import { useEffect, useRef } from "react"

interface SparklineProps {
  data1?: number[]
  data2?: number[]
  width?: number
  height?: number
  color1?: string
  color2?: string
  showDots?: boolean
  showArea?: boolean
  showAverage?: boolean
}

export function Sparkline({
  data1 = [0, 1, 0.5, 0.7, 0.9, 0.8, 1, 0.5],
  data2 = [0.5, 0.6, 0.4, 0.7, 0.5, 0.8, 0.6, 0.7],
  width = 80,
  height = 20,
  color1 = "#666666",
  color2 = "#4CAF50",
  showDots = false,
  showArea = true,
  showAverage = true,
}: SparklineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set proper scaling for retina displays
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // Set canvas size in CSS pixels
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const drawSparkline = (data: number[], startX: number, endX: number, color: string) => {
      if (!data || data.length === 0) return

      const xScale = (endX - startX) / (data.length - 1)
      const yMin = Math.min(...data)
      const yMax = Math.max(...data)
      const yRange = yMax - yMin || 1

      // Scale to leave some padding
      const padding = height * 0.1
      const yScale = (height - 2 * padding) / yRange

      // Calculate average
      const average = data.reduce((sum, val) => sum + val, 0) / data.length
      const averageY = height - padding - (average - yMin) * yScale

      // Draw area if enabled
      if (showArea) {
        ctx.beginPath()
        ctx.fillStyle = `${color}20` // 20% opacity

        // Start at bottom left
        ctx.moveTo(startX, height)

        // Draw line to first data point
        ctx.lineTo(startX, height - padding - (data[0] - yMin) * yScale)

        // Draw lines through all data points
        data.forEach((value, i) => {
          const x = startX + i * xScale
          const y = height - padding - (value - yMin) * yScale
          ctx.lineTo(x, y)
        })

        // Draw line to bottom right and close path
        ctx.lineTo(endX, height)
        ctx.closePath()
        ctx.fill()
      }

      // Draw line
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 1

      data.forEach((value, i) => {
        const x = startX + i * xScale
        const y = height - padding - (value - yMin) * yScale

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Draw dots if enabled
      if (showDots) {
        data.forEach((value, i) => {
          const x = startX + i * xScale
          const y = height - padding - (value - yMin) * yScale

          ctx.beginPath()
          ctx.fillStyle = color
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      // Draw average line if enabled
      if (showAverage) {
        ctx.beginPath()
        ctx.strokeStyle = `${color}80` // 50% opacity
        ctx.setLineDash([1, 1])
        ctx.moveTo(startX, averageY)
        ctx.lineTo(endX, averageY)
        ctx.stroke()
        ctx.setLineDash([])
      }
    }

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw first sparkline (gray)
    drawSparkline(data1, 0, width / 2, color1)

    // Draw second sparkline (colored)
    drawSparkline(data2, width / 2, width, color2)
  }, [data1, data2, width, height, color1, color2, showDots, showArea, showAverage])

  return <canvas ref={canvasRef} width={width} height={height} className="inline-block" />
}
