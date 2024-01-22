import React, { Component } from "react";
import style from "../styles/data.module.css";
import axios from 'axios';
import Select from 'react-select';

class Data extends Component {
  state = {
    errorMessage: null,
    shelves: [],
  };

  componentDidMount() {
    axios.get('/shelf')
      .then(response => {
        const options = response.data.map(shelf => ({ value: shelf.id, label: `${shelf.id}. ${shelf.name}` }));
        this.setState({ shelves: options });
      });
  }

  render() {
    const { errorMessage, shelves } = this.state;
    const customStyle = {
      control: (provided, state) => ({
        ...provided,
        minHeight: '30px',
        height: '100%',
        width: '100%',
        minWidth: '150px',
        alignItems: 'center',
        boxShadow: state.isFocused ? null : null,
        borderRadius: '10px',
        background: 'none'
      }),
    };

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
                <Select 
                  name="shelf"
                  options={shelves}
                  className={`${style.input}`}
                  styles={customStyle}
                  required
                />
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

    if (!formDataObject["productName"] || !formDataObject["shelf"] || !formDataObject["productPrice"] || !formDataObject["productImg"]) {
      this.setState({ errorMessage: "All fields are required." });
      return;
    }

    if (!this.isValidImageURL(formDataObject["productImg"])) {
      this.setState({ errorMessage: "Invalid image URL. Please provide a valid image URL." });
      return;
    }

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
  };

  isValidImageURL = (url) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    const lowercasedURL = url.toLowerCase();

    return imageExtensions.some((extension) => lowercasedURL.endsWith(`.${extension}`));
  };
}

export default Data;
