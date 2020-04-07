import { LitElement, html } from 'lit-element';

class PricePlanMain extends LitElement {

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
              <p>Тариф: ${this.pricePlan.name}</p>
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