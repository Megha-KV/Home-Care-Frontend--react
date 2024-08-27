import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  FormOutlined,
  LoginOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { UserContext } from "../context/userContext";

const { Sider } = Layout;

const SideBar = () => {
  const { user, updateUser } = useContext(UserContext);
  const [collapsed, setCollapsed] = React.useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    // Clear user context when logging out
    
    updateUser(null);
  };

  return (
    <div>
      <Sider
        collapsed={collapsed}
        className="sidebar"
        style={{ height: "100vh" }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          collapsed={collapsed}
        >
          <Menu.Item
            key="1"
            icon={<LoginOutlined style={{ fontSize: "24px" }} />}
          >
            <Link to="/" onClick={handleLogout} style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
          </Menu.Item>
         
          <Menu.SubMenu
            key="sub1"
            icon={<FormOutlined style={{ fontSize: "24px" }} />}
            title="Forms"
          >
            {user?.role === "Admin" && (
              <Menu.Item key="5">
                <Link to="/admin-dashboard">Admin DashBoard</Link>
              </Menu.Item>
            )}
            {user?.role === "Doctor" && (
              <Menu.Item key="9">
                <Link to="/doctor-dashboard">Doctor Dashboard</Link>
              </Menu.Item>
            )}
            {user?.role === "Nurse" && (
              <Menu.Item key="12">
                <Link to="/nurse-dashboard">Nurse Dashboard</Link>
              </Menu.Item>
            )}
          </Menu.SubMenu>
          
        </Menu>
      </Sider>
    </div>
  );
};

export default SideBar;