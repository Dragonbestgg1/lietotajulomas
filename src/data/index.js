import React, { Component } from "react";
import style from "../styles/data.module.css";
import axios from 'axios';

class Data extends Component {
  state = {
    errorMessage: null,
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className={`${style.main}`}>
        <div className={`${style.body}`}>
          <div className={`${style.box}`}>
            <form id="productForm" className={`${style.form}`} onSubmit={this.submitHandler}>
              <h1 className={`${style.h1}`}>Add Product</h1>

              {errorMessage && (
                <div className={`${style.error}`}>
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className={`${style.inputContainer}`}>
                <label htmlFor="productName">Product Name:</label>
                <input name="productName" className={`${style.input}`} placeholder="Product Name" required />
              </div>

              <div className={`${style.inputContainer}`}>
                <label htmlFor="productCategory">Product Category:</label>
                <select name="productCategory" className={`${style.input}`} required>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="home">Home Goods</option>
                </select>
              </div>

              <div className={`${style.inputContainer}`}>
                <label htmlFor="productPrice">Product Price:</label>
                <input name="productPrice" type="number" step="0.01" className={`${style.input}`} placeholder="Product Price" required />
              </div>

              <div className={`${style.inputContainer}`}>
                <label htmlFor="productImg">Product Image URL:</label>
                <input name="productImg" className={`${style.input}`} placeholder="Product Image URL" required />
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

  submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};

    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    // Validate image URL
    if (this.isValidImageURL(formDataObject["productImg"])) {
      try {
        // Make Axios POST request to create a new product
        await axios.post('/items', {
          shelf_id: formDataObject["productCategory"],
          name: formDataObject["productName"],
          price: parseFloat(formDataObject["productPrice"]),
          image_url: formDataObject["productImg"],
        });

        // Reset error message if successful
        this.setState({ errorMessage: null });

        // Optionally, you can provide feedback to the user, e.g., redirect or display a success message.
        console.log("Product added successfully!");

      } catch (error) {
        console.error("Error adding product:", error);

        // Set error message for user feedback
        this.setState({ errorMessage: "Error adding product. Please try again later." });
      }
    } else {
      // Set error message for invalid image URL
      this.setState({ errorMessage: "Invalid image URL. Please provide a valid image URL." });
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
