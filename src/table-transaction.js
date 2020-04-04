import { LitElement, html } from 'lit-element';

class TableTransaction extends LitElement {

    render(){
        return html`
            <style>               
                
                .container{
                    height: 100%;
                    width: 100%;
                }
                *{
                  box-sizing: border-box;
                }
                
                .wrapper {
                  width: 100%;
                  max-width: 1000px;
                  margin: 1em auto;
                  padding: 1em;
                }
                
                .is-striped {
                  background-color: rgba(233, 200, 147, 0.2);
                }
                
                /* Table column sizing
                ================================== */
                .date-cell {
                  width: 20%;
                }
                .topic-cell {
                  width: 30%;
                }
                .type-cell {
                  width: 18%;
                }
                .amount-cell {
                  width: 16%;
                }
                .status-cell {
                  width: 16%;
                }
                /* Apply styles
                ================================== */
                .Rtable {
                  display: -webkit-box;
                  display: flex;
                  flex-wrap: wrap;
                  margin: 0 0 3em 0;
                  padding: 0;
                  box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
                }
                .Rtable .Rtable-row {
                  width: 100%;
                  display: -webkit-box;
                  display: flex;
                }
                .Rtable .Rtable-row .Rtable-cell {
                  box-sizing: border-box;
                  -webkit-box-flex: 1;
                  flex-grow: 1;
                  padding: 0.8em 1.2em;
                  overflow: hidden;
                  list-style: none;
                }
                .Rtable .Rtable-row .Rtable-cell.column-heading {
                  background-color: #43BAC0;
                  color: white;
                  padding: 1em;
                }
                .Rtable .Rtable-row .Rtable-cell .Rtable-cell--heading {
                  display: none;
                }
                .Rtable .Rtable-row .Rtable-cell .Rtable-cell--content a {
                  font-size: 2em;
                  color: #333;
                }
                .Rtable .Rtable-row .Rtable-cell .Rtable-cell--content {
                  font-weight: 700;
                }
               /* Responsive
                ==================================== */
                @media all and (max-width: 875px) {
                  .is-striped {
                    background-color: white;
                  }
                  .Rtable--collapse {
                    display: block;
                    width: 100%;
                    padding: 1em;
                    box-shadow: none;
                  }
                  .Rtable--collapse .Rtable-row {
                    box-sizing: border-box;
                    width: 100%;
                    display: -webkit-box;
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 2em;
                    box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
                  }
                  .Rtable--collapse .Rtable-row .Rtable-cell {
                    width: 100% !important;
                    display: -webkit-box;
                    display: flex;
                    -webkit-box-align: center;
                            align-items: center;
                  }
                  .Rtable--collapse .Rtable-row .Rtable-cell .Rtable-cell--heading {
                    display: inline-block;
                    -webkit-box-flex: 1;
                            flex: 1;
                    max-width: 120px;
                    min-width: 120px;
                    color: #43BAC0;
                    font-weight: 700;
                    border-right: 1px solid #ccc;
                    margin-right: 1em;
                  }
                  .Rtable--collapse .Rtable-row .Rtable-cell .Rtable-cell--content {
                    -webkit-box-flex: 2;
                            flex: 2;
                    padding-left: 1em;
                  }
                  .Rtable--collapse .topic-cell {
                    background-color: #43BAC0;
                    color: white;
                    font-weight: 700;
                    -webkit-box-ordinal-group: 0;
                            order: -1;
                  }
                  .Rtable--collapse .topic-cell .Rtable-cell--content {
                    padding-left: 0 !important;
                  }
                  .Rtable--collapse .Rtable-row--head {
                    display: none;
                  }
                }
                .no-flexbox .Rtable {
                  display: block;
                }
                .no-flexbox .Rtable.Rtable-cell {
                  width: 100%;
                }
            </style>
            
            <div class="container">
              <div class="wrapper">
                <div class="Rtable Rtable--5cols Rtable--collapse">
                  <div class="Rtable-row Rtable-row--head">
                    <div class="Rtable-cell date-cell column-heading">Дата</div>
                    <div class="Rtable-cell topic-cell column-heading">Кому</div>
                    <div class="Rtable-cell type-cell column-heading">Тип</div>
                    <div class="Rtable-cell amount-cell column-heading">Сума</div>
                    <div class="Rtable-cell status-cell column-heading">Статус</div>
                  </div>
                    ${this.tranasctionList.map(item => html`    
                       
                       <div class="Rtable-row">
                      <div class="Rtable-cell date-cell">
                        <div class="Rtable-cell--heading">Дата</div>
                        <div class="Rtable-cell--content date-content"><span class="webinar-date">${this.setDateTime(item.time)}</div>
                      </div>
                      <div class="Rtable-cell topic-cell">
                        <div class="Rtable-cell--content title-content">${this.shop.shopName}</div>
                      </div>
                      <div class="Rtable-cell type-cell">
                        <div class="Rtable-cell--heading">Тип</div>
                        <div class="Rtable-cell--content access-link-content">${this.formatType(item.type)}</div>                        
                      </div>
                      <div class="Rtable-cell amount-cell">
                        <div class="Rtable-cell--heading">Сума</div>
                        <div class="Rtable-cell--content replay-link-content">${item.amount} ₴</div>
                      </div>
                      <div class="Rtable-cell Rtable-cell--foot status-cell">
                        <div class="Rtable-cell--heading">Статус</div>
                        <div class="Rtable-cell--content status-content">${this.formatStatus(item.status)}</div>
                      </div>
                    </div>
                                        
                    `)}                       
                </div>
              </div>
            </div>
                  
`;}

    static get properties() {
        return {
            shop: {
                type: Object,
            },
            tranasctionList:{
                type: Array
            }
        };
    }

    constructor() {
        super();
    }

    setDateTime(secs) {
      return moment.unix(secs).format('LL HH:mm');
    }

    formatStatus(statusCode) {
        let status = '';
        if (statusCode === 'PENDING') {
            status = 'Очікує підтвердження'
        } else if (statusCode === 'OK') {
            status = 'Успішно завершено'
        } else if (statusCode === 'FAIL') {
            status = 'Помилка опрацювання'
        }
        return status;
    }

    formatType(statusCode){
        let status = '';
        if (statusCode === 'REFILL') {
            status = 'Поповнення рахунку'
        } else if (statusCode === 'TRANSFER') {
            status = 'Переказ'
        } else if (statusCode === 'COMMISSION_FEE') {
            status = 'Списання комісії'
        }
        return status;
    }

}
// Register the new element with the browser.
customElements.define('table-transaction', TableTransaction);