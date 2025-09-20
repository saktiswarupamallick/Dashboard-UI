import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SearchIcon, BellIcon, SunIcon, MoonIcon } from "./Icons";
import { useTheme } from "../contexts/ThemeContext";
import { notifications } from "../utils/data";
import { THEME_CLASSES } from "../utils/theme";
import OpenIcon from "./icons/OpenIcon";
import TimeIcon from "./icons/TimeIcon";
import TextIcon from "./icons/TextIcon";

interface HeaderProps {
  onSidebarToggle: () => void;
  onActivityToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onSidebarToggle,
  onActivityToggle,
}) => {
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
      case "/dashboard":
        return "Dashboard";
      case "/default":
        return "Default";
      default:
        return "Dashboard";
    }
  };

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className={`${THEME_CLASSES.DASHBOARD_BG} border-b ${THEME_CLASSES.BORDER_DEFAULT} px-4 py-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onSidebarToggle}
            className={`p-1 rounded-lg ${THEME_CLASSES.HOVER_BG} transition-colors duration-200`}
            title="Toggle Sidebar"
          >
            <OpenIcon className="text-gray-900 dark:text-white" size={28} />
          </button>

          <div className="flex items-center space-x-2">
            <nav className={`hidden md:flex items-center space-x-1 text-sm ${THEME_CLASSES.TEXT_SECONDARY}`}>
              <span>Dashboards</span>
              <span>/</span>
              <span className={`${THEME_CLASSES.TEXT_PRIMARY} font-medium`}>
                {getPageTitle()}
              </span>
            </nav>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-64 pl-10 pr-4 py-2 ${THEME_CLASSES.CARD_BG} border ${THEME_CLASSES.BORDER_DEFAULT} rounded-lg ${THEME_CLASSES.FOCUS_RING} focus:border-transparent ${THEME_CLASSES.TEXT_PRIMARY} placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
             <TextIcon className="text-gray-400" size={20} />
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${THEME_CLASSES.HOVER_BG} transition-colors duration-200`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? (
              <SunIcon className="text-gray-600 dark:text-gray-300" size={20} />
            ) : (
              <MoonIcon
                className="text-gray-600 dark:text-gray-300"
                size={20}
              />
            )}
          </button>

          <button>
            <TimeIcon className="text-gray-900 dark:text-white" size={28} />
          </button>

          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 rounded-lg ${THEME_CLASSES.HOVER_BG} transition-colors duration-200`}
            >
              <BellIcon
                className="text-gray-600 dark:text-gray-300"
                size={20}
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 ${THEME_CLASSES.DASHBOARD_BG} rounded-lg shadow-lg border ${THEME_CLASSES.BORDER_DEFAULT} z-50 animate-slide-up`}>
                <div className={`p-4 border-b ${THEME_CLASSES.BORDER_DEFAULT}`}>
                  <h3 className={`text-lg font-semibold ${THEME_CLASSES.TEXT_PRIMARY}`}>
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b ${THEME_CLASSES.BORDER_LIGHT} ${THEME_CLASSES.HOVER_BG} transition-colors duration-200 ${
                        !notification.read
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === "error"
                              ? "bg-red-500"
                              : notification.type === "success"
                              ? "bg-green-500"
                              : notification.type === "warning"
                              ? "bg-orange-500"
                              : "bg-blue-500"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${THEME_CLASSES.TEXT_PRIMARY}`}>
                            {notification.title}
                          </p>
                          <p className={`text-xs ${THEME_CLASSES.TEXT_SECONDARY} mt-1`}>
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`p-4 border-t ${THEME_CLASSES.BORDER_DEFAULT}`}>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onActivityToggle}
            className={`p-2 rounded-lg ${THEME_CLASSES.HOVER_BG} transition-colors duration-200`}
            title="Toggle Activity Panel"
          >
            <OpenIcon className="text-gray-900 dark:text-white" size={28} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
