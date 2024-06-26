import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import { useNavigate } from "react-router-dom";

const ProductAll = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.product.error);
  // 처음 로딩하면 상품리스트 불러오기
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Container>
      <Row>
        <Col md={3} sm={12}>
          <ProductCard />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductAll;
