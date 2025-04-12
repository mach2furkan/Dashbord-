"use client"

import { userData } from "./userData"
import { getTimeAgo } from "./utils"
import { Bell, Settings, LogOut, User } from "lucide-react"

export function UserProfile({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className={`border ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"} h-full flex flex-col`}>
      <div
        className={`${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"} px-2 py-1 flex items-center justify-between border-b ${isDarkMode ? "border-terminal-gray-800" : "border-gray-300"}`}
      >
        <div className="text-[#ff9800] text-xs sm:text-sm font-bold">PROFILE</div>
        <div className="flex items-center gap-2">
          <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
          <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
        </div>
      </div>

      <div className="p-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"}`}
          >
            <User className="h-4 w-4 text-[#ff9800]" />
          </div>
          <div>
            <div className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{userData.name}</div>
            <div className="text-xs text-gray-500">
              {userData.title}, {userData.company}
            </div>
          </div>
        </div>

        <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Last login: {getTimeAgo(userData.lastLogin)}
        </div>

        <div className="mt-2">
          <div className="text-xs text-[#ff9800] font-bold mb-1">WATCHLISTS</div>
          <div className="flex flex-wrap gap-1">
            {userData.watchlists.map((watchlist) => (
              <span
                key={watchlist}
                className={`text-xs px-1 py-0.5 ${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e6e6e6]"} rounded`}
              >
                {watchlist}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-2">
          <div className="text-xs text-[#ff9800] font-bold mb-1">FAVORITES</div>
          <div className="flex flex-wrap gap-1">
            {userData.favorites.map((favorite) => (
              <span
                key={favorite}
                className={`text-xs px-1 py-0.5 ${isDarkMode ? "bg-[#1a1a1a] text-yellow-100" : "bg-[#e6e6e6] text-yellow-800"} rounded`}
              >
                {favorite}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Bell className="h-3 w-3 text-[#ff9800]" />
          <span className="text-xs">
            You have <span className="text-[#ff9800] font-bold">{userData.alerts}</span> new alerts
          </span>
        </div>
      </div>
    </div>
  )
}
