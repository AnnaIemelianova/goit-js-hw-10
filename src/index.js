import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const countryData = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(handleInputCountries, DEBOUNCE_DELAY));

function handleInputCountries(event) {
    const inputValue = inputEl.value.trim();
    listEl.innerHTML = '';
    countryData.innerHTML = '';

    fetchCountries(inputValue)
    .then(data => {
        // console.log(data);
        if(data.length > 10) {
            Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
        }
        else if(data.length > 2 && data.length < 10) {
           const countiesListMarkup = data.reduce((acc, item) => acc + `<li>
            <img src="${item.flags.svg}" alt="${item.name.official}" width="50" height="50">${item.name.official}
            </li>`, '');
            listEl.insertAdjacentHTML('beforeend', countiesListMarkup);
        }
        else if(data.length === 1) {
            const dataCountryMarkup = data.reduce((acc, item) => acc + `
            <img src="${item.flags.svg}" alt="${item.name.official}" width="50" height="50">
            <h2>${item.name.official}</h2>
            <p>Capital: ${item.capital}</p>
            <p>Population: ${item.population}</p>
            <p>Language: ${Object.values(item.languages)}</p>
            `, '');
            countryData.insertAdjacentHTML('beforeend', dataCountryMarkup);
        }
    })
    .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    })
};


  

