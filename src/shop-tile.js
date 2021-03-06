import { LitElement, html } from 'lit-element';

class ShopTile extends LitElement {

    render(){
        return html`
            <style>
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }

                .container{
                    height: 100%;
                    width: 100%;
                }
                    .shop-name{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        height: 60%;
                        width: 90%;
                        margin: 15px 10px 0 10px;
                        border-radius: 5px;
                        background-color: #00BCD4;
                        text-decoration: none;
                        white-space: nowrap;
                    }
                        .shop-name p{
                            font-size: 2em;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            padding: 0.5rem;
                            margin: 0; 
                        }
                    .shop-info-container{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        height: 20%;
                        width: 100%;
                        margin-top: 10px;
                    }
                        .shop-info-container p {
                            color: black;
                        }
                        .shop-info-container img:hover{
                            cursor: pointer;
                        }
                        .shop-balance, .shop-link{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 10px;
                        }
                .menu-item-logo{
                    height: 24px;
                    width: 24px;
                    margin: 5px;
                }
                .menu-item:hover{
                    background-color: darkgray;
                    cursor: pointer;
                }

                img:hover {
                transform: scale(1.1);
                }
                
                @media screen and (max-width: 768px) {
                    .shop-name {
                        margin: 15px auto 0 auto;
                    } 
                    .shop-name p {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        padding: 0.5rem;
                        text-align: center;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        white-space: normal;
                        word-break: break-all;
                        line-height: 1.2;
                    }
                }    
            </style>
              <div class="container border">
                <a class="shop-name" href="${this._buildUrlForShop(this.shop)}">
                    <p>${this.shop.shopName}</p>
                </a>
                <div class="shop-info-container">
                     <div class="shop-balance">
                        <img class="menu-item-logo"
                         @click="${this.showBalanceWidgetForShop}"
                         src="wisehands/assets/images/dashboard/money.png">
                    </div>
                    <a class="shop-link" href="${this._buildUrlForShop(this.shop)}">
                         <img class="menu-item-logo"
                         src="wisehands/assets/images/dashboard/link.png">
                    </a>
                </div>
              </div>


    `;}

    static get properties() {
        return {
            shop: {
                type: Object
            }

        };
    }

    constructor() {
        super();
        console.log('this.constructor shop-tile', this.shop);

    }

    _buildUrlForShop(item){
        const token = localStorage.getItem('JWT_TOKEN');
        return `${window.location.protocol}//${item.domain}:${window.location.port}/admin?JWT_TOKEN=${token}`;
    }

    showBalanceWidgetForShop(){
        console.log('showBalanceWidgetForShop show-balance-container', this.shop);
        this.dispatchEvent(new CustomEvent('show-balance-container',
            {
                bubbles: true,
                composed: true,
                detail: this.shop
            })
        );
    }


}
// Register the new element with the browser.
customElements.define('shop-tile', ShopTile);
