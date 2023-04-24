import { Icon, Tabbar, TabbarLink } from 'konsta/react'
import React, { useState } from 'react'
import { CgHome, CgSearch, CgShoppingBag } from 'react-icons/cg';
import { IoCart } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function MobileNavigation() {

    const navigate = useNavigate()
  return (
    <div> <Tabbar
    className="left-0 bottom-0 fixed"
  >
    
    <TabbarLink
      onClick={() => navigate("/")}
      icon={
        
          <Icon
            ios={<CgHome className="w-7 h-7" />}
            material={<CgHome className="w-6 h-6" />}
          />
        
      }
    />
    <TabbarLink
      onClick={() => navigate("/cart")}
      icon={
          <Icon
            ios={<IoCart className="w-7 h-7" />}
            material={<IoCart className="w-6 h-6" />}
          />
      }
    />
    <TabbarLink
      onClick={() => navigate("/orders")}
      icon={
          <Icon
            ios={<CgShoppingBag className="w-7 h-7" />}
            material={<CgShoppingBag className="w-6 h-6" />}
          />
      }
    />
  </Tabbar></div>
  )
}

export default MobileNavigation 