"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  X,
  Maximize2,
  Minus,
  MessageSquare,
  Star,
  Bell,
  HelpCircle,
  Sun,
  Moon,
  Search,
  AlertTriangle,
  Eye,
  RefreshCw,
  Layout,
  PanelRight,
} from "lucide-react"
import { Sparkline } from "./sparkline"
import { marketData } from "./marketData"
import { NewsPanel } from "./news-panel"
import { PortfolioPanel } from "./portfolio-panel"
import { UserProfile } from "./user-profile"
import { formatNumber } from "./utils"

const fixedColumnClass = "w-[120px] sm:w-[140px] whitespace-nowrap overflow-hidden text-ellipsis"

export default function BloombergTerminal() {
  const [data, setData] = useState(marketData)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("markets")
  const [layout, setLayout] = useState<"full" | "split" | "triple">("full")
  const [showSidebar, setShowSidebar] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode)
    document.body.classList.toggle("light", !isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleLayout = () => {
    if (layout === "full") setLayout("split")
    else if (layout === "split") setLayout("triple")
    else setLayout("full")
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const filteredMarketData = {
    americas: data.americas.filter(
      (item) => searchTerm === "" || item.id.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    emea: data.emea.filter((item) => searchTerm === "" || item.id.toLowerCase().includes(searchTerm.toLowerCase())),
    asiaPacific: data.asiaPacific.filter(
      (item) => searchTerm === "" || item.id.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  }

  const renderSection = (title: string, items: any[], sectionNum: string, isDarkMode: boolean) => (
    <>
      <tr className={`${isDarkMode ? "text-white bg-[#1a1a1a]" : "text-black bg-[#e6e6e6]"}`}>
        <th
          className={`sticky left-0 ${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"} px-2 py-1 text-left ${fixedColumnClass}`}
        >
          {sectionNum} {title}
        </th>
        <th colSpan={9}></th>
      </tr>
      {items.map((item, index) => (
        <tr key={item.id} className={`border-b ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"}`}>
          <td className={`sticky left-0 ${isDarkMode ? "bg-[#121212]" : "bg-[#f0f0f0]"} px-2 py-1 ${fixedColumnClass}`}>
            <div className="flex items-center gap-2">
              <span className={`${isDarkMode ? "text-gray-500" : "text-gray-600"} text-xs`}>{item.num}</span>
              <div className="flex items-center gap-1">
                {item.alert && <AlertTriangle className="h-2 w-2 text-red-500" />}
                {item.watched && <Eye className="h-2 w-2 text-blue-500" />}
                <span className="text-[#ff9800] text-xs">{item.id}</span>
              </div>
            </div>
          </td>
          <td className={`px-2 py-1 text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-xs`}>[□]</td>
          <td className={`px-2 py-1 w-[100px] ${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"}`}>
            <div className="flex justify-center">
              <Sparkline
                data1={item.sparkline1 || [0.5, 0.6, 0.4, 0.7, 0.5, 0.8, 0.6, 0.7]}
                data2={item.sparkline2 || [0.7, 0.5, 0.8, 0.6, 0.9, 0.7, 1.0, 0.8]}
                width={80}
                height={20}
                color1={isDarkMode ? "#666666" : "#999999"}
                color2={item.change > 0 ? "#4CAF50" : "#EF4444"}
                showDots={true}
                showArea={true}
                showAverage={true}
              />
            </div>
          </td>
          <td className={`px-2 py-1 text-right ${isDarkMode ? "text-yellow-100" : "text-yellow-800"} text-xs`}>
            {formatNumber(item.value, 2)}
          </td>
          <td className={`px-2 py-1 text-right text-xs ${item.change > 0 ? "text-green-500" : "text-red-500"}`}>
            {item.change > 0 ? "+" : ""}
            {formatNumber(item.change, 2)}
          </td>
          <td className={`px-2 py-1 text-right text-xs ${item.pctChange > 0 ? "text-green-500" : "text-red-500"}`}>
            {item.pctChange > 0 ? "+" : ""}
            {formatNumber(item.pctChange, 2)}%
          </td>
          <td
            className={`px-2 py-1 text-right text-xs ${item.avat > 0 ? "text-green-500" : "text-red-500"} hidden sm:table-cell`}
          >
            {formatNumber(item.avat, 2)}%
          </td>
          <td
            className={`px-2 py-1 text-right ${isDarkMode ? "text-yellow-100" : "text-yellow-800"} text-xs hidden sm:table-cell`}
          >
            {item.time}
          </td>
          <td
            className={`px-2 py-1 text-right text-xs ${item.ytd > 0 ? "text-green-500" : "text-red-500"} hidden md:table-cell`}
          >
            {formatNumber(item.ytd, 2)}%
          </td>
          <td
            className={`px-2 py-1 text-right text-xs ${item.ytdCur > 0 ? "text-green-500" : "text-red-500"} hidden md:table-cell`}
          >
            {formatNumber(item.ytdCur, 2)}%
          </td>
        </tr>
      ))}
    </>
  )

  const renderMarketContent = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className={`${isDarkMode ? "text-white bg-[#1a1a1a]" : "text-black bg-[#e6e6e6]"}`}>
            <th
              className={`sticky left-0 ${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"} px-2 py-1 text-left ${fixedColumnClass}`}
            >
              Market
            </th>
            <th className="px-2 py-1 text-center">RMI</th>
            <th className={`px-2 py-1 text-center ${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"}`}>2Day</th>
            <th className="px-2 py-1 text-right">Value</th>
            <th className="px-2 py-1 text-right">Net Chg</th>
            <th className="px-2 py-1 text-right">%Chg</th>
            <th className="px-2 py-1 text-right hidden sm:table-cell">Δ AVAT</th>
            <th className="px-2 py-1 text-right hidden sm:table-cell">Time</th>
            <th className="px-2 py-1 text-right hidden md:table-cell">%Ytd</th>
            <th className="px-2 py-1 text-right hidden md:table-cell">%YtdCur</th>
          </tr>
        </thead>
        <tbody>
          {renderSection("Americas", filteredMarketData.americas, "1)", isDarkMode)}
          {renderSection("EMEA", filteredMarketData.emea, "2)", isDarkMode)}
          {renderSection("Asia/Pacific", filteredMarketData.asiaPacific, "3)", isDarkMode)}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className={`min-h-screen font-mono ${isDarkMode ? "bg-[#121212] text-white" : "bg-[#f0f0f0] text-black"}`}>
      {/* Bloomberg Header */}
      <div
        className={`${isDarkMode ? "bg-black text-white" : "bg-[#e0e0e0] text-black"} px-2 py-1 flex items-center justify-between border-b ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"} sticky top-0 z-10`}
      >
        <div className="flex items-center gap-4">
          <span className="text-yellow-500 text-xs sm:text-sm">FURKAN-ASKIN</span>
          <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-xs sm:text-sm`}>
            BLOOMBERG PROFESSIONAL
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-xs hidden sm:inline-block`}>
            {currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}
          </span>
          <span className="bg-yellow-500 px-2 py-0.5 text-black hidden sm:inline-block sm:text-sm">PREMIUM</span>
          <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-xs sm:text-sm`}>= Options</span>
          <div className="flex gap-1">
            <Minus className="h-3 w-3 sm:h-4 sm:w-4 cursor-pointer" />
            <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4 cursor-pointer" />
            <X className="h-3 w-3 sm:h-4 sm:w-4 cursor-pointer" />
          </div>
          <button onClick={toggleTheme} className="ml-2">
            {isDarkMode ? <Sun className="h-3 w-3 sm:h-4 sm:w-4" /> : <Moon className="h-3 w-3 sm:h-4 sm:w-4" />}
          </button>
        </div>
      </div>

      {/* Function Buttons */}
      <div
        className={`flex flex-wrap gap-1 ${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"} px-2 py-1 text-xs sm:text-sm sticky top-7 z-10`}
      >
        <button className="bg-red-600 px-2 py-0.5 text-white">CANCL</button>
        <button className="bg-green-600 px-2 py-0.5 text-white">NEW</button>
        <button className="bg-green-600 px-2 py-0.5 text-white">BLANC</button>
        <button className="bg-green-600 px-2 py-0.5 text-white">NEWS</button>
        <button className="bg-green-600 px-2 py-0.5 text-white">GMOV</button>
        <button className="bg-green-600 px-2 py-0.5 text-white">GVOL</button>
        <button className="bg-green-600 px-2 py-0.5 text-white">RATC</button>
        <button className="bg-blue-600 px-2 py-0.5 text-white">PORT</button>
        <button className="bg-blue-600 px-2 py-0.5 text-white">ASKIN</button>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={toggleLayout} className="flex items-center gap-1">
            <Layout className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Layout</span>
          </button>
          <button onClick={toggleSidebar} className="flex items-center gap-1">
            <PanelRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Sidebar</span>
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <div
        className={`flex items-center gap-2 border-b ${isDarkMode ? "border-terminal-gray-700 bg-[#1a1a1a]" : "border-gray-300 bg-[#e6e6e6]"} px-2 py-1 text-xs sm:text-sm sticky top-[70px] z-10`}
      >
        <div className="flex items-center gap-2">
          <button
            className={`px-2 py-0.5 ${activeTab === "markets" ? "bg-[#ff9800] text-black" : ""}`}
            onClick={() => setActiveTab("markets")}
          >
            Markets
          </button>
          <button
            className={`px-2 py-0.5 ${activeTab === "portfolio" ? "bg-[#ff9800] text-black" : ""}`}
            onClick={() => setActiveTab("portfolio")}
          >
            Portfolio
          </button>
          <button
            className={`px-2 py-0.5 ${activeTab === "news" ? "bg-[#ff9800] text-black" : ""}`}
            onClick={() => setActiveTab("news")}
          >
            News
          </button>
        </div>
        <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>|</span>
        <div className="flex items-center gap-1">
          <Search className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`bg-transparent border-none outline-none text-xs sm:text-sm w-24 sm:w-auto ${isDarkMode ? "text-white" : "text-black"}`}
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Message</span>
          <Star className="h-3 w-3 sm:h-4 sm:w-4" />
          <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
          <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
          <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className={`flex flex-wrap items-center gap-2 ${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"} px-2 py-1 text-[#ff9800] text-xs sm:text-sm border-b ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"}`}
      >
        <div className="flex items-center gap-2">
          <span className="font-bold">Standard</span>
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
        </div>
        <label className="flex items-center gap-1">
          <input type="checkbox" className="h-3 w-3 accent-gray-500" />
          <span>Movers</span>
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" className="h-3 w-3 accent-gray-500" />
          <span>Volatility</span>
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" className="h-3 w-3 accent-gray-500" />
          <span>Ratios</span>
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" className="h-3 w-3 accent-gray-500" />
          <span>Futures</span>
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" className="h-3 w-3 accent-gray-500" defaultChecked />
          <span>Δ AVAT</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="bg-[#ff9800] px-2 py-0.5 text-black">10D</span>
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#ff9800] px-2 py-0.5 text-black">%Chg YTD</span>
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#ff9800] px-2 py-0.5 text-black">USD</span>
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-180px)]">
        {/* Main Content Area */}
        <div className={`flex-grow ${layout === "split" || layout === "triple" ? "flex" : ""}`}>
          <div
            className={`${layout === "split" ? "w-1/2" : layout === "triple" ? "w-1/3" : "w-full"} overflow-auto h-full`}
          >
            {activeTab === "markets" && renderMarketContent()}
            {activeTab === "portfolio" && <PortfolioPanel isDarkMode={isDarkMode} />}
            {activeTab === "news" && <NewsPanel isDarkMode={isDarkMode} />}
          </div>

          {layout === "split" || layout === "triple" ? (
            <div
              className={`${layout === "split" ? "w-1/2" : "w-1/3"} overflow-auto h-full border-l ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"}`}
            >
              <NewsPanel isDarkMode={isDarkMode} />
            </div>
          ) : null}

          {layout === "triple" ? (
            <div className="w-1/3 overflow-auto h-full border-l border-terminal-gray-800">
              <PortfolioPanel isDarkMode={isDarkMode} />
            </div>
          ) : null}
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <div
            className={`w-64 border-l ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"} overflow-auto h-full`}
          >
            <UserProfile isDarkMode={isDarkMode} />
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div
        className={`${isDarkMode ? "bg-black text-white" : "bg-[#e0e0e0] text-black"} px-2 py-1 flex items-center justify-between border-t ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"} text-xs`}
      >
        <div className="flex items-center gap-2">
          <span className="text-green-500">CONNECTED</span>
          <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>|</span>
          <span>FURKAN ASKIN</span>
        </div>
        <div className="flex items-center gap-2">
          <span>PING: 32ms</span>
          <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>|</span>
          <span>CPU: 12%</span>
          <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>|</span>
          <span>MEM: 1.2GB</span>
        </div>
      </div>
    </div>
  )
}
