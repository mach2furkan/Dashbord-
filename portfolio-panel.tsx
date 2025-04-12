"use client"

import { useState } from "react"
import { portfolioData } from "./portfolioData"
import { formatCurrency, formatNumber } from "./utils"
import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react"

export function PortfolioPanel({ isDarkMode }: { isDarkMode: boolean }) {
  const [sortField, setSortField] = useState<string>("symbol")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedData = [...portfolioData].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a]
    const bValue = b[sortField as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    } else {
      const aStr = String(aValue)
      const bStr = String(bValue)
      return sortDirection === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr)
    }
  })

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0)
  const totalPL = portfolioData.reduce((sum, item) => sum + item.pl, 0)
  const totalPLPct = (totalPL / (totalValue - totalPL)) * 100

  return (
    <div className={`border ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"} h-full flex flex-col`}>
      <div
        className={`${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"} px-2 py-1 flex items-center justify-between border-b ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"}`}
      >
        <div className="text-[#ff9800] text-xs sm:text-sm font-bold">PORTFOLIO</div>
        <div className="flex items-center gap-2">
          <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Last: 10:45:22</span>
        </div>
      </div>

      <div
        className={`${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"} px-2 py-1 flex items-center justify-between border-b ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"}`}
      >
        <div className="flex items-center gap-4">
          <div>
            <div className="text-xs text-gray-500">Total Value</div>
            <div className={`text-sm ${isDarkMode ? "text-yellow-100" : "text-yellow-800"}`}>
              {formatCurrency(totalValue)}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">P/L</div>
            <div className={`text-sm ${totalPL > 0 ? "text-green-500" : "text-red-500"}`}>
              {formatCurrency(totalPL)} ({totalPLPct > 0 ? "+" : ""}
              {formatNumber(totalPLPct)}%)
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-xs">
          <thead>
            <tr className={`${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"}`}>
              <th className="px-2 py-1 text-left cursor-pointer" onClick={() => handleSort("symbol")}>
                <div className="flex items-center">
                  Symbol
                  {sortField === "symbol" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                </div>
              </th>
              <th className="px-2 py-1 text-right cursor-pointer" onClick={() => handleSort("price")}>
                <div className="flex items-center justify-end">
                  Price
                  {sortField === "price" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                </div>
              </th>
              <th className="px-2 py-1 text-right cursor-pointer" onClick={() => handleSort("pctChange")}>
                <div className="flex items-center justify-end">
                  %Chg
                  {sortField === "pctChange" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                </div>
              </th>
              <th
                className="px-2 py-1 text-right cursor-pointer hidden sm:table-cell"
                onClick={() => handleSort("quantity")}
              >
                <div className="flex items-center justify-end">
                  Qty
                  {sortField === "quantity" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                </div>
              </th>
              <th className="px-2 py-1 text-right cursor-pointer" onClick={() => handleSort("value")}>
                <div className="flex items-center justify-end">
                  Value
                  {sortField === "value" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                </div>
              </th>
              <th
                className="px-2 py-1 text-right cursor-pointer hidden md:table-cell"
                onClick={() => handleSort("plPct")}
              >
                <div className="flex items-center justify-end">
                  P/L %
                  {sortField === "plPct" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr
                key={item.symbol}
                className={`border-b ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"}`}
              >
                <td className="px-2 py-1">
                  <div className="flex flex-col">
                    <span className="text-[#ff9800]">{item.symbol}</span>
                    <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{item.name}</span>
                  </div>
                </td>
                <td className="px-2 py-1 text-right">
                  <span className={isDarkMode ? "text-yellow-100" : "text-yellow-800"}>{formatNumber(item.price)}</span>
                </td>
                <td className="px-2 py-1 text-right">
                  <span className={item.pctChange > 0 ? "text-green-500" : "text-red-500"}>
                    {item.pctChange > 0 ? "+" : ""}
                    {formatNumber(item.pctChange)}%
                  </span>
                </td>
                <td className="px-2 py-1 text-right hidden sm:table-cell">
                  <span className={isDarkMode ? "text-white" : "text-black"}>{formatNumber(item.quantity, 0)}</span>
                </td>
                <td className="px-2 py-1 text-right">
                  <span className={isDarkMode ? "text-yellow-100" : "text-yellow-800"}>
                    {formatCurrency(item.value, "USD", 0)}
                  </span>
                </td>
                <td className="px-2 py-1 text-right hidden md:table-cell">
                  <span className={item.plPct > 0 ? "text-green-500" : "text-red-500"}>
                    {item.plPct > 0 ? "+" : ""}
                    {formatNumber(item.plPct)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
