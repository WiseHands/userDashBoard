// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';
// Extend the LitElement base class
class SubcriptionContainer extends LitElement {

    render(){
        return html`
            <style>
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }
                .main-container{
                    display: flex;
                    margin: 15px;
                    width: 98%;
                    height: 98%;
                }
                                     
            </style>
            
            <div class="main-container border">
              <p>Balance: ${this.balance}</p>
            </div>

    `;}

    static get properties() {
        return {
            balance: {
                type: Number,
            },

        };
    }

    constructor() {
        super();
        this.getUserInfo();
        this.balance = 12536.5;

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

        });
    }

}
// Register the new element with the browser.
customElements.define('subcription-container', SubcriptionContainer);