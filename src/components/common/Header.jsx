import { FaSearch, FaHeart } from "react-icons/fa";
import "./Header.css";
import PersonIcon from '@mui/icons-material/Person';
import { Chip } from "@mui/material";
import { Navbar, Nav, NavDropdown,  } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    background-color: #DA4C4CFF;
    color: #ffffff;
    top: -12px;
    right: -6px;
  }
`;
const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="promo-banner">
        <span className="left">
          <i className="fa fa-phone"></i> (+216) 21 298 233
        </span>
        <span className="center">
          <i className="fa-solid fa-truck-fast"></i> Livraison gratuite à partir de 99 DT d'achat
        </span>
      </div>

      <div className="header-main">
        <div className="logo">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dr09h69he/image/upload/v1741823420/463973226_419263521219478_9170913468475389171_n_vlsgxl.png"
              alt="Logo Perla Coif"
            />
          </Link>
        </div>

        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Rechercher un produit, une marque..." />
        </div>

        <div className="header-icons">
          <div className="icon-item">
            <Chip
              className="se-connecter"
              icon={<PersonIcon />}
              label="Se connecter"
              variant="outlined"
              onClick={() => navigate("/login")}
            />
          </div>
          <i className="fa-regular fa-heart fa-xl"></i>
          <IconButton>
            <ShoppingCartIcon fontSize="large" sx={{ color: "black" }} />
            <CartBadge badgeContent={2}  overlap="circular"  />
          </IconButton>
        </div>
      </div>

      <Navbar expand="lg" className="navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="navbar-nav">
            <Nav.Link href="#">Marques</Nav.Link>
            <Nav.Link href="/card">Product</Nav.Link>

            <NavDropdown title="Teint" id="nav-dropdown-teint">
              <NavDropdown.Item href="#">Fond de teint</NavDropdown.Item>
              <NavDropdown.Item href="#">Blush & Highlighter</NavDropdown.Item>
              <NavDropdown.Item href="#">Pinceaux & Eponges</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Yeux" id="nav-dropdown-yeux">
              <NavDropdown.Item href="#">Mascaras</NavDropdown.Item>
              <NavDropdown.Item href="#">Palettes</NavDropdown.Item>
              <NavDropdown.Item href="#">Crayons</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Lèvres" id="nav-dropdown-levres">
              <NavDropdown.Item href="#">Rouges à lèvres</NavDropdown.Item>
              <NavDropdown.Item href="#">Gloss</NavDropdown.Item>
              <NavDropdown.Item href="#">Crayons à lèvres</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Ongles" id="nav-dropdown-ongles">
              <NavDropdown.Item href="#">Verni normal</NavDropdown.Item>
              <NavDropdown.Item href="#">Verni permanent</NavDropdown.Item>
              <NavDropdown.Item href="#">Accessoires ongles</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Cheveux" id="nav-dropdown-cheveux">
              <NavDropdown.Item href="#">Shampoing</NavDropdown.Item>
              <NavDropdown.Item href="#">Soin cheveux</NavDropdown.Item>
              <NavDropdown.Item href="#">Accessoires</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Soin" id="nav-dropdown-soin">
              <NavDropdown.Item href="#">Soin visage</NavDropdown.Item>
              <NavDropdown.Item href="#">Soin corps</NavDropdown.Item>
              <NavDropdown.Item href="#">Parfum & brume</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      
    </header>
  );
};

export default Header;
