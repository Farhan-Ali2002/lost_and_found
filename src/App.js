import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import HomeScreen from './pages/home_screen';
import "./assets/scss/theme.scss";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { CheckBoxOutlineBlankOutlined, Extension } from '@mui/icons-material';
import { Col, Row } from 'reactstrap';

import './App.css';
import ItemsListScreen from './pages/items_list_screen';
import ItemSingle from './pages/item_single';

function App() {
  const { collapseSidebar } = useProSidebar();

  return (
    <Router>
      <Row>
        <Col>
        <header style={{ backgroundColor: "transparent", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", textAlign: "center", padding: "10px 0", borderBottom: "1px solid black", zIndex: 1 }}>
          <h1 style={{ margin: 0, color: "#fff" }}>Reclaim Hub</h1>
        </header>
        </Col>
      </Row>
      <Row>
        {/* Sidebar */}
        <Col xs={2}>
        <Sidebar backgroundColor='transparent' style={{ flex: "none", borderColor: "black" }}>
          <Menu>
            <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={() => {
                collapseSidebar();
              }}
              style={{ textAlign: "center" }}
            >
              {" "}
            </MenuItem>
            <MenuItem icon={<HomeOutlinedIcon />}><NavLink to="/">Home</NavLink></MenuItem>
            <MenuItem icon={<Extension />}><NavLink to="/items-feed">Items Feed</NavLink></MenuItem>
            <MenuItem icon={<CheckBoxOutlineBlankOutlined />}><NavLink to="/found-items">Found Items</NavLink></MenuItem>
            <MenuItem icon={<ReceiptOutlinedIcon />}><NavLink to="/profile">Profile</NavLink></MenuItem>
            <MenuItem icon={<HelpOutlineOutlinedIcon />}><NavLink to="/faq">FAQ</NavLink></MenuItem>
          </Menu>
        </Sidebar>
        </Col>
        <Col>
        <main>
          <Routes>
            <Route path="/" exact element={<HomeScreen/>} />
            <Route path="/items-feed" element={<ItemsListScreen/>} />
            <Route path="/found-items" element={<ItemSingle/>} />
            <Route path="/profile" element={<ItemsListScreen/>} />
            <Route path="/faq" element={<ItemsListScreen/>} />
          </Routes>
        </main>
        </Col>

      </Row>
    </Router>
  );
}

export default App;
