import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from './Icons';
import { THEME_CLASSES } from '../utils/theme';
import { useApp } from '../contexts/AppContext';
import byeWindLogo from '../assets/ByeWind.svg';

import DefaultIcon from './icons/DefaultIcon';
import EcommerceIcon from './icons/EcommerceIcon';
import ProjectsIcon from './icons/ProjectsIcon';
import OnlineCoursesIcon from './icons/OnlineCoursesIcon';
import UserProfileIcon from './icons/UserProfileIcon';
import AccountIcon from './icons/AccountIcon';
import CorporateIcon from './icons/CorporateIcon';
import BlogIcon from './icons/BlogIcon';
import SocialIcon from './icons/SocialIcon';


interface NavItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string; size?: number }> | string;
  active?: boolean;
  hasSubmenu?: boolean;
  submenu?: NavItem[];
  path?: string;
}



const dashboardItems: NavItem[] = [
  { 
    id: 'default', 
    label: 'Default', 
    icon: DefaultIcon, 
    active: true, 
    path: '/default',
    hasSubmenu: false
  },
  { 
    id: 'ecommerce', 
    label: 'eCommerce', 
    icon: EcommerceIcon, 
    active: false, 
    hasSubmenu: true,
    submenu: [
      { id: 'ecommerce-overview', label: 'Overview' },
      { id: 'ecommerce-analytics', label: 'Analytics' }
    ]
  },
  { 
    id: 'projects', 
    label: 'Projects', 
    icon: ProjectsIcon, 
    active: false, 
    hasSubmenu: true,
    submenu: [
      { id: 'projects-overview', label: 'Overview' },
      { id: 'projects-active', label: 'Active' },
      { id: 'projects-completed', label: 'Completed' }
    ]
  },
  { 
    id: 'online-courses', 
    label: 'Online Courses', 
    icon: OnlineCoursesIcon, 
    active: false, 
    hasSubmenu: true,
    submenu: [
      { id: 'courses-overview', label: 'Overview' },
      { id: 'courses-catalog', label: 'Catalog' },
      { id: 'courses-students', label: 'Students' }
    ]
  }
];

const pagesItems: NavItem[] = [
  { 
    id: 'user-profile', 
    label: 'User Profile', 
    icon: UserProfileIcon, 
    active: false,
    hasSubmenu: true,
    submenu: [
      { id: 'profile-overview', label: 'Overview' },
      { id: 'profile-projects', label: 'Projects' },
      { id: 'profile-campaigns', label: 'Campaigns' },
      { id: 'profile-documents', label: 'Documents' },
      { id: 'profile-followers', label: 'Followers' }
    ]
  },
  { 
    id: 'account', 
    label: 'Account', 
    icon: AccountIcon, 
    active: false,
    hasSubmenu: true,
    submenu: [
      { id: 'account-settings', label: 'Settings' },
      { id: 'account-security', label: 'Security' },
      { id: 'account-billing', label: 'Billing' }
    ]
  },
  { 
    id: 'corporate', 
    label: 'Corporate', 
    icon: CorporateIcon, 
    active: false,
    hasSubmenu: true,
    submenu: [
      { id: 'corporate-overview', label: 'Overview' },
      { id: 'corporate-team', label: 'Team' },
      { id: 'corporate-departments', label: 'Departments' }
    ]
  },
  { 
    id: 'blog', 
    label: 'Blog', 
    icon: BlogIcon, 
    active: false,
    hasSubmenu: true,
    submenu: [
      { id: 'blog-posts', label: 'Posts' },
      { id: 'blog-categories', label: 'Categories' },
      { id: 'blog-comments', label: 'Comments' }
    ]
  },
  { 
    id: 'social', 
    label: 'Social', 
    icon: SocialIcon, 
    active: false,
    hasSubmenu: true,
    submenu: [
      { id: 'social-feed', label: 'Feed' },
      { id: 'social-connections', label: 'Connections' },
      { id: 'social-messages', label: 'Messages' }
    ]
  }
];

