import React, { useState, useEffect } from 'react';
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

const Sidebar = ({ onSelectOption }) => {
  const { userData } = usePortfolio() || {};

  // For desktop: isCollapsed true means minimized (60px); false means expanded (250px)
  // For mobile: isCollapsed true means hidden (off-canvas); false means visible (overlay)
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Listen for changes in viewport width to update mobile state.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = (e) => {
      setIsMobile(e.matches);
      // On mobile, auto-collapse (hide) the sidebar.
      setIsCollapsed(e.matches);
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

  const handleToggle = () => setIsCollapsed((prev) => !prev);

  // Define styling for mobile and desktop differently.
  let sidebarStyle = {};
  if (isMobile) {
    // On mobile, we use a fixed overlay that slides in/out.
    sidebarStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '250px',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      transition: 'transform 0.3s ease-in-out',
      transform: isCollapsed ? 'translateX(-100%)' : 'translateX(0)',
      zIndex: 1050,
      overflowY: 'auto',
    };
  } else {
    // On desktop, toggle the width.
    sidebarStyle = {
      width: isCollapsed ? '60px' : '250px',
      transition: 'width 0.3s',
      overflowX: 'hidden',
    };
  }

  // Define menu items.
  const menuItems = [
    { key: 'edit', label: 'Edit Portfolio', icon: <FaEdit size={18} /> },
    { key: 'customize', label: 'Customize Appearance', icon: <FaPalette size={18} /> },
    { key: 'ai', label: 'AI Content Generator', icon: <FaRobot size={18} /> },
  ];

  // Sidebar content (common for mobile and desktop).
  const sidebarContent = (
    <div className="d-flex flex-column" style={{ height: '100%' }}>
      <Container fluid className="p-0">
        {/* Profile Section (hidden in collapsed state on desktop) */}
        <div className={`p-3 border-bottom text-center ${!isMobile && isCollapsed ? 'd-none' : ''}`}>
          <FaUserCircle size={50} className="text-primary" />
          <h5 className="mt-2">{userData?.name || 'Your Name'}</h5>
          <p className="text-muted">{userData?.plan || 'Free Plan'}</p>
        </div>

        {/* Navigation Menu */}
        <ListGroup variant="flush">
          {menuItems.map((item) => (
            <ListGroup.Item
              action
              key={item.key}
              onClick={() => {
                onSelectOption?.(item.key);
                if (isMobile) setIsCollapsed(true); // auto-hide overlay on mobile when selecting an option
              }}
              className="d-flex align-items-center"
            >
              {/* On desktop and expanded, show icon and label; if collapsed, show tooltip only */}
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
        <div className="mt-4 d-grid gap-2 p-3">
          {(!isMobile && isCollapsed) ? (
            <>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip-save">Save Portfolio</Tooltip>}
              >
                <Button variant="primary">
                  <FaSave size={18} />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip-publish">Publish Portfolio</Tooltip>}
              >
                <Button variant="success">
                  <FaSave size={18} />
                </Button>
              </OverlayTrigger>
            </>
          ) : (
            <>
              <Button variant="primary">
                <FaSave className="me-2" size={18} />
                Save Portfolio
              </Button>
              <Button variant="success">
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

  // On mobile, render a fixed toggle button outside the overlay.
  if (isMobile) {
    return (
      <>
        <Button
          variant="outline-dark"
          onClick={handleToggle}
          aria-label={isCollapsed ? 'Open sidebar' : 'Close sidebar'}
          style={{
            position: 'fixed',
            top: 10,
            left: 10,
            zIndex: 1100,
          }}
        >
          {isCollapsed ? <FaBars size={24} /> : <FaTimes size={24} />}
        </Button>
        <div style={sidebarStyle}>{sidebarContent}</div>
      </>
    );
  }

  // Desktop view.
  return (
    <div style={sidebarStyle}>
      <Button
        variant="outline-dark"
        className="mb-3 align-self-start"
        onClick={handleToggle}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
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

export default Sidebar;
