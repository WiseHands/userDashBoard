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
                        .column-container{
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            margin: 2.5px;

                        }
                        .row-container{
                            display: flex;
                            flex-direction: row;
                            justify-content: flex-start;
                            align-items: center;
                            margin: 2.5px;
                        }
                        .row-container input, button{
                            margin: 5px;
                        }
                        .drop-down-list{
                            display: flex;
                            margin: 10px;
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
                    option{
                        width: 100%;
                    }
                    select{
                        width: -webkit-fill-available;
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
                        <p>Поточний тариф: ${this._getPlanName(this.shop.pricingPlan)}</p>
                    </div>

                    ${this.isUserSuperAdmin ? html `` : html `
                        <div class="column-container">
                            <div class="drop-down-list">
                              <label for="plans">Тариф:</label>
                                <select id="plans">
                                  ${this.pricePlanList.map(item => html`
                                    <option id="${item.uuid}" >${item.name}</option>
                                  `)}
                                </select>
                            </div>
                            <div class="row-container">
                              <button @click="${this.changePlaneForShop}">змінити</button>
                              <p style="color: red">${this.errorForPricingPlan}</p>
                            </div>
                        </div>
                    `}
                </section>
                <span class="line"></span>

                <section class="administration-container">

                    ${this.isUserSuperAdmin ? html `` : html `
                        <p>Зарахування офлайн поповнення</p>
                        <div class="row-container">
                            <input id="adminPayment" .value=${this.offlinePayment} @input="${this.handleOfflinePayment}">
                            <button @click="${this.refillAdminPayment}">поповнити</button>
                        </div>
                    `}

                    <div class="transaction-table-container">
                        <p>Транзакції</p>
                            <table-transaction .shop="${this.shop}" .transactionList="${this.coinAccount.transactionList}"></table-transaction>
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
            },
            plan: {
                type: String
            },
            pricePlanList: {
                type: Array
            },
            errorForPricingPlan: {
                type: String
            },
            isUserSuperAdmin: {
                type: Boolean
            }
        };
    }

    constructor() {
        super();
        this.coinAccount = {
            balance: 0,
            transactionList: []
        };
        this.errorForPricingPlan = '';
        this.amountPayment = 0;
        this.offlinePayment = 0;
        this.pricePlanList = [];
        this.getPricingPlanList();
        this.isUserSuperAdmin = true;
        this.isUserSuperAdminThenHideOfflinePaymentSection();
        console.log('this.constructor balance-container', this.shop);

    }

    isUserSuperAdminThenHideOfflinePaymentSection(){
        console.log('inside this.isUserSuperAdminThenHideOfflinePaymentSection')
        const _this = this;
        let token = localStorage.getItem('JWT_TOKEN');
        let tokenPlayLoad = token.split('.')[1].replace('-', '+').replace('_', '/');
        let playLoad = JSON.parse(window.atob(tokenPlayLoad));
        if (playLoad.isSuperAdmin == true){
        console.log('JSON playload for balance: ', playLoad.isSuperAdmin);
        _this.isUserSuperAdmin = false;
        }
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

    _getPlanName(plan) {
        if(plan) return plan.name;
        return 'Не встановлено';
    }

    getPricingPlanList(){
        let _this = this;
        const url = '/api/pricing-plan/get-list';
        fetch(url, {
            method: 'GET'
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('get getPricingPlanList from drop-down', data);
            _this.pricePlanList = data;
        })
    }

    changePlaneForShop(){
        const plansList = this.shadowRoot.querySelector('#plans');
        const selectedUuidByIndex = plansList.selectedIndex;
        const pricingPlanUuid = plansList.querySelectorAll('option')[selectedUuidByIndex].id;

        const url = `/api/pricing-plan/set-plan-to-shop?shopUuid=${this.shop.uuid}&pricingPlanUuid=${pricingPlanUuid}`;

        this.setPricingPlanToThisShop(url);
    }

    setPricingPlanToThisShop(url){
        let _this = this;
        fetch(url, {
            method: 'POST'
        }).then(function (response) {
            console.log("response response: ", response);
            return response.json();
        }).then(function (data) {
            console.log('data from setPricingPlanToThisShop: ', data);
            _this.setPlanForShop(data);
        });
    }

    setPlanForShop(data){
       this.setBalanceForThisShop(data.coinAccount);
       if (data.status){
            this.errorForPricingPlan = `${data.message}`;
            this.shop = data.shop;
            this.coinAccount = data.shop.coinAccount;
       }
       if (data.uuid) {
           this.errorForPricingPlan = '';
           console.log('get transactionList ', data);
           this.transactionList = data.coinAccount.transactionList;
           this.shop = data;
       }
       console.log('updating-pricing-plan-in-unique-shop', this.shop);
            this.dispatchEvent(new CustomEvent('update-shop-list',
                {
                    bubbles: true,
                    composed: true,
                    detail: this.shop
                })
            );

    }

    setBalanceForThisShop(data){

        if (data) {
            this.coinAccount = data;
        } else {
            this.coinAccount.balance = 0;

        }
        console.log("setBalanceForThisShop", data);
    }

    handleAmountPayment(e){
        this.amountPayment = e.target.value;
    }

    handleOfflinePayment(e){
        this.offlinePayment = e.target.value;
    }

    generateSignatureForPayment(){
        const url = `/api/wayforpay/generate-signature?amount=${this.amountPayment}&shopUuid=${this.shop.uuid}`;
        this.generatePostRequestForWayForPayForm(url);
    }

    refillAdminPayment(){
        const url = `/api/wayforpay/offline-payment?amount=${this.offlinePayment}&shopUuid=${this.shop.uuid}`;
        this.generatePostRequestForOfflineRefillPayment(url);
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
             _this.setBalanceForThisShop(data);
        });
    }

    generatePostRequestForWayForPayForm(url){
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

    generatePostRequestForOfflineRefillPayment(url){
        let _this = this;
        let token = localStorage.getItem('JWT_TOKEN');
        fetch(url, {
            method: 'POST',
            headers: {
                authorization:  'Bearer ' + token
            }
        }).then(function (response) {
            console.log("PostRequestForOfflineRefillPayment response: ", response);
            return response.json();
        }).then(function (data) {
            console.log('data from generatePostRequest: ', data);
            _this.setBalanceForThisShop(data);

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