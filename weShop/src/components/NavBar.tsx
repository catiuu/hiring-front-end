import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useSearch } from "../context/SearchContext";

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav>
          <Nav.Link to="/" as={NavLink}>
            <h1>WeShop</h1>
          </Nav.Link>
        </Nav>
        <Nav>
          <input
            className="form-control border border-primary mr-sm-2 mr-5"
            type="search"
            placeholder="Buscar produto"
            aria-label="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Nav.Link to="/" as={NavLink}>
            Início
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Produtos
          </Nav.Link>

          <Button
            onClick={openCart}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
          >
            <FiShoppingCart size={20} />

            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        </Nav>
      </Container>
    </NavbarBs>
  );
}
