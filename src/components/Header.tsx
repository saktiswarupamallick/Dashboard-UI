import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SearchIcon, BellIcon, SunIcon, MoonIcon } from "./Icons";
import { useTheme } from "../contexts/ThemeContext";
import { useApp } from "../contexts/AppContext";
import { THEME_CLASSES } from "../utils/theme";
import OpenIcon from "./icons/OpenIcon";
import StarIcon from "./icons/StarIcon";
import TimeIcon from "./icons/TimeIcon";
import TextIcon from "./icons/TextIcon";

const Header: React.FC = () => {
  const { toggleTheme, isDark } = useTheme();
  const { 
    state, 
    toggleSidebar, 
    toggleActivitySidebar, 
    setSearchQuery, 
    unreadNotificationsCount,
    markNotificationRead,
    clearAllNotifications,
    removeNotification,
    addNotification
  } = useApp();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

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

  const handleNotificationClick = (notificationId: string) => {
    markNotificationRead(notificationId);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

 
  const sortedNotifications = [...state.notifications].sort((a, b) => {
    const timestampA = a.timestamp || 0;
    const timestampB = b.timestamp || 0;
    return timestampB - timestampA;
  });

  
  const handleAddTestNotification = () => {
    const testNotifications = [
      {
        title: 'New Order Received',
        message: 'Order #12345 has been placed by customer John Doe.',
        time: 'Just now',
        timestamp: Date.now(),
        read: false,
        type: 'success' as const,
        iconType: 'user' as const
      },
      {
        title: 'Server Alert',
        message: 'CPU usage is above 90%. Please check the server performance.',
        time: 'Just now',
        timestamp: Date.now(),
        read: false,
        type: 'warning' as const,
        iconType: 'bug' as const
      },
      {
        title: 'Payment Processed',
        message: 'Payment of $299.99 has been successfully processed.',
        time: 'Just now',
        timestamp: Date.now(),
        read: false,
        type: 'success' as const,
        iconType: 'subscribe' as const
      }
    ];
    
    const randomNotification = testNotifications[Math.floor(Math.random() * testNotifications.length)];
    addNotification(randomNotification);
  };

  return (
    <header className={`${THEME_CLASSES.DASHBOARD_BG} border-b ${THEME_CLASSES.BORDER_DEFAULT} px-4 py-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className={`p-1 rounded-lg ${THEME_CLASSES.HOVER_BG} transition-colors duration-200`}
            title="Toggle Sidebar"
          >
            <OpenIcon className="text-gray-900 dark:text-white" size={28} />
          </button>
          
          <StarIcon className="text-gray-900 dark:text-white"  />

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
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search orders, users, projects..."
              value={state.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-64 pl-10 pr-4 py-2 ${THEME_CLASSES.CARD_BG} rounded-lg dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              aria-label="Global search"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
             <TextIcon className="text-gray-400" size={20} />
            </div>
          </form>

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

          <button
            onClick={handleAddTestNotification}
            className={`p-2 rounded-lg ${THEME_CLASSES.HOVER_BG} transition-colors duration-200`}
            title="Add Test Notification"
          >
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
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
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
                  {sortedNotifications.length === 0 ? (
                    <div className="p-4 text-center">
                      <p className={`text-sm ${THEME_CLASSES.TEXT_SECONDARY}`}>
                        No notifications yet
                      </p>
                    </div>
                  ) : (
                    sortedNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b ${THEME_CLASSES.BORDER_LIGHT} ${THEME_CLASSES.HOVER_BG} transition-colors duration-200 cursor-pointer ${
                          !notification.read
                            ? "bg-blue-50 dark:bg-blue-900/20"
                            : ""
                        }`}
                        onClick={() => handleNotificationClick(notification.id)}
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
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${THEME_CLASSES.TEXT_PRIMARY} truncate`}>
                              {notification.title}
                            </p>
                            <p className={`text-xs ${THEME_CLASSES.TEXT_SECONDARY} mt-1 line-clamp-2`}>
                              {notification.message}
                            </p>
                            <p className={`text-xs ${THEME_CLASSES.TEXT_SECONDARY} mt-1 font-medium`}>
                              {notification.time}
                            </p>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className={`text-xs ${THEME_CLASSES.TEXT_SECONDARY} hover:text-red-500 transition-colors duration-200`}
                              title="Remove notification"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className={`p-4 border-t ${THEME_CLASSES.BORDER_DEFAULT} flex justify-between items-center`}>
                  <button 
                    onClick={clearAllNotifications}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
                  >
                    Mark all as read
                  </button>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={toggleActivitySidebar}
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
