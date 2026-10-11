import {
  LeftOutlined,
  LogoutOutlined,
  RightOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import BreadcrumbCustom from "./BreadcrumbCustom";
import styles from "./Header.module.css";

const toggler = [
  <svg
    width='20'
    height='20'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 448 512'
    key={0}
  >
    <path d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'></path>
  </svg>,
];

function Header({ onPress, collapsed, handleCollapsed }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isLogged =
    Boolean(localStorage.getItem("isLogged")) ||
    Boolean(localStorage.getItem("access-token"));
  const user = localStorage.getItem("user") || "User";
  const userId = localStorage.getItem("id");
  const role = localStorage.getItem("role") || "Staff";

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      localStorage.clear();
      localStorage.setItem("isLogged", "");
      window.location.href = "/admin/auth/login";
    }
  };

  const items = [
    {
      key: "user-header",
      label: (
        <div style={{ padding: "4px 8px" }}>
          <div style={{ fontWeight: 600, fontSize: "14px", color: "inherit" }}>
            {user}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#8c8c8c",
              textTransform: "capitalize",
            }}
          >
            {role}
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "profile",
      icon: <UserOutlined style={{ fontSize: "15px" }} />,
      label: (
        <Link
          to={userId ? `/admin/hr/staffs/${userId}` : "/admin/hr/staffs"}
          style={{ display: "inline-block", width: "100%" }}
        >
          My Profile
        </Link>
      ),
    },
    {
      key: "profile-setting",
      icon: <SettingOutlined style={{ fontSize: "15px" }} />,
      label: (
        <Link
          to={
            userId
              ? `/admin/hr/staffs/${userId}/update`
              : "/admin/invoice-setting"
          }
          style={{ display: "inline-block", width: "100%" }}
        >
          Profile Settings
        </Link>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined style={{ fontSize: "15px", color: "#ff4d4f" }} />,
      danger: true,
      label: (
        <Link
          to='/admin/auth/logout'
          style={{
            color: "#ff4d4f",
            fontWeight: 500,
            display: "inline-block",
            width: "100%",
          }}
        >
          Log Out
        </Link>
      ),
    },
  ];

  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  useEffect(() => {
    if (isDarkMode) document.body.className = "dark-theme dark";
    if (!isDarkMode) document.body.className = "light-theme light";
  }, [isDarkMode]);

  return (
    <>
      <div className='flex w-full justify-between items-center pr-8 mr-4 py-1 bg-white dark:bg-[#1C1B20] md:mb-4'>
        <div className='relative flex items-center'>
          <div className='hidden md:flex dark:bg-transparent bg-[rgb(62,87,113)]/90 dark:border-gray-50 border-teal-500 hover:bg-teal-500 border-2 text-white absolute pb-[6px] -left-[38px] w-[33px] h-[33px] rounded-full justify-center items-center z-20'>
            {collapsed ? (
              <RightOutlined
                onClick={() => handleCollapsed(!collapsed)}
                className='text-lg cursor-pointer'
              />
            ) : (
              <LeftOutlined
                onClick={() => handleCollapsed(!collapsed)}
                className='text-lg cursor-pointer'
              />
            )}
          </div>
          {isLogged ? (
            <BreadcrumbCustom />
          ) : (
            <div>
              <h2
                className='text-black text-center ml-4 flex items-center justify-center gap-2'
                style={{ fontSize: "25px" }}
              >
                ERP
                <strong style={{ color: "#6ECCAF	", fontWeight: "bold" }}>
                  OS
                </strong>
              </h2>
            </div>
          )}
        </div>
        <div className='flex items-center gap-3'>
          <DarkModeSwitch
            style={{ margin: "0.5rem" }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
          />

          {isLogged && (
            <Dropdown
              menu={{ items, onClick: handleMenuClick }}
              placement='bottomRight'
              trigger={["hover"]}
            >
              <div
                className='flex items-center gap-2 cursor-pointer py-1 px-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  style={{
                    backgroundColor: "#13c2c2",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  size={34}
                  icon={!user && <UserOutlined />}
                >
                  {user ? user.charAt(0).toUpperCase() : null}
                </Avatar>
                <span className='hidden sm:inline font-medium text-gray-700 dark:text-gray-200 text-sm'>
                  {user}
                </span>
              </div>
            </Dropdown>
          )}

          {isLogged && (
            <Button
              type='link'
              className={styles.sidebarTogglerMobile}
              onClick={() => onPress()}
              style={{ boxShadow: "none" }}
            >
              {toggler}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
