import View from "./View";
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';


class Result extends View {
    parentElement = document.querySelector('.results');
    errorMessage = 'No recipe found for your query! please try again'
    message = ''

    _markupView(){
        
      return   this.data.map(result => previewView.render(result, false)).join('');
    }
}

export default new Result()