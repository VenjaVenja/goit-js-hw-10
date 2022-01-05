import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import { showCountryList, showCountryCard } from './js/templates';
// import countryCardTpl from '../src/templates/country-card.hbs';
// import countrylistTpl from '../src/templates/country-cards.hbs';

const DEBOUNCE_DELAY = 300;

const searchBoxEL = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchBoxEL.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    event.preventDefault();
    let searchCountry = searchBoxEL.value;
    console.log(`searchCountry: `, searchCountry);
    if (searchCountry.trim() === "") {
        countryListEl.innerHTML = "";
        countryInfoEl.innerHTML = "";
        return
    }
    fetchCountries(searchCountry.trim())
        .then(countries => {
            // console.log(country)
            if (countries.length > 10){
                Notify.info('Too many matches found. Please enter a more specific name.');
                countryListEl.innerHTML = "";
                countryInfoEl.innerHTML = "";
                return;
            }
            if (countries.length >= 2 && countries.length <= 10) {
                const listMarkup = countries.map(country => showCountryList(country))
                countryListEl.innerHTML = listMarkup.join('');
                countryInfoEl.innerHTML = "";

            }
            if (countries.length === 1) {
                const countryCardMarkup = countries.map(country => showCountryCard(country))
                countryListEl.innerHTML = "";
                countryInfoEl.innerHTML = countryCardMarkup.join('');
            }
        })
        .catch(error => {
            Notify.failure('Oops, there is no country with that name');
            countryListEl.innerHTML = "";
            countryInfoEl.innerHTML = "";
            return error
    })
};