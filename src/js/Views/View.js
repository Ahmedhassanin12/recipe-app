import icons from 'url:../../img/icons.svg';


export default class View {
  data;
  render(data , render = true) {

    if (!data || (Array.isArray(data) && data.length === 0)) return this.errorMassage()

    this.data = data;
    const markup = this._markupView();

    if (!render) return markup;
    
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  
  update(data) {
    this.data = data;
    const newMarkup = this._markupView();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this.parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
  //clear input
  clear() {
    this.parentElement.innerHTML = '';
  }
  // spinner 
  renderSpinner() {
    const spinner = `<div class="spinner">
         <svg>
           <use href="${icons}#icon-loader"></use>
         </svg>
       </div>`;
    this.clear()
    this.parentElement.insertAdjacentHTML('afterbegin', spinner);
  }
  //Error Massage
   errorMassage(massage= this.errorMessage){
      const markup = `<div class="error">
          <div>
            <svg>
             <use href="${icons}#icon-alert-triangle"></use>
           </svg>
         </div>
          <p>${massage}</p>
        </div>`

        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
   }
  // Massage
  reMessage(message= this.message){
      const markup = `<div class="message">
          <div>
            <svg>
             <use href="${icons}#icon-smile"></use>
           </svg>
         </div>
          <p>${message}</p>
        </div>`

        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
   }
}