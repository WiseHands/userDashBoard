// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';
import 'fa-icons';
// Extend the LitElement base class
class DashBoard extends LitElement {

    render(){
        return html`
            <style>
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }
                a {
                    text-decoration: none;
                }
                .main-container {
                    height: 100vh;
                }
                .header-profile-container{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 56px;
                }
                    .logo-container{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-family: 'Roboto', 'Helvetica', sans-serif;
                        font-size: 20px;
                    }
                    .profile-info, .logo{
                        height: 48px;
                        width: 48px;
                        margin: 5px;
                    }
                    .product-name{
                        margin-left: 5px;
                        color: rgba(0,0,0, .9);
                    }
                .body-dash-board-container{
                    display: flex;
                    height: calc(100% - 56px)
                }
                .tools-dash-board-container{
                    width: 25%;
                }
                    .menu-item {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 4em;
                        border-bottom: 1px solid lightgrey;
                        font-family: 'Roboto', 'Helvetica', sans-serif;
                    }
                    fa-icon{
                        margin: 5px;
                        
                    }
                .shops-place{
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    width: 75%;
                }
                    .shop-element{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: 15px;
                        height: 200px;
                        width: 200px;
                    }
            </style>
            
            <div class="main-container">
                <div class="header-profile-container border">
                    <div class="logo-container">
                        <img class="logo" src="images/logo.jpg">
                        <p class="product-name">WSTORE</p>
                    </div>
                    <div class="profile-info">
                        <p>${this.userFullName}</p>
                    </div>
                </div>
                <div class="body-dash-board-container">
                    <div class="tools-dash-board-container border">
                        <div class="menu-item">
                            <fa-icon class="fas fa-house-damage"></fa-icon>
                            <p>Магазини</p>
                        </div>
                        <div class="menu-item">
                            <fa-icon class="fas fa-book"></fa-icon>
                            <p>Підписки</p>
                        </div>
                        <div class="menu-item">
                            <fa-icon class="fas fa-user-circle"></fa-icon>
                            <p>Профіль</p>
                        </div>
                    </div>
                    <div class="shops-place border">
                        <div class="shop-element create-shop border">
                            <a href="/ua/wizard">
                                <div class="shop-element create-shop border">
                                    <p>+</p>
                                </div>
                            </a>
                        </div>
                        ${this.shopList.map(item => html`
                               <a href="${this._buildUrlForShop(item)}">
                                   <div class="shop-element border">
                                        <p>${item.shopName}</p>
                                   </div>
                               </a>    
                        `)}                    
                    </div>
                </div>
            </div>

    `;}

    static get properties() {
        return {
            shopList: {
                type: Array,
                value: []
            },
            userFullName: {
                type: String,
            }
        };
    }

    constructor() {
        super();
        this.getShopList();
        this.getUserInfo();
        this.shopList = [];
    }

    _buildUrlForShop(item){
        const token = localStorage.getItem('JWT_TOKEN');
        return `${window.location.protocol}//${item.domain}:${window.location.port}/admin?JWT_TOKEN=${token}`;
    }

    getShopList(){
        const _this = this;
        const url ='/api/dashboard/shops';
        let token = localStorage.getItem('JWT_TOKEN');
        fetch(url, {
            method: 'GET',
            headers: {
                authorization:  'Bearer ' + token
            }
        }).then(function (response) {
            console.log("response response: ", response);
            return response.json();
        }).then(function (data) {
            console.log('data for shopList: ', data);
            if (data){
                _this.shopList = data;
            }

        });
    }

    getUserInfo(){
        const _this = this;
        const url ='/api/dashboard/user';
        let token = localStorage.getItem('JWT_TOKEN');
        fetch(url, {
            method: 'GET',
            headers: {
                authorization:  'Bearer ' + token
            }
        }).then(function (response) {
            console.log("response response: ", response);
            return response.json();
        }).then(function (data) {
            console.log('data for users: ', data);
            if (data){
                _this.userFullName = `${data.givenName}${data.familyName}`;
            }
        });
    }

}
// Register the new element with the browser.
customElements.define('dash-board', DashBoard);