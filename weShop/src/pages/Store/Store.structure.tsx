import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Product } from "../../components/Product";
import { fetchProducts } from "../../services/productsAPI";
import { useSearch } from "../../context/SearchContext";
import { Footer } from "../../components/Footer";

export default function Store() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Row md={2} xs={1} lg={4} className="g-3">
        {filteredProducts.length === 0 && (
          <p>Nenhum produto encontrado para sua busca.</p>
        )}
        {filteredProducts.map((item) => (
          <Col key={item.id}>
            <Product {...item} />
          </Col>
        ))}
      </Row>
      <Footer />
    </>
  );
}
