import React from "react";
import { ShopContext } from "../Contexts/ShopContextProvider";
import Attribute from "./ProductAttributes/Attribute.js";
import AddToCartDescription from "./AddToCartDescription";
import withRouter from "../Utils/withRouter.js";
import "./ProductDataComponent.css";

class ProductDataComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
      size: null,
      capacity: null,
      selectedImageIndex: 0,
    };
  }
  render() {
    const { data } = this.props;
    const gallery = data.gallery || [];
    const prices = data.prices || [];
    const attributes = data.attributes || [];
    const attributesSorted = [...attributes];
    attributesSorted.sort((a, b) => (a.id < b.id ? -1 : 1));

    const selectedCurrency = this.context.selectedCurrency;

    const price = prices.find(
      (price) => price.currency.label === selectedCurrency.toUpperCase()
    );
    const priceAmount = price?.amount;
    const priceSymbol = price?.currency.symbol;

    const itemInCart = this.context.cartItems.find(
      (item) => item.id === data.id
    );

    const addToCart = () => {
      if (!itemInCart) {
        this.context.addItemToCart({
          ...data,
          quantity: 1,
          selectedColor: this.state.color,
          selectedSize: this.state.size,
          selectedCapacity: this.state.capacity,
        });
      } else {
        this.context.updateCartItem({
          ...itemInCart,
          quantity: itemInCart.quantity + 1,
        });
      }
    };
    return (
      <div className="productDetailWrapper">
        <div className="productDetailImagecontainer">
          {gallery.map((image, index) => (
            <img
              style={{
                opacity: data.inStock ? 1 : 0.5,
              }}
              className="productDetailImages"
              key={index}
              src={image}
              onClick={() => this.setState({ selectedImageIndex: index })}
            />
          ))}
        </div>
        <div className="imageWrapper">
          <img
            style={{
              opacity: data.inStock ? 1 : 0.5,
            }}
            src={gallery[this.state.selectedImageIndex]}
          />
          <div
            style={{
              opacity: data.inStock ? 0 : 1,
            }}
            className="outOfStock"
          >
            Out of stock
          </div>
        </div>

        <div className="prductInfo">
          <div>
            <div className="shoppingCartBrand">{data.brand}</div>
            <div className="shoppingCartName">{data.name}</div>
          </div>
          {attributesSorted.map((attribute) => {
            if (attribute.id === "Size") {
              const title = attribute.id.toUpperCase();
              return (
                <div key={attribute.id} className="attributeWrapper">
                  <div className="shoppingCartTitles">{title}:</div>
                  <div className="attributeItemsWrapper">
                    {attribute.items.map((item) => (
                      <div key={item.value}>
                        <Attribute
                          key={item.value}
                          data={item.value}
                          onClick={() => this.setState({ size: item.value })}
                          selected={this.state.size === item.value}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (attribute.id === "Color") {
              return (
                <div key={attribute.id} className="attributeWrapper">
                  <div className="shoppingCartTitles">{attribute.id}:</div>
                  <div className="attributeItemsWrapper">
                    {attribute.items.map((item) => (
                      <Attribute
                        key={item.value}
                        color={item.value}
                        onClick={() => this.setState({ color: item.value })}
                        selected={this.state.color === item.value}
                      />
                    ))}
                  </div>
                </div>
              );
            }

            if (attribute.id === "Capacity") {
              return (
                <div key={attribute.id} className="attributeWrapper">
                  <div className="shoppingCartTitles">{attribute.id}:</div>
                  <div className="attributeItemsWrapper">
                    {attribute.items.map((item) => (
                      <Attribute
                        key={item.value}
                        data={item.value}
                        onClick={() => this.setState({ capacity: item.value })}
                        selected={this.state.capacity === item.value}
                      />
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}
          <div className="shoppingCartTitles">PRICE:</div>
          <div>
            {priceSymbol}
            {priceAmount}
          </div>

          <div className="productDataAddToCart">
            <AddToCartDescription
              description={data.description}
              onAddToCartClick={addToCart}
            />
          </div>
        </div>
      </div>
    );
  }
}
ProductDataComponent.contextType = ShopContext;
export default withRouter(ProductDataComponent);
