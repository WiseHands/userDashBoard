// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';

// Extend the LitElement base class
class DashBoard extends LitElement {

    /**
     * Implement `render` to define a template for your element.
     *
     * You must provide an implementation of `render` for any element
     * that uses LitElement as a base class.
     */
    render(){
        return html`
            <style>
                body{
                    height: 100vh;
                }
                .container{
                    display: flex;
                }
                .row{
                    flex-direction: row;
                }
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }
                .shops-place{
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
                .header-profile-container{
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    
                    height: 56px;
                }
                .profile-info{
                    height: 48px;
                    width: 48px;
                }
                .body-dash-board-container{
                    display: flex;
                }
                .tools-dash-board-container{
                    width: 25%;
                    background-color: #40b9ff; 
                }
            </style>
                                    
            <div class="header-profile-container border">
                <div class="profile-info">
                    <p>O.P</p>
                </div>
            </div>
            <div class="body-dash-board-container">
                <div class="tools-dash-board-container border"></div>
                <div class="container row shops-place border">
                    <div class="shop-element create-shop border"></div>
                        ${this.shopList.map(item => html`
                               <div class="shop-element border">
                                    <p>${item.shopName}</p>
                               </div>
                        `)}                    
                </div>
            </div>
    `;}


    static get properties() {
        return {
            shopList: {
                type: Array,
                value: []
            }
        };
    }

    constructor() {
        super();
        this.getShopList();
        this.shopList = [{shopName:"shop0"}, {shopName:"shop1"}, {shopName:"shop3"}, {shopName:"shop4"}, {shopName:"shop5"}];
    }


    getShopList(){
        const _this = this;
        const url ='/shops';
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
            _this.shopList = data;
            console.log("response data: ", data);
        });
    }

}
// Register the new element with the browser.
customElements.define('dash-board', DashBoard);