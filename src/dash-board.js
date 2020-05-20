// Import the LitElement base class and html helper function
import {LitElement, html} from 'lit-element';
import './price-plan-main-container.js'
import './balance-container.js'
import './shop-tile.js'
import './price-plan-list-container.js'
import './profile-picture.js'

// Extend the LitElement base class
class DashBoard extends LitElement {

  render() {
    return html`

            <style>
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }
                a {
                    text-decoration: none;
                }
                .main-container {
                }
                .dash-block {
                    max-width: 900px;
                    margin: 0 auto;
                }
                
                .header-profile-container{
                    position: fixed;
                    top: 0;
                    width: 100%;
                    background-color: #fff;
                    z-index: 10;
                }
                .header-dash-block {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    max-width: 900px;
                    margin: 0 auto;
                }
                    .logo-container{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-family: 'Roboto', 'Helvetica', sans-serif;
                        font-size: 20px;
                        padding-left: 0.5rem;
                    }
                    .logo{
                        height: 48px;
                        width: 48px;
                        margin: 5px;
                    }
                    .product-name{
                        margin-left: 5px;
                        color: rgba(0,0,0, .9);
                    }
                    .profile-info-container {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                        .profile-info{
                            display: flex;
                            flex-direction: column;
                            align-items: flex-end;
                        }
                        .profile-info p{
                            margin: 0;
                        }

                #overlay-mobile {
                    display: none;
                    background-color: rgba(0,0,0,0);
                    width: 100%;
                    height: 100%;
                    position: fixed;
                    z-index: 400;
                    padding: 0;
                    margin: 0;
                }
                .sidebar-mobile {
                    width: 85%;
                    height: 100%;
                    background-color: rgba(255,255,255,1);
                    opacity: 1;
                    animation: sidebarmove 0.3s linear;
                    position: fixed;
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }
                @keyframes sidebarmove {
                    from {
                        opacity: 0;
                        transform: translate3d(-100%, 0, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                .sibebar-swipe-off {
                    width: 0%;
                    height: 100%;
                    background-color: rgba(255,255,255,1);
                    opacity: 1;
                    transition-delay: 0.3s;
                    animation: sidebarswipeoff 0.3s linear;
                }
                @keyframes sidebarswipeoff {
                    from {
                        transform: translate3d(0, 0, 0);
                    }

                    to {
                        visibility: hidden;
                        transform: translate3d(-100%, 0, 0);
                    }
                }
                .sidebar-logo {
                    display: flex;
                    align-items: center;
                    height: 63px;
                    padding-left: 0.7rem;

                }
                .sidebar-logo img {
                    width: 36px;
                    height: 36px;
                    padding-right: 0.7rem;
                }
                .sidebar-logo p {
                    font-size: 2rem;
                    margin: 0;
                }
                .sidebar-panel {
                    display: flex;
                    flex-direction: column;
                    line-height: 2;
                    padding: 10px;
                    font-size: 1.2rem;
                }
                .sidebar-panel a {
                    cursor: pointer;
                    color: #262626;
                    line-height: 2.5;
                }
                .sidebar-panel p {
                    font-size: 1.3rem;
                    margin-bottom: 0;
                }
                .mobile-logo-container, .mobile-profile-info-container  {
                    display: none;
                }
                .body-dash-board-container{
                    position: relative;
                    top: 63px;
                    display: flex;
                    height: calc(100% - 56px)
                }
                .tools-dash-board-container{
                    position: sticky;
                    height: 100%;
                    width: 25%;
                    top: 63px;

                }
                    .menu-item {
                        display: flex;
                        align-items: center;
                        height: 4em;
                        font-family: 'Roboto', 'Helvetica', sans-serif;
                        padding-left: 1rem;
                        margin: 0.5rem;
                        border-radius: 5px;
                    }
                    .menu-item[selected] {
                        background-color: #eaf0fa;
                    }
                    .menu-item-logo{
                        height: 24px;
                        width: 24px;
                        margin: 5px;
                        padding-right: 0.5rem;
                    }
                    .menu-item:hover{
                        background-color: #eaf0fa;
                        cursor: pointer;
                    }
                .work-place-dash-board-container{
                    display: flex;
                    width: 75%;
                }
                    .shop-list-container{

                    }
                    .inner-container{
                        display: flex;
                        flex-wrap: wrap;

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
                        .create-shop-element:hover {
                            cursor: pointer;
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

                    shop-tile{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin: 15px;
                        height: 200px;
                        width: 200px;
                    }

                    subcription-container{
                        width: 100%;
                        height: 100%;
                        display: flex;
                    }
                    balance-container{
                        display: flex;
                        width: 100%;
                    }
                    price-plan-container{
                        display: flex;
                        width: 100%;
                    }
                @media screen and (min-width: 1500px) {
                    .dash-block, .header-dash-block {
                    max-width: 1300px;
                    }
                }
                @media screen and (max-width: 768px) {
                    .tools-dash-board-container, .logo-container  {
                        display: none;
                    }
                    .work-place-dash-board-container, shop-tile, .create-shop-element {
                        width: 100%
                    }
                    shop-tile, .create-shop-element {
                        height: 250px;
                    }
                    .shop-name {
                        height: 70%;
                        width: 90%;
                    }
                    .mobile-logo-container {
                        display: flex;
                        align-items: center;
                    }
                }

            </style>

             <div  id="overlay-mobile" class="null-style" @click="${this.closeSidebar}">
                <div class="sidebar-mobile sibebar-swipe-off" @click="${this.showSidebar}">
                    <a class="link" href="/dashboard">
                        <div class="sidebar-logo">
                            <img src="/wisehands/assets/images/wiseblack.png">
                            <p>WSTORE</p>
                        </div>
                    </a>
                    <div class="mobile-tools-dash-board-container">
                        <div class="menu-item" @click="${this.showShopListContainer}" selected>
                            <img class="menu-item-logo" src="wisehands/assets/images/dashboard/icon-store-dashboard.svg">
                            <p>Магазини</p>
                        </div>

                         ${this.isHiddenPlansBlockInMenu ? html `` : html `
                            <div class="menu-item" @click="${this.showPricePlanListContainer}">
                               <img class="menu-item-logo" src="wisehands/assets/images/dashboard/priceplane.png">
                               <p>Тарифи</p>
                            </div>
                        `}

                        <div class="menu-item" @click="${this.logOutUser}">
                            <img class="menu-item-logo" src="wisehands/assets/images/dashboard/icon-user-dashboard.svg">
                            <p>Вихід</p>
                        </div>
                    </div>
                </div>
                <div class="blur-block">

                </div>
            </div>
            <div class="main-container ">

                <div class="header-profile-container border">
                    <div class="header-dash-block">
                        <div class="logo-container">
                            <img class="logo" src="/wisehands/assets/images/dashboard/main_logo_black.png">
                            <p class="product-name">WSTORE</p>
                        </div>
                        <div class="mobile-logo-container" @click="${this.showSideMenu}">
                            <img class="logo" src="wisehands/assets/images/dashboard/menu.svg">
                        </div>
                        <profile-picture .user="${this.user}"></profile-picture>

                    </div>
                </div>

                <div class="body-dash-board-container dash-block">
                    <div class="tools-dash-board-container">
                        <div class="menu-item" @click="${this.showShopListContainer}" selected>
                            <img class="menu-item-logo" src="wisehands/assets/images/dashboard/icon-store-dashboard.svg">
                            <p>Магазини</p>
                        </div>

                        ${this.isHiddenPlansBlockInMenu ? html `` : html `

                        <div class="menu-item" @click="${this.showPricePlanListContainer}">
                           <img class="menu-item-logo" src="wisehands/assets/images/dashboard/priceplane.png">
                           <p>Тарифи</p>
                        </div>

                        `}

                        <div class="menu-item" @click="${this.logOutUser}">
                            <img class="menu-item-logo" src="wisehands/assets/images/dashboard/icon-user-dashboard.svg">
                            <p>Вихід</p>
                        </div>
                    </div>
                    <div class="work-place-dash-board-container">
                        ${this.isShowShopListContainer ? html`
                        <div class="shop-list-container">
                             <div class="inner-container">
                                    <div class="create-shop-element border">
                                        <a @click="${this.creatingShopThroughWizard}" class="shop-name">
                                          <div>
                                              <img class="create-shop-plus-logo" src="wisehands/assets/images/dashboard/plus.png">
                                          </div>
                                        </a>
                                        <div class="create-shop-text-container">
                                            <p>Створити магазин</p>
                                        </div>
                                    </div>                            
                                ${this.shopList.map(item => html`
                                     <shop-tile .shop="${item}"></shop-tile>
                                `)}
                             </div>
                        </div>` : html ``}

                        ${this.isShowBalanceContainer ? html `
                            <balance-container .shop="${this.selectedShop}"></balance-container>
                        ` : html ``}

                        ${this.isShowPricePlanListContainer ? html `
                            <price-plan-list-container></price-plan-list-container>
                        ` : html ``}

                        ${this.isShowPricePlanMainContainer ? html `
                            <price-plan-main-container .pricePlan="${this.selectedPricePlan}"></price-plan-main-container>
                        ` : html ``}

                    </div>
                </div>
            </div>


    `;
  }

