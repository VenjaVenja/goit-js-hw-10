export function showCountryList ({ flags, name }){
    return `
    <li class = 'country-item'>
    <img class = 'country-list__flags' src="${flags.svg}" alt="${name.official}" width=50 />
    <h2 class = 'country-list__name'>${name.official}</h2>
    </li>
    `
}

export function showCountryCard ({ flags, name, capital, population, languages}){
    return `
    <div class='wrap'>
        <img class='country-flag' src='${flags.svg}' alt='${name.official}' width=75 />
        <h2 class='country-title'>${name.official}</h2>
     </div>
    <div class='wrap'>
        <p class='country-text'>Capital:</p>
        <span class='country-subtext'>${capital}</span>
    </div>
    <div class='wrap'>
        <p class='country-text'>Population:</p>
        <span class='country-subtext'>${population}</span>
    </div>
    <div class='wrap'>
        <p class='country-text'>Languages:</p>
        <span class='country-subtext'>${Object.values(languages)}</span>
    </div>
    `
}