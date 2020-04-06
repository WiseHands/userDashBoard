import { LitElement, html } from 'lit-element';
import './price-plan-tile.js'

class PricePlanContainer extends LitElement {

    render(){
        return html`
            <style>     
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }
                
                .container{
                    height: 100%;
                    width: 100%;
                    
                }
                .price-plan-container{
                    display: flex;
                    flex-wrap: wrap;
                }
                .price-plan-container a {
                    text-decoration: none;
                }
                .price-plan-container a:hover {
                    cursor: pointer;
                }
                .create-shop-element{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: 15px;
                    height: 200px;
                    width: 200px;
                }                        
                .create-shop-text-container{
                    display: flex;                            
                    align-items: center;
                    padding-top: 10px;
                    height: 40px;
                }
                .create-shop-element p{
                     color: black;
                }
                    .create-shop-plus-logo{
                        height: 24px;
                        width: 24px;
                    }
            
                .shop-name{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        height: 60%;
                        width: 90%;
                        border-radius: 5px;
                        background-color: #00BCD4;
                    }
                        .shop-name p{
                            font-size: 2em;
                        }
                price-plane-tile{
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  margin: 15px;
                  height: 200px;
                  width: 200px;
                }      
                .creating-price-plan-container{
                  display: flex;
                  flex-direction: column;  
                  margin: 5px;
                }
                .plan-name-container, .plan-commission-container {
                  display: flex;
                  flex-direction: row;  
                }
                .plan-name-container input, p {
                  margin: 5px;  
                }
                .plan-commission-container input, p{
                  margin: 5px;
                }  
            </style>
            
            <div class="container">
              ${this.isShowPricePlanContainer ? html `
                  <section class="price-plan-container">
                    <a @click="${this.creatingPricePlanForShops}">
                      <div class="create-shop-element border">
                        <div class="shop-name">
                          <img class="create-shop-plus-logo" src="wisehands/assets/images/dashboard/plus.png">
                        </div>
                        <div class="create-shop-text-container">
                          <p>Створити тариф</p>
                        </div>
                      </div>
                    </a>
                      
                  </section> ` : html ``
              }
              ${this.isShowCreatingPricePlan ? html `
                <section class="creating-price-plan-container">
                  <p>Створення нового тарифного плану</p>
                  <div class="plan-name-container">
                    <p>Назва тварифу</p>
                    <input id="planMame" .value=${this.planName} @input="${this.handlePlanName}">                
                  </div>
                  <div class="plan-commission-container">
                    <p>Відсоток комісії (показати %)</p>
                    <input id="commission" .value=${this.commissionForPlane} @input="${this.handleCommissionForPlane}">                
                  </div>
                  <div>
                    <button @click="${this.savingPricePlane}">Зберегти</button>                  
                  </div>
                  
                  
                </section>  
              ` : html ``
              }
              
            </div>
                  
`;}

    static get properties() {
        return {
            shop: {
              type: Object,
            },
            planName: {
              type: String
            },
            commissionForPlane: {
              type: String
            },
            isShowPricePlanContainer : {
              type: Boolean
            },
            isShowCreatingPricePlan : {
              type: Boolean
            }
        };
    }

    constructor() {
        super();
        this.planName = '';
        this.commissionForPlane = '';
        this.isShowPricePlanContainer = true;
    }

    handlePlanName(e){
        this.planName = e.target.value;
    }

    handleCommissionForPlane(e){
        this.commissionForPlane = e.target.value;
    }

    creatingPricePlanForShops(){
        this.isShowCreatingPricePlan = true;
        this.isShowPricePlanContainer = false;
    }

    savingPricePlane(){
        const url = `/api/pricing-plan/create?planName=${this.planName}&commissionFree=${this.commissionForPlane}`;
        this.generatePostRequestForCreatingPricingPlan(url);

    }

    generatePostRequestForCreatingPricingPlan(url){
        const _this = this;
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
            console.log('data from generatePostRequest PLAN:: ', data);
            _this.isShowCreatingPricePlan = false;
            _this.isShowPricePlanContainer = true;
        });
    }


//     ${this.pricePlanList.map(item => html`
//        <price-plane-tile .pricePlan="${item}"></price-plane-tile>
//     `)}

}
// Register the new element with the browser.
customElements.define('price-plan-container', PricePlanContainer);