  static get properties() {
    return {
      shopList: {
        type: Array,
        value: []
      },
      userFullName: {
        type: String
      },
      isShowShopListContainer: {
        type: Boolean
      },
      isShowBalanceContainer: {
        type: Boolean
      },
      isShowSideMenu: {
        type: Boolean
      },
      isShowPricePlanListContainer: {
        type: Boolean
      },
      isShowPricePlanMainContainer: {
        type: Boolean
      },
      isHiddenPlansBlockInMenu: {
        type: Boolean
      }
    };
  }


  constructor() {
    super();
    this.getShopList();
    this.getUserInfo();
    this.shopList = [];
    this.userFullName = 'Ім. Пр.';
    this.isShowShopListContainer = true;
    this.isHiddenPlansBlockInMenu = true;
    this.checkIfUserIsLogIn();
    this.hidePlansBlockInMenu();
    this.updateShopList();
    this.openBalanceContainer();
    this.openPricingPlan();
    this.openPricingPlanList();

    console.log('this.constructor dash-board-container', this.shop);

  }

  hidePlansBlockInMenu() {
    const _this = this;
    let token = localStorage.getItem('JWT_TOKEN');
    let tokenPlayLoad = token.split('.')[1].replace('-', '+').replace('_', '/');
    let playLoad = JSON.parse(window.atob(tokenPlayLoad));
    if (playLoad.isSuperAdmin == true) {
      console.log('JSON playload from JWT true: ', playLoad.isSuperAdmin);
      _this.isHiddenPlansBlockInMenu = false;
    }
  }

