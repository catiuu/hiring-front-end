import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import { fetchProducts } from "../services/productsAPI";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  avatar: string;
  price: number;
};

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const { closeCart, cartItems } = useShoppingCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const loadedProducts: Product[] = await fetchProducts();
        setProducts(loadedProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Carrinho</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = products.find(
                  (product) => product.id === cartItem.id
                );
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
