import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IMG_NOPHOTO, URL_STORAGE } from "../../components/constans/constans";
import { addProduct } from "../../redux/features/cart";
import { getProductUser } from "../../redux/features/userProduct";
import { getUserProduct } from "../../redux/selectors/selectors";
import { useAppDispatch } from "../../redux/store";
import styles from "./product.module.scss";

export const Product = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const userProduct = useSelector(getUserProduct);

  useEffect(() => {
    if (id) {
      dispatch(getProductUser(id));
    }
  }, [dispatch, id]);

  function addToCartProduct() {
    if (userProduct) {   //null
      dispatch(addProduct(userProduct));   
    }
  }

  return (
    <div className={`${styles.wrapper} margin_right margin_left`}>
      <div className={styles.container_product}>
        <div>
          <img
            className={styles.left_bar_img}
            src={`${URL_STORAGE}${
              userProduct?.images ? userProduct?.images[0] : IMG_NOPHOTO
            }?alt=media `}
            alt=""
          />
        </div>
        <div className={styles.right_bar}>
          <div className={styles.product_info}>
            <h2>{userProduct?.title}</h2>
            <span>{userProduct?.rating.rate}</span>
            <div>
              <span className={styles.price}>{userProduct?.price} </span>
              <span className={styles.stock_price}>
                {userProduct?.stockPrice}
              </span>
            </div>
          </div>
          <Link to={"/cart"}>
            <button onClick={addToCartProduct} className={styles.button_add}>
              Добавить в корзину
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.description}>
        <span>Описание</span>
        <hr />
        <p>{userProduct?.description}</p>
      </div>
    </div>
  );
};
