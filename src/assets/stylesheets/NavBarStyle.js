import { createGlobalStyle } from "styled-components";
import fontFace from "./fontFace";
const NavBarStyle = createGlobalStyle`
  ${fontFace}

*{
  font-size:14px;
}

span {
  font-size: 13px;
  padding-left: 10px;
}
img {
  margin-left: 10px;
}

.navbar-brand{
  padding-right: 10px !important;
  margin: 0px !important;
}
.navbar-collapse.in {
  overflow-y: auto;
  overflow-x: auto;
}
.dropdown-toggle,
.nav-link {
  padding: 10px 8px;
}
li > a {
  line-height: 20px;
}

.dropdown-menu {
  max-height: 500px;
  font-size: 14px;
  overflow-y: auto;
  border-top-color: transparent;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  padding: 5px 0px;
  position: absolute;
}
.dropdown-menu.show {
  margin-top: 7px !important;
}
.dropdown-menu .dropdown-item {
  font-size: 14px;
  padding: 2px 20px;
}
.dropdown-menu::-webkit-scrollbar {
  width: 8px;
}
.dropdown-menu::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.04);
}
.dropdown-menu::-webkit-scrollbar-track {
  background-color: #fff;
}

@media screen and (max-width: 1270px) and (max-height: 961px) {
  .navbar{
    display:flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 1200px) {
  .navbar-brand{
    display: flex;
    flex-direction: row;
  }
  span {
    max-width: 80px !important;
    margin-top: 3px !important;
    font-size: 12px !important;
    line-height: 1.3 !important;
    overflow-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }
}
@media screen and (max-width: 990px) and (max-height: 961px) {
.navbar{
    display:flex;
    flex-direction: row;
    align-items: flex-start;
    font-size:12px !important;
  }
  .navbar-collapse {
    padding-right: 15px;
    padding-left: 15px;
    overflow-x: visible;
    overflow-y: auto;
    padding-bottom: 15px;
    max-height: 340px !important;
    border: 1px solid transparent !important;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  .collapse.show {
    padding-top: 15px;
    padding-bottom: 15px;
    height: 290px !important;
  }
  .dropdown-menu.show {
    background-color: #212529;
    max-height: 290px;
    padding: 0px;
  }
  .dropdown-item {
    color: #9d9d9d;
    padding: 5px 15px 5px 25px;
    height: 30px;
  }
  .dropdown-menu > li > a {
    display: block;
  }
  .dropdown-item:hover {
    color: #fff;
    background-color: #212529;
  }
  .dropdown-menu.show:hover {
    font-weight: 500;
  }
  .dropdown-toggle,
  .nav-link {
    height: 40px;
  }
  .dropdown-toggle:hover,
  .nav-link:hover {
    color: #fff;
  }
  .dropdown-toggle.show.nav-link {
    background-color: black;
  }
  .navbar-collapse {
    padding-right: 0px;
    padding-left: 0px;
  }
  .navbar-collapse.in {
    overflow-y: visible !important;
  }
  .dropdown-menu::-webkit-scrollbar-track {
    background-color: #212529;
  }
}
`;

export default NavBarStyle;