// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';
import './subcription-container.js'
import './balance-container.js'
import './shop-tile.js'
import './price-plan-container.js'
// Extend the LitElement base class
class DashBoard extends LitElement {

    render(){
        return html`

            <style>
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }
                a {
                    text-decoration: none;
                }
                .main-container {
                    height: 100vh;
                }
                .header-profile-container{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 56px;
                }
                    .logo-container{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-family: 'Roboto', 'Helvetica', sans-serif;
                        font-size: 20px;
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
                         
<<<<<<< HEAD
#overlay-mobile {
    display: none;
    background-color: rgba(0,0,0,0);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
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
    height: 58px;
    padding: 0.5rem;
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
                    height: 58px;
                    padding: 0.5rem;
                }
                .sidebar-logo img {
                    width: 36px;
                    height: 36px;
                    padding-right: 0.7rem;
                }
                .sidebar-logo p {
                    font-size: 2rem;
                    margin-bottom: 0;
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
                    display: flex;
                    height: calc(100% - 56px)
                }
                .tools-dash-board-container{
                    width: 25%;
                }                                                                                               
                    .menu-item {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 4em;
                        border-bottom: 1px solid lightgrey;
                        font-family: 'Roboto', 'Helvetica', sans-serif;
                    }
                    .menu-item-logo{
                        height: 24px;
                        width: 24px;
                        margin: 5px;
                    }
                    .menu-item:hover{
                        background-color: darkgray;
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
                @media screen and (max-width: 768px) {
                    .tools-dash-board-container, .profile-info-container, .logo-container  {
                        display: none;
                    }
                    .work-place-dash-board-container {
                        width: 100%
                    }     
                    .mobile-logo-container, .mobile-profile-info-container {
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
            
             <div  id="overlay-mobile" class="null-style">
                <div class="sidebar-mobile sibebar-swipe-off">
                    <div class="mobile-tools-dash-board-container">
                        <div class="menu-item" @click="${this.showShopListContainer}">
                            <img class="menu-item-logo" src="wisehands/assets/images/dashboard/icon-store-dashboard.svg">
                            <p>Магазини</p>
                        </div>
                        <div class="menu-item" @click="${this.showSubscriptionContainer}">
                           <img class="menu-item-logo" src="wisehands/assets/images/dashboard/icon-subscr-dashboard.svg">
                           <p>Підписки</p>
                        </div>
                        <div class="menu-item" @click="${this.showPricePlanContainer}">
                           <img class="menu-item-logo" src="wisehands/assets/images/dashboard/priceplane.png">
                           <p>Тарифи</p>
                        </div>
                        <div class="menu-item" @click="${this.showProfileContainer}">
                            <img class="menu-item-logo" src="wisehands/assets/images/dashboard/icon-user-dashboard.svg">
                            <p>Профіль</p>
                        </div>
                    </div>
                </div>
                <div class="blur-block">
        
                </div>
            </div>
            <div class="main-container">
                                
                <div class="header-profile-container border">
                    <div class="logo-container">
                        <img class="logo" src="wisehands/assets/images/dashboard/main_logo_black.png">
                        <p class="product-name">WSTORE</p>
                    </div>
                    <div class="profile-info-container">
                        <div class="profile-info">
                            <p>${this.userFullName}</p>                                                        
                        </div>
                        <img class="logo" src="wisehands/assets/images/dashboard/user-header-info.svg">
                    </div>
                    
                    <div class="mobile-logo-container" @click="${this.showSideMenu}">
                        <img class="logo" src="wisehands/assets/images/dashboard/menu.svg">
                    </div>
                    
                    <div class="mobile-profile-info-container">
                        <div class="profile-info">
                            <p>${this.userFullName}</p>                                                        
                        </div>
                        <img class="logo" src="wisehands/assets/images/dashboard/user-header-info.svg">
                    </div>
                                     
                </div>

                <div class="body-dash-board-container">
                    <div class="tools-dash-board-container border">
                        <div class="menu-item" @click="${this.showShopListContainer}">
                            <img class="menu-item-logo" src="wisehands/assets/images/dashboard/icon-store-dashboard.svg">
                            <p>Магазини</p>
                        </div>
                        <div class="menu-item" @click="${this.showSubscriptionContainer}">
                           <img class="menu-item-logo" src="wisehands/assets/images/dashboard/icon-subscr-dashboard.svg">
                           <p>Підписки</p>
                        </div>
                        <div class="menu-item" @click="${this.showPricePlanContainer}">
                           <img class="menu-item-logo" src="wisehands/assets/images/dashboard/priceplane.png">
                           <p>Тарифи</p>
                        </div>
                        <div class="menu-item" @click="${this.showProfileContainer}">
                            <img class="menu-item-logo" src="wisehands/assets/images/dashboard/icon-user-dashboard.svg">
                            <p>Профіль</p>
                        </div>
                    </div>
                    <div class="work-place-dash-board-container border">
                        ${this.isShowShopListContainer ? html`                                            
                        <div class="shop-list-container">
                             <div class="inner-container">
                                <a @click="${this.creatingShopThroughWizard}">
                                    <div class="create-shop-element border">
                                        <div class="shop-name">
                                            <img class="create-shop-plus-logo" src="wisehands/assets/images/dashboard/plus.png">
                                        </div>
                                        <div class="create-shop-text-container">
                                            <p>Створити магазин</p>
                                        </div>
                                    </div>
                                </a>
                                ${this.shopList.map(item => html`
                                     <shop-tile .shop="${item}"></shop-tile>
                                `)}   
                             </div>                 
                        </div>` : html ``} 
                        
                        ${this.isShowSubscriptionContainer ? html `
                            <subcription-container></subcription-container>
                        ` : ''}
                        
                        ${this.isShowProfileContainer ? html `
                            <balance-container .shop="${this.selectedShop}"></balance-container>
                        ` : html ``}
                        
                        ${this.isShowPricePlanContainer ? html `
                            <price-plan-container></price-plan-container>
                        ` : html ``}
                        
                    </div>
                </div>
            </div>
                           
            
    `;}

