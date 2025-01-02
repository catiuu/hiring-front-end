import { useState, useEffect } from "react";
import { fetchProducts } from "../../services/productsAPI";
import HomeImg from "../../../public/home.jpg";
import { Col, Row } from "react-bootstrap";
import { Product } from "../../components/Product";
import { useSearch } from "../../context/SearchContext";
import { Footer } from "../../components/Footer";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchTerm } = useSearch();
  const [products, setProducts] = useState<any[]>([]);

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

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <>
      <div className="card text-bg-dark">
        <img
          src={HomeImg}
          className="card-img"
          alt="..."
          style={{ opacity: 0.7 }}
        />
        <div
          className="card-img-overlay d-flex justify-content-center align-items-center text-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <p className="display-5 text-white fw-bold">
            Bem-vindo ao Seu Novo Jeito de Comprar
          </p>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
