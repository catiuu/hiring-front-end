import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { fetchProducts } from "../services/productsAPI";
import { formatCurrency } from "../utilities/formatCurrency";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  avatar: string;
  price: number;
};

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeAllFromCart } = useShoppingCart();

  const [products, setProducts] = useState<Product[]>([]);

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

  const product = products.find((item) => item.id === id);

  if (!product) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={product.avatar}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {product.name}{" "}
          {quantity > 0 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(product.price)}
        </div>
      </div>
      <div> {formatCurrency(product.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeAllFromCart(product.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
