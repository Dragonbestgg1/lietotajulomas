import React, { Component } from "react";
import style from "../styles/data.module.css";
import axios from 'axios';

class Data extends Component {
  state = {
    errorMessage: null,
    shelves: [],
  };

  componentDidMount() {
    axios.get('/shelves')
      .then(response => {
        this.setState({ shelves: response.data });
      })
      .catch(error => {
        console.error('Error fetching shelves:', error);
      });
  }

  render() {
    const { errorMessage, shelves } = this.state;

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
                <label htmlFor="shelf">Shelf:</label>
                <select name="shelf" className={`${style.input}`} required>
                  {shelves.map(shelf => (
                    <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
                  ))}
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

    if (this.isValidImageURL(formDataObject["productImg"])) {
      try {
        await axios.post('/items', {
          shelf_id: formDataObject["shelf"],
          name: formDataObject["productName"],
          price: parseFloat(formDataObject["productPrice"]),
          image_url: formDataObject["productImg"],
        });

        this.setState({ errorMessage: null });
        console.log("Product added successfully!");

      } catch (error) {
        console.error("Error adding product:", error);
        this.setState({ errorMessage: "Error adding product. Please try again later." });
      }
    } else {
      this.setState({ errorMessage: "Invalid image URL. Please provide a valid image URL." });
    }
  };

  isValidImageURL = (url) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    const lowercasedURL = url.toLowerCase();

    return imageExtensions.some((extension) => lowercasedURL.endsWith(`.${extension}`));
  };
}

export default Data;