  openBalanceContainer() {
    this.addEventListener('show-balance-container', event => {
        console.log("show-balance-container in addEventListener: ", event.detail);
        this.selectedShop = event.detail;
        this.showBalanceContainer();
      }
    );
  }

  updateShopList() {
    this.addEventListener('update-shop-list', this._updateShopListHandler);
  }

  _updateShopListHandler(event) {
    const affectedShop = event.detail;
    const shop = this.shopList.find(shop => shop.uuid === affectedShop.uuid);
    shop.shopName = affectedShop.shopName;
    shop.pricingPlan = affectedShop.pricingPlan;
    shop.coinAccount.balance = affectedShop.coinAccount.balance;

    shop.googleWebsiteVerificator = affectedShop.googleWebsiteVerificator;
    shop.googleAnalyticsCode = affectedShop.googleAnalyticsCode;
    shop.googleStaticMapsApiKey = affectedShop.googleStaticMapsApiKey;
    shop.googleMapsApiKey = affectedShop.googleMapsApiKey;
    shop.faceBookPixelApiKey = affectedShop.faceBookPixelApiKey;

    
  }

  openPricingPlan() {
    this.addEventListener('open-pricing-plan', event => {
        this.selectedPricePlan = event.detail;
        this.showPricingPlanMainContainer();
      }
    );
  }

