// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';
// Extend the LitElement base class
class ProfileContainer extends LitElement {

    render(){
        return html`
            <style>
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }
                .main-container{
                    display: flex;
                    margin: 15px;
                    
                }
                                     
            </style>
            
            <div class="main-container">
              <p>Balance: ${this.balance}</p>
            </div>

    `;}

    static get properties() {
        return {
            balance: {
                type: String,
                value: '0.0.0.0'
            },

        };
    }

    constructor() {
        super();
        this.getUserInfo();
        this.balance = '0.0.0.1';

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
customElements.define('profile-container', ProfileContainer);