    static get properties() {
        return {
            shopList: {
                type: Array,
                value: []
            },
            userFullName: {
                type: String,
            },
            isShowShopListContainer: {
                type: Boolean
            },
            isShowSubscriptionContainer: {
                type: Boolean
            },
            isShowProfileContainer: {
                type: Boolean
            },
            isShowSideMenu: {
                type: Boolean
            },
            isShowPricePlanContainer: {
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
        this.addEventListener('open-balance', event => {
                this.selectedShop = event.detail;
                this.showProfileContainer();
            }
        );
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
    setDisplayNoneToSidebarOverlay() {
        this.shadowRoot.querySelector("#overlay-mobile").style.display = 'none';
    }

    showSidebar(e) {
        e.stopPropagation();
    }


    hideSidebar() {
        this.shadowRoot.querySelector("#overlay-mobile").style.display = 'none';

    }
    creatingShopThroughWizard(){
        localStorage.setItem('isShopCreated', 'false');
        window.location="/ua/wizard";
    };

    showShopListContainer() {
        this.hideSidebar();
        this.isShowShopListContainer = true;
        this.isShowSubscriptionContainer = false;
        this.isShowProfileContainer = false;
        this.isShowPricePlanContainer = false;

    }

    showSubscriptionContainer() {
        this.hideSidebar();
        this.isShowSubscriptionContainer = true;
        this.isShowShopListContainer = false;
        this.isShowProfileContainer = false;
        this.isShowPricePlanContainer = false;

    }

    showProfileContainer() {
        this.hideSidebar();
        this.isShowProfileContainer = true;
        this.isShowShopListContainer = false;
        this.isShowSubscriptionContainer = false;
        this.isShowPricePlanContainer = false;

    }

    showPricePlanContainer(){
        this.hideSidebar();
        this.isShowShopListContainer = false;
        this.isShowSubscriptionContainer = false;
        this.isShowProfileContainer = false;
        this.isShowPricePlanContainer = true;
    }

    getShopList(){
        const _this = this;
        const url ='/api/dashboard/shops';
        let token = localStorage.getItem('JWT_TOKEN');
        fetch(url, {
            method: 'GET',
            headers: {
                authorization:  'Bearer ' + token
            }
        }).then(function (response) {
            console.log("response response: ", response);
            return response.json();
        }).then(function (data) {
            console.log('data for shopList: ', data);
            if (data){
                _this.shopList = data;
            }

        });
    }

    getUserInfo(){
        const _this = this;
        const url ='/api/dashboard/user';
        let token = localStorage.getItem('JWT_TOKEN');
        fetch(url, {
            method: 'GET',
            headers: {
                authorization:  'Bearer ' + token
            }
        }).then(function (response) {
            console.log("response response: ", response);
            return response.json();
        }).then(function (data) {
            console.log('data for users: ', data);
            if (data){
                _this.userFullName = `${data.givenName} ${data.familyName}`;
                console.log(`user UUID: ${data.uuid}`);
            }
        });
    }

}

// Register the new element with the browser.
customElements.define('dash-board', DashBoard);