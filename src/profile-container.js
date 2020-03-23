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
                    
                    <div class="payment-form-container">
                        <form id="payment-form" method="post" action="https://secure.wayforpay.com/pay">
                            <input id="merchantAccount" name="merchantAccount" value="">
                            <input id="merchantDomainName" name="merchantDomainName" value="">
                            <input id="merchantSignature" name="merchantSignature" value="">
                            <input id="merchantTransactionSecureType" name="merchantTransactionSecureType" value="AUTO">
                            <input id="orderReference" name="orderReference" value="USER_ID">
                            <input id="orderDate" name="orderDate" value="TIME">
                            <input id="amount" name="amount" value="">
                            <input id="currency" name="currency" value="UAH">
                            <input id="productName" name="productName[]" value="Поповнення рахунку користувача USER_ID">
                            <input id="productPrice" name="productPrice[]" value="">
                            <input id="productCount" name="productCount[]" value="1">
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

    submitFormForPayment(){
        const firstForm = document.getElementById('firstForm');
        firstForm.addEventListener('submit', function(event) {

        });
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
        this.shadowRoot.querySelector('#merchantAccount').value = data.merchantAccount;
        this.shadowRoot.querySelector('#merchantDomainName').value = data.merchantDomainName;
        this.shadowRoot.querySelector('#merchantSignature').value = data.signature;
        this.shadowRoot.querySelector('#orderReference').value = data.orderReference;
        this.shadowRoot.querySelector('#orderDate').value = data.orderDate;
        this.shadowRoot.querySelector('#amount').value = data.amount;
        this.shadowRoot.querySelector('#currency').value = data.currency;
        this.shadowRoot.querySelector('#productName').value = data.productName;
        this.shadowRoot.querySelector('#productCount').value = data.productCount;
        this.shadowRoot.querySelector('#productPrice').value = data.productPrice;
    }
}
// Register the new element with the browser.
customElements.define('profile-container', ProfileContainer);