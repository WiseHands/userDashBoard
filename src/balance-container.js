import { LitElement, html } from 'lit-element';
import './table-transaction.js'
import './google-setting.js'

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
                .shop-name-container{
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                }
                .show-shop-name{
                  margin: 3px;
                }
                .edit-shop-name{
                  margin: 3px;
                  display: flex;
                }
                .edit-shop-name input{
                   border-style: none;
                   border-width: 1px;
                   border-bottom-style: solid;
                   margin-bottom: 5px;
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
            google-setting{
              width: 100%;
            }

            </style>

            <div class="main-balance-container">
              <div class="shop-name-container">
                <div class="show-shop-name">
                  <p>Магазин: ${this.shop.shopName}</p>
                  </div>
                <div class="edit-shop-name">
                  <p>Змінити назву магазину:</p>
                  <input id="shopName" .value=${this.shopName} @input="${this.handleShopName}">
                  <button @click="${this.saveShopName}">Зберегти</button>
                </div>
              </div>
                <!--<p>Інформація:</p>-->
                <span class="line"></span>
                <section class="balance-container">
                    <p> Баланс: ${this.roundToTwo(this.coinAccount.balance)} UAH</p>
                    <div class="row-container">
                        <p>Поповнити на суму:</p>
                        <input id="amountPayment" .value=${this.amountPayment} @input="${this.handleAmountPayment}" pattern="[0-9]+([\.,][0-9]+)?">
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
                              <button @click="${this.changePricingPlanForShop}">змінити</button>
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
                            <input id="adminPayment" .value=${this.offlinePayment} @input="${this.handleOfflinePayment}" pattern="^\d*(\.\d{0,2})?$" step=".01">
                            <button @click="${this.refillAdminPayment}">поповнити</button>

                        </div>
                    `}

                    <div class="transaction-table-container">
                      <span class="line"></span>
                        <p>Останні десять транзакцій</p>
                            <table-transaction .shop="${this.shop}" .transactionList="${this.coinAccount.transactionList}"></table-transaction>
                    </div>
                    <span class="line"></span>
                </section>

                <google-setting .shop="${this.shop}"></google-setting>

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
            shopName: {
                type: String
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
        this.shopName = '';
        this.getPricingPlanList();
        this.isUserSuperAdmin = true;
        this.hideOfflinePaymentSection();
        console.log('this.constructor balance-container', this.shop);
        this.addEventListener('show-balance-container', event => this.shop = event.detail);
    }

    roundToTwo(num) {
      return +(Math.round(num + "e+2") + "e-2");
    }

    handleShopName(e){
        this.shopName = e.target.value;
        this.shop.shopName = this.shopName
    }

    saveShopName(){
        const url = `/api/dashboard/shop/save-name?shopUuid=${this.shop.uuid}&shopName=${this.shop.shopName}`;
        fetch(url, {
            method: 'PUT'
        }).then(response => {return response.json()})
        .then(data => {
            this.updateShopObject(data)
        });
    }

    updateShopObject(data){
    this.dispatchEvent(new CustomEvent('update-shop-list',
        {
            bubbles: true,
            composed: true,
            detail: data
        })
      );
    }

    hideOfflinePaymentSection(){
        const _this = this;
        let token = localStorage.getItem('JWT_TOKEN');
        let tokenPayLoad = token.split('.')[1].replace('-', '+').replace('_', '/');
        let payLoad = JSON.parse(window.atob(tokenPayLoad));
        if (payLoad.isSuperAdmin == true){
          _this.isUserSuperAdmin = false;
        }
    }

    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if(propName === 'shop' && !!this.shop && !this.isBalanceRetrieved) {
                this.isBalanceRetrieved = true;
                this.getBalanceForThisShop();
                this.getFirstTenTransactions();
            }
            console.log(`${propName} changed. oldValue: ${oldValue}`);
        });
    }

    getBalanceForThisShop(){
        const url = `/api/dashboard/shop/info?shopUuid=${this.shop.uuid}`;
        this.generateGetRequest(url);
    }

    getFirstTenTransactions(){
        const url = `/api/transaction/get-ten-transactions?shopUuid=${this.shop.uuid}`
        this.generateGetRequest(url);
    }
    _getPlanName(plan) {
        if(plan) return plan.name;
        return 'Не встановлено';
    }

    getPricingPlanList(){
        const url = '/api/pricing-plan/get-list';
        fetch(url, {
            method: 'GET'
        }).then(response => { return response.json();
        }).then(data => {
           console.log('get getPricingPlanList from drop-down', data);
           this.pricePlanList = data;
        })
    }

    changePricingPlanForShop(){
        const plansList = this.shadowRoot.querySelector('#plans');
        const selectedUuidByIndex = plansList.selectedIndex;
        const pricingPlanUuid = plansList.querySelectorAll('option')[selectedUuidByIndex].id;

        const url = `/api/pricing-plan/set-plan-to-shop?shopUuid=${this.shop.uuid}&pricingPlanUuid=${pricingPlanUuid}`;

        this.setPricingPlanToThisShop(url);
    }

    setPricingPlanToThisShop(url){
        fetch(url, {
            method: 'POST'
        }).then( response => {
            return response.json();
        }).then( data=> {
            console.log('data from setPricingPlanToThisShop: ', data);
            this.setPlanForShop(data);
        });
    }

    setPlanForShop(data){
       this.updateCoinAccount(data.coinAccount);
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
       this.dispatchEvent(new CustomEvent('update-shop-list',
           {
               bubbles: true,
               composed: true,
               detail: this.shop
           })
       );
    }

    updateCoinAccount(data){
      console.log("updateCoinAccount data ", data);
        if (data) {
            this.coinAccount = data;
        } else {
            this.coinAccount.balance = 0;
        }
    }

    updateShopObject(data){
      console.log("updateShopObject data ", data);
        if (data.shopName){
            this.shop.shopName = data.shopName
        }
    }

    handleAmountPayment(e){
        this.amountPayment = e.target.value;
    }

    handleOfflinePayment(e){
         this.offlinePayment = e.target.value;
         this.roundToTwo(this.offlinePayment);
        console.log(`handleOfflinePayment${this.offlinePayment}`)
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
        const getParams = {
            method: 'GET',
            body: params
        }
        fetch(url, getParams).then(response => {
            return response.json();
        }).then(data => {
            this.updateShopObject(data);
            this.updateCoinAccount(data);
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
            return response.json();
        }).then(function (data) {
            console.log('data from generatePostRequest: ', data);
            _this.updateCoinAccount(data);

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
