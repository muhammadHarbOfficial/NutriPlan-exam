/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */

//? Variables

let links = Array.from(document.querySelectorAll('.nav-link'))
let sections = Array.from(document.querySelectorAll('section'));
let currentActiveLink = document.querySelector('.bg-emerald-50.text-emerald-700')
let relatedSections = {
    "all-recipes-section": ["search-filters-section", "meal-categories-section"]
};
let sectionTarget;
console.log();
console.log(currentActiveLink);
console.log(currentActiveLink.querySelector('span').innerText);

( _ => {
    activeLink(links)
    showActiveSection(sections, currentActiveLink)
})();


function activeLink(links) {
    links.forEach(link => {
        link.addEventListener('click', e => {
            links.forEach(link => {
                link.classList.remove('bg-emerald-50', 'text-emerald-700')
                link.classList.add('text-gray-600', 'hover:bg-gray-50')
                link.querySelector('span').classList.remove('font-semibold')
                link.querySelector('span').classList.add('font-medium')
            })
            e.currentTarget.classList.add('bg-emerald-50', 'text-emerald-700')
            e.currentTarget.classList.remove('text-gray-600', 'hover:bg-gray-50')
            showActiveSection(sections, e.currentTarget)
        })
    })
}



function showActiveSection(sections , activeLink ) {
    let newSections = sections.filter(section => section.id.endsWith('section'))
    let activeLinkValue = activeLink.querySelector('span').innerText.toLowerCase().replace(/ /g,'')
    sections.forEach(section => {
        section.classList.add('hidden')
    })
    newSections.forEach(section => {
        let sectionValue = section.id.replace(/-section/g, '')
        let sectionWords = sectionValue.split('-')
        if (sectionWords.some(word => activeLinkValue.includes(word))) {
            section.classList.remove('hidden')
            sectionTarget= section.id
            let homeSection = relatedSections[section.id]
            if(homeSection) {
                homeSection.forEach(id => document.querySelector('#' + id).classList.remove('hidden'))
            }
            
        }
    })
    console.log(sectionTarget);
    window.location.hash = sectionTarget;
    console.log(window.location.hash);
}
