import React, { useState, useEffect } from 'react';
import BugBeetleIcon from '../assets/ActivitySidebar/BugBeetle.svg';
import UserIcon from '../assets/ActivitySidebar/User.svg';
import BroadcastIcon from '../assets/ActivitySidebar/Broadcast.svg';
import Female08Icon from '../assets/Female08.svg';
import Female09Icon from '../assets/Female09.svg';
import Female15Icon from '../assets/Female15.svg';
import Male3DIcon from '../assets/3D05.svg';
import { THEME_CLASSES } from '../utils/theme';
import { ActivitySidebarSkeleton } from './SkeletonLoader';
import { useApp } from '../contexts/AppContext';

const ActivitySidebar: React.FC = () => {
  const { state, toggleActivitySidebar } = useApp();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); 

    return () => clearTimeout(timer);
  }, []);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'bug':
        return <img src={BugBeetleIcon} alt="Bug" className="w-4 h-4" />;
      case 'user':
        return <img src={UserIcon} alt="User" className="w-4 h-4" />;
      case 'subscribe':
        return <img src={BroadcastIcon} alt="Broadcast" className="w-4 h-4" />;
      default:
        return <img src={BugBeetleIcon} alt="Bug" className="w-4 h-4" />;
    }
  };

  const getProfileImage = (index: number) => {
    const profileImages = [Female08Icon, Female09Icon, Female15Icon, Male3DIcon];
    return profileImages[index % profileImages.length];
  };

  const renderNotifications = () => (
    <div className="space-y-1">
      {state.notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`p-3 rounded-lg transition-all duration-200 cursor-pointer ${THEME_CLASSES.HOVER_BG} hover:shadow-sm hover:scale-[1.02]`}
          style={{
            animationDelay: `${index * 50}ms`,
            animation: 'slideUp 0.3s ease-out forwards'
          }}
        >
          <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              index % 2 === 0 ? 'bg-[#E3F5FF]' : 'bg-[#E5ECF6]'
            }`}>
              {getIcon(notification.iconType)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white truncate">
                {notification.title}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {notification.time}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderActivities = () => (
    <div className="space-y-1">
      {state.activities.map((activity, index) => (
        <div
          key={activity.id}
          className={`relative p-3 rounded-lg ${THEME_CLASSES.HOVER_BG} hover:shadow-sm hover:scale-[1.02] transition-all duration-200 cursor-pointer`}
          style={{
            animationDelay: `${index * 50}ms`,
            animation: 'slideUp 0.3s ease-out forwards'
          }}
        >
          
          {index < state.activities.length - 1 && (
            <div className="absolute left-7 mt-2 top-10 w-0.5 h-6 bg-gray-200 dark:bg-gray-800 z-0"></div>
          )}
          
          <div className="flex items-start space-x-3">
            <div className="relative flex-shrink-0 z-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600">
                <img 
                  src={getProfileImage(index)} 
                  alt={`Profile ${index + 1}`} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">
                {activity.user}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContacts = () => (
    <div>
      {state.contacts.map((contact, index) => (
        <div
          key={contact.id}
          className={`p-3 rounded-lg ${THEME_CLASSES.HOVER_BG} hover:shadow-sm hover:scale-[1.02] transition-all duration-200 cursor-pointer`}
          style={{
            animationDelay: `${index * 50}ms`,
            animation: 'slideUp 0.3s ease-out forwards'
          }}
        >
          <div className="flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src={getProfileImage(index)} 
                  alt={`Profile ${index + 1}`} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white truncate">
                {contact.name}
              </p>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 max-[900px]:block hidden ${
          state.activitySidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleActivitySidebar}
      />
      
      {state.activitySidebarOpen && (
        <div className={`
          ${THEME_CLASSES.DASHBOARD_BG} border-l ${THEME_CLASSES.BORDER_DEFAULT}
          transition-all duration-300 flex flex-col w-80
          min-[1580px]:relative min-[1580px]:h-full
          max-[1579px]:fixed max-[1579px]:right-0 max-[1579px]:top-0 max-[1579px]:h-full max-[1579px]:z-50
          overflow-visible pointer-events-auto
        `}>
          {isLoading ? (
            <ActivitySidebarSkeleton />
          ) : (
            <div className={`flex-1 overflow-y-auto scrollbar-hide transition-all duration-300 delay-100 ${
              state.activitySidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900 dark:text-white">Notifications</h3>
                  <button
                    onClick={toggleActivitySidebar}
                    className={`p-1 rounded-lg ${THEME_CLASSES.HOVER_BG} transition-colors duration-200 max-[1579px]:block min-[1580px]:hidden`}
                    title="Close Activity Panel"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="w-3 h-0.5 bg-gray-500 rotate-45 absolute"></div>
                      <div className="w-3 h-0.5 bg-gray-500 -rotate-45 absolute"></div>
                    </div>
                  </button>
                </div>
                {renderNotifications()}
              </div>

              <div className="p-4">
                <h3 className="text-gray-900 dark:text-white mb-4">Activities</h3>
                {renderActivities()}
              </div>

              <div className="p-4">
                <h3 className="text-gray-900 dark:text-white mb-4">Contacts</h3>
                {renderContacts()}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ActivitySidebar;
