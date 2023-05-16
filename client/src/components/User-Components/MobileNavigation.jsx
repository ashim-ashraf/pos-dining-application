import { Icon, Tabbar, TabbarLink } from "konsta/react";
import React, { useState } from "react";
import { CgHome, CgShoppingBag } from "react-icons/cg";
import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function MobileNavigation() {
  const [activeTab, setActiveTab] = useState("tab-1");
  const navigate = useNavigate();
  return (
    <div className="md:hidden">
      <Tabbar className="left-0 bottom-0 fixed">
        <TabbarLink
          active={activeTab === "tab-1"}
          onClick={() => {
            setActiveTab("tab-1");
            navigate("/");
          }}
          icon={
            <Icon
              ios={<CgHome className="w-7 h-7" />}
              material={<CgHome className="w-6 h-6" />}
            />
          }
        />
        <TabbarLink
        active={activeTab === 'tab-2'}
          onClick={() => {
            setActiveTab("tab-2");
            navigate("/cart")}}
          icon={
            <Icon
              ios={<IoCart className="w-7 h-7" />}
              material={<IoCart className="w-6 h-6" />}
            />
          }
        />
        <TabbarLink
        active={activeTab === 'tab-3'}
          onClick={() => {
            setActiveTab("tab-3");
             navigate("/orders")}}
          icon={
            <Icon
              ios={<CgShoppingBag className="w-7 h-7" />}
              material={<CgShoppingBag className="w-6 h-6" />}
            />
          }
        />
      </Tabbar>
    </div>
  );
}

export default MobileNavigation;
