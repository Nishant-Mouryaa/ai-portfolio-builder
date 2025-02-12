import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Button,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import {
  FaUserCircle,
  FaEdit,
  FaPalette,
  FaSave,
  FaRobot,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import ThemeToggle from './ThemeToggle';
import './Sidebar.css'; // Import the CSS file for additional styling

const Sidebar = ({ onSelectOption }) => {
  const { userData } = usePortfolio() || {};

  // Determine mobile mode based on initial window width.
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // On mobile, collapsed means hidden (off-canvas); on desktop, collapsed means minimized.
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);

  // Update mobile state on viewport changes.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = (e) => {
      setIsMobile(e.matches);
      setIsCollapsed(e.matches); // On mobile, auto-hide sidebar on viewport change.
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  // Toggle sidebar collapsed state.
  const handleToggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  // Menu items.
  const menuItems = [
    { key: 'edit', label: 'Edit Portfolio', icon: <FaEdit size={18} /> },
    { key: 'customize', label: 'Customize Appearance', icon: <FaPalette size={18} /> },
    { key: 'ai', label: 'AI Content Generator', icon: <FaRobot size={18} /> },
  ];

  // Sidebar content common to mobile and desktop.
  const sidebarContent = (
    <div className="d-flex flex-column h-100 sidebar-content">
      <Container fluid className="p-0">
        {/* Profile Section */}
        <div className={`sidebar-profile p-3 border-bottom text-center ${!isMobile && isCollapsed ? 'd-none' : ''}`}>
          <FaUserCircle size={50} className="text-primary" />
          <h5 className="mt-2">{userData?.name || 'Your Name'}</h5>
          <p className="text-muted">{userData?.plan || 'Free Plan'}</p>
        </div>

        {/* Navigation Menu */}
        <ListGroup variant="flush" className="sidebar-menu">
          {menuItems.map((item) => (
            <ListGroup.Item
              action
              key={item.key}
              onClick={() => {
                onSelectOption?.(item.key);
                if (isMobile) setIsCollapsed(true); // Auto-hide overlay on mobile when selecting an option
              }}
              className="d-flex align-items-center sidebar-menu-item"
            >
              {(!isMobile && isCollapsed) ? (
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id={`tooltip-${item.key}`}>{item.label}</Tooltip>}
                >
                  <div>{item.icon}</div>
                </OverlayTrigger>
              ) : (
                <>
                  {item.icon}
                  <span className="ms-2">{item.label}</span>
                </>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Action Buttons */}
        <div className="mt-auto d-grid gap-2 p-3 sidebar-actions">
          {(!isMobile && isCollapsed) ? (
            <>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip-save">Save Portfolio</Tooltip>}
              >
                <Button variant="primary" className="sidebar-action-btn">
                  <FaSave size={18} />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip-publish">Publish Portfolio</Tooltip>}
              >
                <Button variant="success" className="sidebar-action-btn">
                  <FaSave size={18} />
                </Button>
              </OverlayTrigger>
            </>
          ) : (
            <>
              <Button variant="primary" className="d-flex align-items-center sidebar-action-btn">
                <FaSave className="me-2" size={18} />
                Save Portfolio
              </Button>
              <Button variant="success" className="d-flex align-items-center sidebar-action-btn">
                <FaSave className="me-2" size={18} />
                Publish Portfolio
              </Button>
              <ThemeToggle />
            </>
          )}
        </div>
      </Container>
    </div>
  );

  // Mobile view: render a fixed toggle button and overlay sidebar.
  if (isMobile) {
    return (
      <>
        <Button
          variant="outline-dark"
          onClick={handleToggle}
          aria-label={isCollapsed ? 'Open sidebar' : 'Close sidebar'}
          className="mobile-toggle-btn"
        >
          {isCollapsed ? <FaBars size={24} /> : <FaTimes size={24} />}
        </Button>
        <div className="mobile-sidebar" style={{ transform: isCollapsed ? 'translateX(-100%)' : 'translateX(0)' }}>
          {sidebarContent}
        </div>
      </>
    );
  }

  // Desktop view: render a sticky sidebar with smooth width transitions.
  // In Sidebar.jsx (desktop view)
return (
  <div className={`desktop-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
    <Button
      variant="outline-dark"
      onClick={handleToggle}
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      className="desktop-toggle-btn"
    >
      {isCollapsed ? <FaBars size={24} /> : <FaTimes size={24} />}
    </Button>
    {sidebarContent}
  </div>
);

};

Sidebar.propTypes = {
  onSelectOption: PropTypes.func,
};

export default React.memo(Sidebar);