  openPricingPlanList() {
    this.addEventListener('open-pricing-plan-list', event => {
        this.selectedPricePlan = event.detail;
        this.showPricePlanListContainer();
      }
    );
  }

  checkIfUserIsLogIn() {
    let token = localStorage.getItem('JWT_TOKEN');
    if (!token) {
      window.location = '/';
    }
  }

  logOutUser() {
    localStorage.removeItem('JWT_TOKEN');
    window.location = '/';
  }

  showSideMenu() {
    console.log('click');
    this.isShowSideMenu = true;
    this.shadowRoot.querySelector("#overlay-mobile").style.display = 'block';
    this.shadowRoot.querySelector(".sidebar-mobile").classList.remove('sibebar-swipe-off');
  }

  closeSidebar() {
    this.shadowRoot.querySelector(".sidebar-mobile").classList.add('sibebar-swipe-off');
    setTimeout(this.setDisplayNoneToSidebarOverlay, 300);
    this.shadowRoot.querySelector("#overlay-mobile").style.display = 'none';
  }

  showSidebar(e) {
    e.stopPropagation();
  }

  hideSidebar() {
    this.shadowRoot.querySelector("#overlay-mobile").style.display = 'none';
  }

  creatingShopThroughWizard() {
    localStorage.setItem('isShopCreated', 'false');
    window.location = "/ua/wizard";
  }

  showShopListContainer(event) {
    this.hideSidebar();
    this.isShowShopListContainer = true;
    this.isShowBalanceContainer = false;
    this.isShowPricePlanListContainer = false;
    this.isShowPricePlanMainContainer = false;
    this.setSelectedState(event.currentTarget);
  }

  setSelectedState(clickedMenuItem) {
    const isClickedMenuItemSelected = clickedMenuItem.hasAttribute('selected');
    if (!isClickedMenuItemSelected) {
      const selectedMenuItems = this.shadowRoot.querySelectorAll('[selected]');
      selectedMenuItems.forEach(item => item.removeAttribute('selected'));
      clickedMenuItem.setAttribute('selected', '');
    }
  }

  showBalanceContainer() {
    this.hideSidebar();
    this.isShowBalanceContainer = true;
    this.isShowShopListContainer = false;
    this.isShowPricePlanListContainer = false;
    this.isShowPricePlanMainContainer = false;
  }

  showPricePlanListContainer(event) {
    this.hideSidebar();
    this.isShowPricePlanListContainer = true;
    this.isShowShopListContainer = false;
    this.isShowBalanceContainer = false;
    this.isShowPricePlanMainContainer = false;
    this.setSelectedState(event.currentTarget);
  }

  showPricingPlanMainContainer() {
    this.hideSidebar();
    this.isShowShopListContainer = false;
    this.isShowBalanceContainer = false;
    this.isShowPricePlanListContainer = false;
    this.isShowPricePlanMainContainer = true;
  }

  getShopList() {
    const url = '/api/dashboard/shops';
    let token = localStorage.getItem('JWT_TOKEN');
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token
      }
    }).then(response => {
      return response.json();
    }).then(data  => {
      console.log('getShopList: ', data);
      this.shopList = data;
    });
  }

  getUserInfo() {
    const _this = this;
    const url = '/api/dashboard/user';
    let token = localStorage.getItem('JWT_TOKEN');
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token
      }
    }).then(function (response) {
      console.log("response response: ", response);
      return response.json();
    }).then(function (data) {
      console.log('data for users: ', data);
      if (data) {
        _this.user = data;
        _this.userFullName = `${data.givenName} ${data.familyName}`;
        console.log(`user UUID: ${data.uuid}`);
      }
    });
  }

}

// Register the new element with the browser.
customElements.define('dash-board', DashBoard);
