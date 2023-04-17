import { Icon, Tabbar, TabbarLink } from 'konsta/react'
import React, { useState } from 'react'
import { CgHome, CgSearch } from 'react-icons/cg';
import { IoCart } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function MobileNavigation() {
    const [activeTab, setActiveTab] = useState('tab-1');
    const [isTabbarLabels, setIsTabbarLabels] = useState(false);
    const [isTabbarIcons, setIsTabbarIcons] = useState(true);
    const navigate = useNavigate()
  return (
    <div> <Tabbar
    labels={isTabbarLabels}
    icons={isTabbarIcons}
    className="left-0 bottom-0 fixed"
  >
    <TabbarLink
      active={activeTab === 'tab-1'}
      onClick={() => navigate("/mobile/home")}
      icon={
        isTabbarIcons && (
          <Icon
            ios={<CgHome className="w-7 h-7" />}
            material={<CgHome className="w-6 h-6" />}
          />
        )
      }
      label={isTabbarLabels && 'Home'}
    />
    <TabbarLink
      active={activeTab === 'tab-2'}
      onClick={() => setActiveTab('tab-2')}
      icon={
        isTabbarIcons && (
          <Icon
            ios={<CgSearch className="w-7 h-7" />}
            material={<CgSearch className="w-6 h-6" />}
          />
        )
      }
      label={isTabbarLabels && 'Search'}
    />
    <TabbarLink
      active={activeTab === 'tab-3'}
      onClick={() => setActiveTab('tab-3')}
      icon={
        isTabbarIcons && (
          <Icon
            ios={<IoCart className="w-7 h-7" />}
            material={<IoCart className="w-6 h-6" />}
          />
        )
      }
      label={isTabbarLabels && 'Cart'}
    />
  </Tabbar></div>
  )
}

export default MobileNavigation 