// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';

// Extend the LitElement base class
class ProfilePicture extends LitElement {

    render(){
        return html`

    <style>
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
        .logo{
            height: 48px;
            width: 48px;
            margin: 5px;
        }
        @media screen and (max-width: 768px) {
                    .profile-info-container{
                        display: flex;
                    }    
                }
    </style>
            

                        <div class="profile-info-container">
                            <div class="profile-info">
                                <p>${this.computeUserName(this.user)}</p>                                                        
                            </div>
                            <img class="logo" src="${this.computeProfilePicture(this.user)}">
                        </div>
                        
                           
            
    `;}

    static get properties() {
        return {
            user: {
                type: Object,
            },
        };
    }
    computeUserName(user) {
        if (user.uuid){
            return user.name;
        }
    };
    computeProfilePicture(user) {
        if (user.profileUrl){
            return user.profileUrl;
        }
        else {
            return 'wisehands/assets/images/dashboard/user-header-info.svg';
        }
    };
}

// Register the new element with the browser.
customElements.define('profile-picture', ProfilePicture);