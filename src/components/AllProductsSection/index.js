import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoader: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const url = 'https://apis.ccbp.in/products'
    const jwtTokens = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtTokens}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(response)
      const upDateProducts = fetchedData.products.map(product => ({
        id: product.id,
        brand: product.brand,
        title: product.title,
        price: product.price,
        rating: product.rating,
        imageUrl: product.image_url,
      }))
      this.setState({
        productsList: upDateProducts,isLoader:false
      })
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  getLoaderSpinner = () => (
    <>
      <Loader type="BallTriangle" width={50} height={50}  color="#00BFFF" />
    </>
  )

  render() {
    const {isLoader} = this.state
    return (
      <div className="allproducts">
        {isLoader ? this.getLoaderSpinner() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
