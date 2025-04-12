"use client"

import { useState } from "react"
import { newsData } from "./newsData"
import { Bell, Star, MessageSquare, Search } from "lucide-react"

export function NewsPanel({ isDarkMode }: { isDarkMode: boolean }) {
  const [filter, setFilter] = useState("ALL")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNews = newsData.filter((news) => {
    const matchesFilter = filter === "ALL" || news.category === filter
    const matchesSearch =
      searchTerm === "" ||
      news.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.source.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const categories = ["ALL", ...Array.from(new Set(newsData.map((news) => news.category)))]

  return (
    <div className={`border ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"} h-full flex flex-col`}>
      <div
        className={`${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"} px-2 py-1 flex items-center justify-between border-b ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"}`}
      >
        <div className="text-[#ff9800] text-xs sm:text-sm font-bold">NEWS</div>
        <div className="flex items-center gap-2">
          <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
          <Star className="h-3 w-3 sm:h-4 sm:w-4" />
          <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
        </div>
      </div>

      <div
        className={`${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"} px-2 py-1 flex items-center gap-2 border-b ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"}`}
      >
        <Search className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`bg-transparent border-none outline-none text-xs sm:text-sm flex-grow ${isDarkMode ? "text-white" : "text-black"}`}
        />
      </div>

      <div className="flex overflow-x-auto py-1 px-2 gap-2 text-xs border-b border-terminal-gray-800">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-2 py-0.5 whitespace-nowrap ${
              filter === category ? "bg-[#ff9800] text-black" : `${isDarkMode ? "text-gray-400" : "text-gray-600"}`
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex-grow overflow-y-auto">
        {filteredNews.map((news) => (
          <div
            key={news.id}
            className={`px-2 py-1 border-b ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"} ${
              news.read ? (isDarkMode ? "text-gray-500" : "text-gray-600") : ""
            }`}
          >
            <div className="flex items-center gap-1">
              <span
                className={`text-xs ${news.priority === 1 ? "text-red-500" : news.priority === 2 ? "text-yellow-500" : "text-gray-500"}`}
              >
                {news.priority === 1 ? "★" : news.priority === 2 ? "•" : "○"}
              </span>
              <span className="text-[#ff9800] text-xs">{news.time}</span>
              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{news.source}</span>
            </div>
            <div
              className={`text-xs sm:text-sm ${!news.read && (isDarkMode ? "text-white font-bold" : "text-black font-bold")}`}
            >
              {news.headline}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
