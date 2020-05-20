// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';

// Extend the LitElement base class
class WiseInput extends LitElement {

    render(){
        return html`

    <style>
        .group {
            position: relative;
        }
        input 				{
          font-size:18px;
          padding:10px 10px 10px 5px;
          display:block;
          width:300px;
          border:none;
          border-bottom:1px solid #757575;
        }
        input:focus 		{ outline:none; }
        
        /* LABEL ======================================= */
        label 				 {
          color:#999; 
          font-size:18px;
          font-weight:normal;
          position:absolute;
          pointer-events:none;
          left:5px;
          top:10px;
          transition:0.2s ease all; 
          -moz-transition:0.2s ease all; 
          -webkit-transition:0.2s ease all;
        }
        
        /* active state */
        input:focus ~ label, input:valid ~ label 		{
          top:-20px;
          font-size:14px;
          color:#5264AE;
        }
        
        /* BOTTOM BARS ================================= */
        .bar 	{ position:relative; display:block; width:300px; }
        .bar:before, .bar:after 	{
          content:'';
          height:2px; 
          width:0;
          bottom:1px; 
          position:absolute;
          background:#5264AE; 
          transition:0.2s ease all; 
          -moz-transition:0.2s ease all; 
          -webkit-transition:0.2s ease all;
        }
        .bar:before {
          left:50%;
        }
        .bar:after {
          right:50%; 
        }
        
        /* active state */
        input:focus ~ .bar:before, input:focus ~ .bar:after {
          width:50%;
        }
        
        /* HIGHLIGHTER ================================== */
        .highlight {
          position:absolute;
          height:60%; 
          width:100px; 
          top:25%; 
          left:0;
          pointer-events:none;
          opacity:0.5;
        }
        
        /* active state */
        input:focus ~ .highlight {
          -webkit-animation:inputHighlighter 0.3s ease;
          -moz-animation:inputHighlighter 0.3s ease;
          animation:inputHighlighter 0.3s ease;
        }
        
        /* ANIMATIONS ================ */
        @-webkit-keyframes inputHighlighter {
            from { background:#5264AE; }
          to 	{ width:0; background:transparent; }
        }
        @-moz-keyframes inputHighlighter {
            from { background:#5264AE; }
          to 	{ width:0; background:transparent; }
        }
        @keyframes inputHighlighter {
            from { background:#5264AE; }
          to 	{ width:0; background:transparent; }
        }
        
        .material-form-field {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  position: relative;
  display: block;
  color: #000000;
  padding: 25px 0 10px 0;
}
.material-form-field .material-form-field-label {
  position: absolute;
  display: block;
  top: 35px;
  left: 0px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  pointer-events: none;
  cursor: text;
}
.material-form-field input {
  padding: 10px 0 10px 0;
  display: block;
  width: 100%;
  border: none;
  font-size: 14px;
  color: #000000;
  border-bottom: 1px solid #000000;
  outline: none;
}
.material-form-field input:invalid {
  outline: none;
  box-shadow: none;
}
.material-form-field input:valid ~ .material-form-field-label, .material-form-field input:focus ~ .material-form-field-label {
  top: 10px;
  font-size: 12px;
}
.material-form-field input:focus {
  outline: none;
  color: #3f51b5;
  padding-bottom: 8px;
  border-bottom-width: 3px;
  border-bottom-color: #3f51b5;
}

 
 
 
  
  
  
   
.material-form-field input:focus ~ .material-form-field-label {
  color: #3f51b5;
}
    </style>
            

    <div class="group">      
      <input type="text" required>
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Name</label>
    </div>
                        
    <div class="material-form-field material-form-field-invalid" data-validationError="This field is invalid">
        <input type="text" required name="text-invalid" id="field-text-invalid"/>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label class="material-form-field-label" for="field-text-invalid">Validation</label>
    </div>                       
            
    `;}

    // static get properties() {
    //     return {
    //         user: {
    //             type: Object,
    //         },
    //     };
    // }
}

// Register the new element with the browser.
customElements.define('wise-input', WiseInput);