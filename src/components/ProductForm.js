import React, { Component } from 'react';

class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        product_name : '',
        product_category: '',
        product_description:'',
        product_price:'',
        product_name_error: '',
        product_category_error: '',
        product_price_error: '',
    }
  }

  updateState(reset) {
    if(this.props.currentIndex === -1 || reset === true) {
      this.setState({ product_name : '' })
      this.setState({ product_category : '' })
      this.setState({ product_description : '' })
      this.setState({ product_price : '' })
    } 
    else {
      this.setState({ product_name : this.props.data[this.props.currentIndex].product_name })
      this.setState({ product_category : this.props.data[this.props.currentIndex].product_category })
      this.setState({ product_description : this.props.data[this.props.currentIndex].product_description })
      this.setState({ product_price : this.props.data[this.props.currentIndex].product_price })
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.currentIndex !== this.props.currentIndex || prevProps.data.length !== this.props.data.length) {
      this.updateState();
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateFields() === false) {
      this.props.onSave(this.state);
      this.updateState(true);
    }
  }
 
  validateFields() {
    var error = false;
    if(this.state.product_name.trim().length < 1) {
      this.setState({product_name_error : "Product Name Error" })
      error = true;
    } else {
      this.setState({product_name_error : "" })
    }
    if(this.state.product_category.length < 1) {
      this.setState({product_category_error : "Category is Required" })
      error = true;
    } else {
      this.setState({product_category_error : "" })
    }
    if(this.state.product_price.length < 1 || this.state.product_price <= 0) {
      this.setState({product_price_error : "Price error" })
      error = true;
    } else {
      this.setState({product_price_error : "" })
    }
    return error;
  }

  handleInputs = (event) => {
    this.setState({ [event.target.name]: event.target.value});
  }

  render() {
    return (
      <div className="container">
        <form onSubmit = {this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="product" className="col-sm-3">Laptop Name*</label>
            <div className="col-sm-7">
              <input type="text" name="product_name" className="form-control" value={this.state.product_name} id="product" placeholder="Enter Product Name" onChange={this.handleInputs}></input>
            </div>
          </div>
          <span style={{color:"#FF0000"}}>{this.state.product_name_error}</span>
          <div className="form-group row">
            <label htmlFor="category" className="col-sm-3">Category*</label>
            <div className="col-sm-7">
              <select className="form-control" name="product_category" id="category" value={this.state.product_category} onChange={this.handleInputs}>
                <option selected>Choose Mobile Type</option>
                <option>iPhone</option>
                <option>Samsung</option>
                <option>Xiomi</option>
              </select>
              </div>
          </div>
          <span style={{color:"#FF0000"}}>{this.state.product_category_error}</span>
          <div className="form-group row">
            <label htmlFor="description" className="col-sm-3">Description</label>
            <div className="col-sm-7">
              <input type="text" className="form-control" name="product_description" id="description"  value={this.state.product_description} placeholder="Enter Description" onChange={this.handleInputs}></input>
            </div>          
          </div>
          <div className="form-group row">
            <label htmlFor="price" className="col-sm-3">Price*</label>
            <div className="col-sm-7">
              <input type="number" className="form-control" name="product_price" id="price"  value={this.state.product_price} placeholder="Enter Price" onChange={this.handleInputs}></input>
            </div>
          </div>
          <span style={{color:"#FF0000"}}>{this.state.product_price_error}</span>
          <div className="form-group row">
            <button type="submit">Save</button>
          </div>
        </form>
        <div>
      </div>
    </div>
    )
  }
}
  
export default ProductForm;