import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/actions/product";
import axios from "axios";
import { TableStyled } from "./ProductsStyled";
import BtnDelete from "../BtnDelete/BtnDelete";
import BtnEdit from "../BtnEdit/BtnEdit";
import { server } from "../../../server";
import { AiOutlineSearch } from "react-icons/ai";

const Products = ({ search }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  console.log(search);

  useEffect(() => {
    axios
      .get(`${server}/products/admin-all-products`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
      });
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  return (
    <>
      {data.length >= 1 ? (
        <div
          id="products"
          style={{
            // maxHeight: "500px",
            // overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2em",
          }}
        >
          <TableStyled>
            <div className="containerNames">
              <p style={{width: "10%"}}>Imagen</p>
              <p style={{width: "20%"}}>Nombre</p>
              <p style={{width: "10%"}}>Precio</p>
              <p style={{width: "30%"}}>Descripción</p>
              <p style={{width: "20%"}}>Categoría</p>
              <p style={{width: "10%"}}>Botones</p>
            </div>

            {data
              .filter((product) => {
                return search.toLowerCase() == "todos"
                  ? product
                  : product.name.toLowerCase().includes(search);
              })
              .map((product) => (
                <div className="container-info" key={product._id}>
                  <div className="container-img">
                    <img className="img" src={product.images.url} />
                  </div>
                  <p className="name">{product.name}</p>
                  <p className="price">${product.price}</p>
                  <p className="description">{product.description}</p>
                  <p className="category">{product.category}</p>
                  <div className="buttons">
                    <BtnEdit
                      productData={product}
                      value={{ style: { cursor: "pointer" } }}
                    />
                    <BtnDelete product={product} handleDelete={handleDelete} />
                  </div>
                </div>
              ))}
          </TableStyled>
        </div>
      ) : data.length === 0 && status === "success" ? (
        <div>
          <h2 style={{ textAlign: "center" }}>No hay productos para mostrar</h2>
        </div>
      ) : (
        <div className="loading">
          <h2 style={{ textAlign: "center" }}>Cargando....</h2>
          <p style={{ textAlign: "center" }}>
            Espere mientras carga el contenido
          </p>
        </div>
      )}
    </>
  );
};

export default Products;
