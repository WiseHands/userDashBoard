import { LitElement, html } from 'lit-element';

class PricePlanMain extends LitElement {

    render(){
        return html`
            <style>
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }
                .column{
                    flex-direction: column;
                }
                .row{
                    flex-direction: row;
                }
                .container{
                    display: flex;
                }
                .main-container{
                    display: flex;
                    margin: 15px;                   
                }
                .container p, input, button{
                    margin: 5px;
                }
                                     
            </style>
            
            <div class="main-container column">
              <p>Редагування тарифного плану</p>
              <div class="container row">
                <p>Тариф: </p>
                <input .value="${this.pricePlan.name}">
              </div>
              <div class="container row">
                <p>Відсоток: </p>
                <input .value="${this.pricePlan.commissionFree}">
              </div>
              <div class="container row">
                <button>Зберегти</button>
                <button>Видалити</button>
              </div>  
            </div>

    `;}

    static get properties() {
        return {
            pricePlan: {
                type: Object,
            }
        };
    }

    constructor() {
        super();

    }



}
// Register the new element with the browser.
customElements.define('price-plan-main-container', PricePlanMain);