import { LitElement, html } from 'lit-element';
import './table-transaction.js'

class BalanceContainer extends LitElement {

    render(){
        return html`
            <style>
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }
                .line{
                    border-top: 1px solid lightgray;
                }
                .main-balance-container{
                    display: flex;
                    margin: 15px;
                    flex-direction: column;
                    width: 100%;
                }
                .main-balance-container p {
                    margin: 5px;
                } 
                    .balance-container{
                        display: flex;
                        flex-direction: column;
                    }
                        .row-container{
                            display: flex;
                            flex-direction: row;
                            justify-content: flex-start;
                        }
                        .row-container input, button{
                            margin: 5px;
                        }
                    .status-plane-container{
                        display: flex;
                        flex-direction: column;
                    }
                    .administration-container{
                        display: flex;
                        flex-direction: column;
                    }    
                    .payment-form-container form{
                        display: flex;
                        flex-direction: column;
                    }
                                     
            </style>
            
            <div class="main-balance-container">
                <p>Магазин: ${this.shop.shopName}</p>
                <!--<p>Інформація:</p>-->
                <span class="line"></span>
                <section class="balance-container">
                    <p> Баланс: ${this.coinAccount.balance} UAH</p>
                    <div class="row-container">
                        <p>Поповнити на суму:</p>
                        <input id="amountPayment" .value=${this.amountPayment} @input="${this.handleAmountPayment}">
                        <button @click="${this.generateSignatureForPayment}">поповнити</button>  
                    </div>
                </section>
                <span class="line"></span>
                <section class="status-plane-container">
                    <div class="row-container">
                        <p>Тариф: ${this.plane}</p>
                        <button @click="${this.getPlaneForShop}">змінити</button>  
                    </div>
                    <div class="row-container">
                        <p>Статус: ${this.status}</p>
                    </div>
                </section>
                <span class="line"></span>
                <section class="administration-container">
                    <!--<p>Адміністрування:</p>-->
                    <p>Зарахування офлайн поповнення</p>
                    <div class="row-container">
                        <input id="adminPayment" .value=${this.offlinePayment} @input="${this.handleRefillAdminPayment}">
                        <button @click="${this.refillAdminPayment}">поповнити</button>
                    </div>
                    <div class="transaction-table-container">
                        <p>Table here</p>
                            <table-transaction .shop="${this.shop}" .tranasctionList="${this.coinAccount.transactionList}"></table-transaction>
                        </div>
                </section>
    
                <div class="payment-form-container" hidden>
                    <form id="payment-form" method="post" action="https://secure.wayforpay.com/pay">
                        <input id="account" name="merchantAccount" value="">
                        <input id="serviceUrl" name="serviceUrl" value="">
                        <input id="domainName" name="merchantDomainName" value="">
                        <input id="signature" name="merchantSignature" value="">
                        <input name="merchantTransactionSecureType" value="AUTO">
                        <input id="reference" name="orderReference" value="USER_ID">
                        <input id="date" name="orderDate" value="TIME">
                        <input id="allPrice" name="amount" value="">
                        <input id="currencyCash" name="currency" value="UAH">
                        <input id="name" name="productName[]" value="Поповнення рахунку користувача USER_ID">
                        <input id="price" name="productPrice[]" value="">
                        <input id="count" name="productCount[]" value="">
                        <input type="submit" value="Submit">
                    </form>
                </div>
            </div>
                
    
`;}

    static get properties() {
        return {
            coinAccount: {
                type: Object,
            },
            amountPayment: {
                type: Number
            },
            offlinePayment: {
                type: Number
            },
            shop: {
                type: Object,
            }
        };
    }

    constructor() {
        super();
        this.coinAccount = {
            balance: 0
        };
        this.amountPayment = 0;
        this.offlinePayment = 0;

    }

    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if(propName === 'shop' && !!this.shop && !this.isBalanceRetrieved) {
                this.isBalanceRetrieved = true;
                this.getBalanceForThisShop();
            }
            console.log(`${propName} changed. oldValue: ${oldValue}`);
        });
    }

    getBalanceForThisShop(){
        const url = `/api/dashboard/shop/info?shopUuid=${this.shop.uuid}`;
        this.generateGetRequest(url);
    }

    setBalanceForThisShop(data){
        this.coinAccount = data;
        console.log(`setBalanceForThisShop: ${data}`);
    }

    handleAmountPayment(e){
        this.amountPayment = e.target.value;
    }

    generateSignatureForPayment(){
        const url = `/api/wayforpay/generate-signature?amount=${this.amountPayment}&shopUuid=${this.shop.uuid}`;
        this.generatePostRequest(url);
        console.log(`get amount from value ${this.amountPayment}`)
    }

    generateGetRequest(url, params){
        let _this = this;
        fetch(url, {
            method: 'GET',
            body: params
        }).then(function (response) {
            console.log("response response: ", response);
            return response.json();
        }).then(function (data) {
            console.log('data for users: ', data);
            _this.setBalanceForThisShop(data);

        });
    }

    generatePostRequest(url){
        let _this = this;
        let token = localStorage.getItem('JWT_TOKEN');
        fetch(url, {
            method: 'POST',
            headers: {
                authorization:  'Bearer ' + token
            }
        }).then(function (response) {
            console.log("response response: ", response);
            return response.json();
        }).then(function (data) {
            console.log('data from generatePostRequest: ', data);
            _this.setPaymentWayForPayForm(data);

        });
    }

    setPaymentWayForPayForm(data){
        this.shadowRoot.querySelector('#account').value = data.merchantAccount;
        this.shadowRoot.querySelector('#domainName').value = data.merchantDomainName;
        this.shadowRoot.querySelector('#signature').value = data.signature;
        this.shadowRoot.querySelector('#reference').value = data.orderReference;
        this.shadowRoot.querySelector('#date').value = data.orderDate;
        this.shadowRoot.querySelector('#allPrice').value = data.amount;
        this.shadowRoot.querySelector('#currencyCash').value = data.currency;
        this.shadowRoot.querySelector('#name').value = data.productName;
        this.shadowRoot.querySelector('#count').value = data.productCount;
        this.shadowRoot.querySelector('#price').value = data.productPrice;
        this.shadowRoot.querySelector('#serviceUrl').value = data.serviceUrl;
        this.shadowRoot.querySelector('form').submit();
    }
}
// Register the new element with the browser.
customElements.define('balance-container', BalanceContainer);