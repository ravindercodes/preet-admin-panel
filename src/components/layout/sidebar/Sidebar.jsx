import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './sidebar.css';
import LogoutIcon from '../../../images/Logout.svg';
import SidebarLogo from '../../../images/small-logo.png';
import { MenuItems } from "./Sidemenus";
import { DropdownSvg } from "../../../svgFiles/DropdownSvg";
import { useDispatch } from "react-redux";
import { dmApi } from "../../../app/dmApi";

const userRole = "admin"; // Consider making this dynamic (e.g., from user context)

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeKey, setActiveKey] = useState(null);

    useEffect(() => {
        // Close all accordions when navigating to Dashboard
        if (location.pathname === "/dashboard") {
            setActiveKey(null);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.clear();
        dispatch(dmApi.util.resetApiState());
        navigate("/login");
    };

    const renderMenuItem = (item, index) => {
        const isParentActive = item.subMenu.some((subItem) => location.pathname === subItem.path);
        const isActive = location.pathname === item.path || isParentActive;

        return (
            <li key={index} className={`outerlist ${isActive ? "activeLink" : ""}`}>
                {item.subMenu.length > 0 ? (
                    <Accordion.Item eventKey={String(index)} className="border-0">
                        <Accordion.Header>
                            {item.icon} {item.title} <span className="arrow_down">{DropdownSvg}</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ul className="list-unstyled">
                                {item.subMenu
                                    .filter((subItem) => subItem.roles.includes(userRole))
                                    .map((subItem, subIndex) => (
                                        <li key={subIndex} className={location.pathname === subItem.path ? "active_accordian" : ""}>
                                            <Link to={subItem.path} className="text-decoration-none">
                                                {subItem.title}
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                ) : (
                    <Link to={item.path} className="text-decoration-none d-flex align-items-center gap-2"> {/* Added align-items-center */}
                        {item.icon} {item.title}
                    </Link>
                )}
            </li>
        );
    };

    return (
        <div className="side_bar">
            <div className="side_logo text-center">
                <img src={SidebarLogo} alt="logo" />
            </div>
            <ul className="list-unstyled">
                <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                    {MenuItems
                        .filter((item) => item.roles.includes(userRole))
                        .map(renderMenuItem)} {/* Use the renderMenuItem function */}
                </Accordion>
                <li className="logout" onClick={handleLogout}>
          <span>
            <img src={LogoutIcon} alt="logout" /> Log out
          </span>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;