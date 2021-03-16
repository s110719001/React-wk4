import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Select } from 'antd';
import AddToCart from "./AddToCart"

const { Option } = Select;

function ProductDetail({ product }) {
   const [qty, setQty] = useState(product.countInStock > 0 ? 1 : 0);
   const [clr, setClr] = useState(product.countInStock > 0 ? product.color[0] : 0);
   const handleChange = value => {
      setQty(value);
    };

   useEffect(()=>{
      console.log(`The selected qty = ${qty}`)
   },[qty]);
   const handleClrChange = value => {
      setClr(value);
    };

   useEffect(()=>{
      console.log(`The selected clr = ${clr}`)
   },[clr]);

   return (
      <Row gutter={[32, 32]}>
        <Col 
          lg={{ span: 8, offset: 2 }}
        >
         <img
            alt=""
            className="product-image"
            src={product.image}
         />           
        </Col>
        <Col 
          lg={{ span: 12 }}
        >
         <div className="product-info">
            <h2 className="product-category">
               {product.category}
            </h2>
            <h1 className="product-name product-name--large">
               {product.name}
            </h1>
            <p className="product-description">{product.description_long}</p>
            <div className="product-price-wrap">
               <p className="product-price product-price--large">
                  US${product.price}.00
               </p>
               <p className="product-status">
                  Status: {product.countInStock > 0 ? "In Stock" : "Unavailable."}
               </p>
               <p className="product-qty">
                  Qty: {"   "}
                  <Select 
                     defaultValue={qty} 
                     className="select-style"
                     onChange={handleChange}
                  >
                     {[...Array(product.countInStock).keys()].map((x) => (
                        <Option key={x+1} value={x+1}>
                           {x+1}
                        </Option>
                     ))}
                  </Select>
                  {"  "}
                  &emsp;&emsp;&nbsp;
                  Color: {"   "}
                  <Select 
                     defaultValue={clr} 
                     className="select-style"
                     onChange={handleClrChange}
                  >
                     {[...(product.color.keys())].map((x) => (
                     <Option value={product.color[x]}>
                        {product.color[x]}
                     </Option>
                     ))}
                  </Select>
               </p>
               <p className="product-qty">
                  Total Price: {product.price * qty}
               </p>               
               <AddToCart />
            </div>
         </div>           
        </Col>
      </Row>
   );
}

export default ProductDetail;