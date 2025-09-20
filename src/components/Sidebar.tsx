import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from './Icons';
import ByeWind from '../assets/Sidebar/ByeWind.svg';
import { THEME_CLASSES } from '../utils/theme';

import DefaultIcon from './icons/DefaultIcon';
import EcommerceIcon from './icons/EcommerceIcon';
import ProjectsIcon from './icons/ProjectsIcon';
import OnlineCoursesIcon from './icons/OnlineCoursesIcon';
import UserProfileIcon from './icons/UserProfileIcon';
import AccountIcon from './icons/AccountIcon';
import CorporateIcon from './icons/CorporateIcon';
import BlogIcon from './icons/BlogIcon';
import SocialIcon from './icons/SocialIcon';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

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

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'favorites' | 'recently'>('favorites');

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderNavItem = (item: NavItem, isSubmenu = false) => {
    const isExpanded = expandedItems.includes(item.id);
    const isActive = location.pathname === item.path;
    
    const content = (
      <div
        className={`
          flex items-center px-3 py-2.5 mx-2 rounded-lg cursor-pointer transition-all duration-200 group relative
          ${isActive 
            ? `${THEME_CLASSES.HOVER_BG} ${THEME_CLASSES.TEXT_PRIMARY}` 
            : `${THEME_CLASSES.TEXT_SECONDARY} ${THEME_CLASSES.HOVER_BG}`
          }
          ${isSubmenu ? 'text-sm' : ''}
          ${!isOpen ? 'justify-center' : ''}
        `}
        onClick={() => item.hasSubmenu && toggleExpanded(item.id)}
      >
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-black dark:bg-white rounded-r"></div>
        )}
        
        <div className={`flex items-center ${isOpen ? 'space-x-3' : 'justify-center'}`}>
          {isOpen && (
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
                  } ${!isOpen ? 'mx-auto' : ''}`}
                  style={{ width: isSubmenu ? 16 : 20, height: isSubmenu ? 16 : 20 }}
                />
              ) : (
                <item.icon 
                  size={isSubmenu ? 16 : 20} 
                  className={`transition-colors duration-200 ${
                    isActive 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white'
                  } ${!isOpen ? 'mx-auto' : ''}`} 
                />
              )}
            </>
          )}
          {isOpen && (
            <span className={`text-sm font-medium transition-colors duration-200 text-gray-900 dark:text-white`}>
              {item.label}
            </span>
          )}
        </div>
        
        {!isOpen && !isSubmenu && (
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
        
        {item.hasSubmenu && item.submenu && isExpanded && isOpen && (
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
      ${!isOpen ? 'justify-center' : 'space-x-3'}
    `}>
      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-400'} ${!isOpen ? 'mx-auto' : ''}`}></div>
      {isOpen && (
        <span className="text-xs font-medium">{label}</span>
      )}
      
      {!isOpen && (
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
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
      />
      
      <div className={`
        fixed left-0 top-0 h-full ${THEME_CLASSES.DASHBOARD_BG} ${THEME_CLASSES.BORDER_DEFAULT} border-r
        transition-all duration-300 z-50 flex flex-col
        ${isOpen ? 'w-54' : 'w-16'}
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4">
          {isOpen ? (
            <Link to="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <img src={ByeWind} alt="ByeWind" />
              <span className={`text-xl font-medium ${THEME_CLASSES.TEXT_PRIMARY}`}>ByeWind</span>
            </Link>
          ) : (
            <Link to="/dashboard" className="flex items-center justify-center w-full hover:opacity-80 transition-opacity duration-200">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
            </Link>
          )}
          <button
            onClick={onToggle}
            className={`p-1 rounded-lg ${THEME_CLASSES.HOVER_BG} transition-colors duration-200 ${!isOpen ? 'absolute top-4 right-2' : ''}`}
            title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            <ChevronRightIcon 
              size={20} 
              className={`transition-transform duration-200 block lg:hidden ${isOpen ? 'rotate-180' : ''} text-gray-500`}
            />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide py-4 space-y-6">
          <div>
            {isOpen && (
              <div className="flex mb-3 px-4">
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`text-xs font-medium px-3 py-1 rounded transition-colors duration-200 text-gray-900 dark:text-white ${
                    activeTab === 'favorites'
                      ? `${THEME_CLASSES.HOVER_BG}`
                      : `hover:${THEME_CLASSES.HOVER_BG}`
                  }`}
                >
                  Favorites
                </button>
                <button
                  onClick={() => setActiveTab('recently')}
                  className={`text-xs font-medium px-3 py-1 rounded transition-colors duration-200 text-gray-900 dark:text-white ${
                    activeTab === 'recently'
                      ? `${THEME_CLASSES.HOVER_BG}`
                      : `hover:${THEME_CLASSES.HOVER_BG}`
                  }`}
                >
                  Recently
                </button>
              </div>
            )}
            
            <div className="space-y-1">
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
            <div className={`text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-4 transition-opacity duration-200 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}>
              Dashboards
            </div>
            <div className="space-y-1">
              {dashboardItems.map(item => renderNavItem(item))}
            </div>
          </div>

          <div>
            <div className={`text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-4 transition-opacity duration-200 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}>
              Pages
            </div>
            <div className="space-y-1">
              {pagesItems.map(item => renderNavItem(item))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