const Sidebar: React.FC = React.memo(() => {
  const { state, toggleSidebar } = useApp();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'favorites' | 'recently'>('favorites');

  const toggleExpanded = useCallback((itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }, []);

  const renderNavItem = (item: NavItem, isSubmenu = false) => {
    const isExpanded = expandedItems.includes(item.id);
    const isActive = location.pathname === item.path;
    
    const content = (
      <div
        className={`
          flex items-center px-3 py-2.5 mx-2 rounded-lg cursor-pointer transition-all duration-200 group relative
          ${isActive 
            ? item.id === 'default' 
              ? 'dark:bg-zinc-800 bg-zinc-200 text-white' 
              : `${THEME_CLASSES.HOVER_BG} ${THEME_CLASSES.TEXT_PRIMARY}`
            : `${THEME_CLASSES.TEXT_SECONDARY} ${THEME_CLASSES.HOVER_BG}`
          }
          ${isSubmenu ? 'text-sm' : ''}
          ${!state.sidebarOpen ? 'justify-center' : ''}
        `}
        onClick={() => item.hasSubmenu && toggleExpanded(item.id)}
        onKeyDown={(e) => item.hasSubmenu && handleKeyDown(e, () => toggleExpanded(item.id))}
        role={item.hasSubmenu ? "button" : undefined}
        tabIndex={item.hasSubmenu ? 0 : undefined}
        aria-expanded={item.hasSubmenu ? isExpanded : undefined}
        aria-label={item.hasSubmenu ? `${item.label} menu` : item.label}
      >
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-black dark:bg-white rounded-r"></div>
        )}
        
        <div className={`flex items-center ${state.sidebarOpen ? 'space-x-3' : 'justify-center'}`}>
          {state.sidebarOpen && (
            <div className="w-4 h-4 flex items-center justify-center">
              {item.hasSubmenu ? (
                <ChevronRightIcon 
                  size={16} 
                  className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''} text-gray-400`}
                />
              ) : null}
            </div>
          )}
          
          {item.icon && (
            <>
              {typeof item.icon === 'string' ? (
                <img 
                  src={item.icon}
                  alt="" 
                  className={`transition-colors duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                  } ${!state.sidebarOpen ? 'mx-auto' : ''}`}
                  style={{ width: isSubmenu ? 16 : 20, height: isSubmenu ? 16 : 20 }}
                />
              ) : (
                <item.icon 
                  size={isSubmenu ? 16 : 20} 
                  className={`transition-colors duration-200 ${
                    isActive 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white'
                  } ${!state.sidebarOpen ? 'mx-auto' : ''}`} 
                />
              )}
            </>
          )}
          {state.sidebarOpen && (
            <h3 className="text-gray-900 dark:text-white text-sm transition-colors duration-200">
              {item.label}
            </h3>
          )}
        </div>
        
        {!state.sidebarOpen && !isSubmenu && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
            {item.label}
          </div>
        )}
      </div>
    );

    return (
      <div key={item.id} className={`${isSubmenu ? 'ml-6' : ''}`}>
        {item.path && !item.hasSubmenu ? (
          <Link to={item.path}>
            {content}
          </Link>
        ) : (
          content
        )}
        
        {item.hasSubmenu && item.submenu && isExpanded && state.sidebarOpen && (
          <div className="mt-1 space-y-1">
            {item.submenu.map(subItem => renderNavItem(subItem, true))}
          </div>
        )}
      </div>
    );
  };

  const renderSimpleItem = (label: string, isActive = false) => (
    <div className={`
      flex items-center px-3 py-2.5 mx-2 rounded-lg cursor-pointer transition-all duration-200 group relative
      ${isActive 
        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
        : 'text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
      }
      ${!state.sidebarOpen ? 'justify-center' : 'space-x-3'}
    `}>
      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-400'} ${!state.sidebarOpen ? 'mx-auto' : ''}`}></div>
      {state.sidebarOpen && (
        <span className="text-gray-900 dark:text-white">{label}</span>
      )}
      
      {!state.sidebarOpen && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden z-40 ${
          state.sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />
      
      <div className={`
        fixed left-0 top-0 h-full ${THEME_CLASSES.DASHBOARD_BG} ${THEME_CLASSES.BORDER_DEFAULT} border-r
        transition-all duration-300 z-50 flex flex-col
        ${state.sidebarOpen ? 'w-54' : 'w-16'}
        lg:relative lg:translate-x-0
        ${state.sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4">
          {state.sidebarOpen ? (
            <Link to="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <img src={byeWindLogo} alt="ByeWind" className="w-8 h-8" />
              <h1 className="text-gray-900 dark:text-white text-secondary text-lg">ByeWind</h1>
            </Link>
          ) : (
            <Link to="/dashboard" className="flex items-center justify-center w-full hover:opacity-80 transition-opacity duration-200">
              <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className={`p-1 rounded-lg ${THEME_CLASSES.HOVER_BG} transition-colors duration-200 ${!state.sidebarOpen ? 'absolute top-4 right-2' : ''}`}
            title={state.sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            <ChevronRightIcon 
              size={20} 
              className={`transition-transform duration-200 block lg:hidden ${state.sidebarOpen ? 'rotate-180' : ''} text-gray-500`}
            />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide py-4 space-y-6">
          <div>
            {state.sidebarOpen && (
              <div className="flex mb-3 px-4">
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`px-3 py-1 text-secondary rounded transition-colors duration-200 ${
                    activeTab === 'favorites'
                       ? `${THEME_CLASSES.HOVER_BG} text-gray-900 dark:text-white`
                      : `text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300`
                  }`}
                >
                  Favorites
                </button>
                <button
                  onClick={() => setActiveTab('recently')}
                  className={`px-3 py-1 text-secondary rounded transition-colors duration-200 ${
                    activeTab === 'recently'
                      ? `${THEME_CLASSES.HOVER_BG} text-gray-900 dark:text-white`
                      : `text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300`
                  }`}
                >
                  Recently
                </button>
              </div>
            )}
            
            <div className="space-y-1 text-secondary">
              {activeTab === 'favorites' ? (
                <>
                  {renderSimpleItem('Overview')}
                  {renderSimpleItem('Projects')}
                </>
              ) : (
                <>
                  {renderSimpleItem('Overview')}
                  {renderSimpleItem('Projects')}
                </>
              )}
            </div>
          </div>

          <div>
            <h6 className={`text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide mb-3 px-4 transition-opacity duration-200 ${
              state.sidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}>
              Dashboards
            </h6>
            <div className="space-y-1">
              {dashboardItems.map(item => renderNavItem(item))}
            </div>
          </div>

          <div>
            <h6 className={`text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide mb-3 px-4 transition-opacity duration-200 ${
              state.sidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}>
              Pages
            </h6>
            <div className="space-y-1">
              {pagesItems.map(item => renderNavItem(item))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
