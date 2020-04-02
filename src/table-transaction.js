import { LitElement, html } from 'lit-element';

class TableTransaction extends LitElement {

    render(){
        return html`
            <style>               
                
                .container{
                    height: 100%;
                    width: 100%;
                }
                
                /* Variables
                    ================================== */
                    @bw: 3px;  // border width
                    
                    
                    /* Tables
                    ================================== */
                    .Rtable {
                      display: flex;
                      flex-wrap: wrap;
                      margin: 0 0 3em 0;
                      padding: 0;
                    }
                    .Rtable-cell {
                      box-sizing: border-box;
                      flex-grow: 1;
                      width: 100%;  // Default to full width
                      padding: 0.8em 1.2em;
                      overflow: hidden; // Or flex might break
                      list-style: none;
                      border: solid @bw white;
                      background: fade(slategrey,20%);
                      > h1, > h2, > h3, > h4, > h5, > h6 { margin: 0; }
                    }
                    
                    /* Table column sizing
                    ================================== */
                    .Rtable--5cols > .Rtable-cell  { width: 20%; }
                 
                                     
            </style>
              <div class="container">
                  <div class="Rtable Rtable--5cols">
                      <div style="order:1;" class="Rtable-cell"><h3>Від</h3></div>
                      <div style="order:2;" class="Rtable-cell">ВФП</div>
                      
                    
                      <div style="order:1;" class="Rtable-cell"><h3>До</h3></div>
                      <div style="order:2;" class="Rtable-cell">магазин</div>
                      
                    
                      <div style="order:1;" class="Rtable-cell"><h3>Сумма</h3></div>
                      <div style="order:2;" class="Rtable-cell">2000 грн</div>                      
                      
                      <div style="order:1;" class="Rtable-cell"><h3>Статус</h3></div>
                      <div style="order:2;" class="Rtable-cell">Ок</div>
                      
                      <div style="order:1;" class="Rtable-cell"><h3>Дата</h3></div>
                      <div style="order:2;" class="Rtable-cell">01/04/2020 16:20</div>
                  </div>
              </div>
           

    `;}

    static get properties() {
        return {
            shop: {
                type: Object,
            },

        };
    }

    constructor() {
        super();
    }

    _buildUrlForShop(item){
        const token = localStorage.getItem('JWT_TOKEN');
        return `${window.location.protocol}//${item.domain}:${window.location.port}/admin?JWT_TOKEN=${token}`;
    }

    showBalanceWidgetForShop(){
        this.dispatchEvent(new CustomEvent('open-balance',
            {
                bubbles: true,
                composed: true,
                detail: this.shop
            })
        );
    }


}
// Register the new element with the browser.
customElements.define('table-transaction', TableTransaction);