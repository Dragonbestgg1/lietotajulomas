import React, { Component } from "react";
import style from "../styles/data.module.css";
import axios from 'axios';

class Data extends Component {
  render() {
    return (
      <div className={`${style.main}`}>
        <div className={`${style.body}`}>
          <div className={`${style.box}`}>
            <form id="productForm" className={`${style.form}`} onSubmit={this.submitHandler}>
              <h1 className={`${style.h1}`}>Add Product</h1>
              <div className={`${style.inputContainer}`}>
                <label htmlFor="productName">Product Name:</label>
                <input name="productName" className={`${style.input}`} placeholder="Product Name" />
              </div>

              <div className={`${style.inputContainer}`}>
                <label htmlFor="productCategory">Product Category:</label>
                <select name="productCategory" className={`${style.input}`}>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="home">Home Goods</option>
                </select>
              </div>

              <div className={`${style.inputContainer}`}>
                <label htmlFor="productPrice">Product Price:</label>
                <input name="productPrice" className={`${style.input}`} placeholder="Product Price" />
              </div>

              <div className={`${style.inputContainer}`}>
                <label htmlFor="productImg">Product Image URL:</label>
                <input name="productImg" className={`${style.input}`} placeholder="Product Image URL" />
              </div>

              <button type="submit" className={`${style.submit}`}>
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};

    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    // Validate image URL
    if (this.isValidImageURL(formDataObject["productImg"])) {
      console.log("Valid image URL:", formDataObject["productImg"]);
      // Add your axios.post() logic here
    } else {
      console.error("Invalid image URL:", formDataObject["productImg"]);
    }
  };

  isValidImageURL = (url) => {
    // Simple check for image URL by checking if it ends with common image file extensions
    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    const lowercasedURL = url.toLowerCase();

    return imageExtensions.some((extension) => lowercasedURL.endsWith(`.${extension}`));
  };
}

export default Data;
