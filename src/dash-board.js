// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';
import './subcription-container.js'
import './profile-container.js'
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
                    .logo{
                        height: 48px;
                        width: 48px;
                        margin: 5px;
                    }
                    .product-name{
                        margin-left: 5px;
                        color: rgba(0,0,0, .9);
                    }
                    .profile-info-container{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                        .profile-info{
                            display: flex;
                            flex-direction: column;
                            align-items: flex-end; 
                        }
                        .profile-info p{
                            margin: 0;
                        }
                        .profile-info-balance{
                            display: flex;                            
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
                    .menu-item-logo{
                        height: 24px;
                        width: 24px;
                        margin: 5px;
                    }
                    .menu-item:hover{
                        background-color: darkgray;
                        cursor: pointer;
                    }
                .work-place-dash-board-container{
                    display: flex;
                    width: 75%;
                }
                    .shop-list-container{
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        flex-wrap: wrap;
                    }
                        .shop-element{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin: 15px;
                            height: 200px;
                            width: 200px;
                        }
                        .shop-element p{
                             color: black;
                        }
                        .create-shop-plus-logo{
                            height: 24px;
                            width: 24px;
                        }
                    
                    .profile-container{
                        display: flex;
                        margin-left: 10px;

                    }
                    subcription-container{
                        width: 100%;
                        height: 100%;
                        display: flex;
                    }    
                                     
            </style>
            
            <div class="main-container">
                <div class="header-profile-container border">
                    <div class="logo-container">
                        <img class="logo" src="wisehands/assets/images/dashboard/main_logo_black.png">
                        <p class="product-name">WSTORE</p>
                    </div>
                    <div class="profile-info-container">
                        <div class="profile-info">
                            <p>${this.userFullName}</p>
                            <div class="profile-info-balance">
                                <p>Баланс:</p>
                                <p>1000 грн</p>
                            </div>
                            
                        </div>
                        <img class="logo" src="wisehands/assets/images/dashboard/user-header-info.svg">
                    </div>
                </div>
                <div class="body-dash-board-container">
                    <div class="tools-dash-board-container border">
                        <div class="menu-item" @click="${this.showShopListContainer}">
                            <img class="menu-item-logo" src="wisehands/assets/images/dashboard/icon-store-dashboard.svg">
                            <p>магазини</p>
                        </div>
                        <div class="menu-item" @click="${this.showSubscriptionContainer}">
                           <img class="menu-item-logo" src="wisehands/assets/images/dashboard/icon-subscr-dashboard.svg">
                           <p>Підписки</p>
                        </div>
                        <div class="menu-item" @click="${this.showProfileContainer}">
                            <img class="menu-item-logo" src="wisehands/assets/images/dashboard/icon-user-dashboard.svg">
                            <p>Профіль</p>
                        </div>
                    </div>
                    <div class="work-place-dash-board-container border">
                        ${this.isShowShopListContainer ? html`                                            
                        <div class="shop-list-container">
                            <div class="shop-element border">
                                <a href="/ua/wizard">
                                    <img class="create-shop-plus-logo" src="wisehands/assets/images/dashboard/plus.svg">
                                </a>
                            </div>
                             ${this.shopList.map(item => html`
                                   <a href="${this._buildUrlForShop(item)}">
                                       <div class="shop-element border">
                                            <p>${item.shopName}</p>
                                       </div>
                                   </a>    
                            `)}                    
                        </div>` : html ``} 
                        
                        ${this.isShowSubscriptionContainer ? html `
                            <subcription-container></subcription-container>
                        ` : ''}
                        
                        ${this.isShowProfileContainer ? html `
                            <profile-container></profile-container>
                        ` : html ``}
                        
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
            },
            isShowShopListContainer: {
                type: Boolean
            },
            isShowSubscriptionContainer: {
                type: Boolean
            },
            isShowProfileContainer: {
                type: Boolean
            },
        };
    }

    constructor() {
        super();
        this.getShopList();
        this.getUserInfo();
        this.shopList = [];
        this.userFullName = 'Ім. Пр.';
        this.isShowShopListContainer = true;

    }

    _buildUrlForShop(item){
        const token = localStorage.getItem('JWT_TOKEN');
        return `${window.location.protocol}//${item.domain}:${window.location.port}/admin?JWT_TOKEN=${token}`;
    }

    showShopListContainer() {
        this.isShowShopListContainer = true;
        this.isShowSubscriptionContainer = false;
        this.isShowProfileContainer = false;
    }

    showSubscriptionContainer() {
        this.isShowShopListContainer = false;
        this.isShowSubscriptionContainer = true;
        this.isShowProfileContainer = false;
    }

    showProfileContainer() {
        this.isShowShopListContainer = false;
        this.isShowSubscriptionContainer = false;
        this.isShowProfileContainer = true;
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
                _this.userFullName = `${data.givenName} ${data.familyName}`;
            }
        });
    }

}
// Register the new element with the browser.
customElements.define('dash-board', DashBoard);