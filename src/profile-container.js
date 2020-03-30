import { LitElement, html } from 'lit-element';

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
                    width: 100%;
                }
                    .balance-container{
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                    }
                        .payment-form-container form{
                            display: flex;
                            flex-direction: column;
                        }
                                     
            </style>
            
            <div class="main-container">
                <div class="balance-container">
                    <p>Баланс: ${this.balance} UAH</p>
                    <input id="amountPayment" .value=${this.amountPayment} @input="${this.handleAmountPayment}">
                    
                    <button @click="${this.generateSignatureForPayment}">поповнити</button>  
                    
                    <div class="payment-form-container" hidden>
                        <form id="payment-form" method="post" action="https://secure.wayforpay.com/pay">
                            <input id="account" name="merchantAccount" value="">
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
                
            </div>

    `;}

    static get properties() {
        return {
            balance: {
                type: Number
            },
            amountPayment: {
                type: Number
            }
        };
    }

    constructor() {
        super();
        this.balance = 0;
        this.amountPayment = 0;

    }

    handleAmountPayment(e){
        this.amountPayment = e.target.value;
    }

    generateSignatureForPayment(){
        const url = `/api/wayforpay/generate-signature?amount=${this.amountPayment}`;
        this.generatePostRequest(url);
        console.log(`get amount from value ${this.amountPayment}`)
    }

    replenishCoinAccount(){
        const url = '';
        this.generateGetRequest(url);
    }

    generateGetRequest(url){
        fetch(url, {
            method: 'GET',
        }).then(function (response) {
            console.log("response response: ", response);
            return response.json();
        }).then(function (data) {
            console.log('data for users: ', data);

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
        this.shadowRoot.querySelector('form').submit();
    }
}
// Register the new element with the browser.
customElements.define('profile-container', ProfileContainer);