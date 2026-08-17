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
let areasButtons;
let toggleViewButtons = Array.from(document.querySelectorAll('#view-toggle button'))
let openMenuBtn = document.querySelector('#header-menu-btn')
let closeMenuBtn = document.querySelector('#sidebar-close-btn')

openMenuBtn.addEventListener('click', e => {
    document.querySelector('#sidebar-overlay').classList.toggle('active')
    document.querySelector('#sidebar').classList.toggle('open')
})

closeMenuBtn.addEventListener('click', e => {
    document.querySelector('#sidebar-overlay').classList.toggle('active')
    document.querySelector('#sidebar').classList.toggle('open')
})

document.querySelector('#sidebar-overlay').addEventListener('click', e => {
    document.querySelector('#sidebar-overlay').classList.toggle('active')
    document.querySelector('#sidebar').classList.toggle('open')
})


//! OOP Classes

class Loading {
    constructor(){
        this.element = document.querySelector('#app-loading-overlay')
    }

    show() {
        this.element.style.display = 'flex'
    }

    hide() {
        this.element.style.display = 'none'
    }

}
class ApiService {
    constructor(baseUrl) { 
        this.baseUrl = baseUrl
    }

    async getEndPoint(endpoint) {
        try {

            let response = await fetch(`${this.baseUrl}${endpoint}`)
            if(!response.ok) {
                throw new Error(
                    `HTTP Error: ${response.status}`
                )
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}

class MealService {
    constructor(apiService) {
        this.api = apiService
    }

    async getAreas() {
        return await this.api.getEndPoint('meals/areas')
    }

    async getCategories() {
        return await this.api.getEndPoint(`meals/categories`)
    }
    
    async searchMeals(query = 'chicken', page = 1, limit = 25) {
        return await this.api.getEndPoint(`meals/search?q=${query}&page=${page}&limit=${limit}`);
    }

    async filterMeals(category, page = 1, limit = 25) {
        return await this.api.getEndPoint(`meals/filter?category=${category}&page=${page}&limit=${limit}`)
    }

    async mealsByArea(area, page = 1, limit = 25) {
        return await this.api.getEndPoint(`meals/filter?area=${area}&page=${page}&limit=${limit}`)
    }

}

class HomePage {
    constructor(mealService, mealServiceData, mealCategories, mealAreas) {
        this.mealService = mealService
        this.meals = mealServiceData
        this.mealCategories = mealCategories
        this.mealAreas = mealAreas
    }

    creatAreaCard(area) {
        return `
                <button
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
                    >
                    ${area.name}
                </button>`
    }

    renderAreas(mealAreas = this.mealAreas) {
        let areasCard = document.querySelector('#search-filters-section div.mx-auto > div:last-child')
        let allButtons = ``
        areasCard.innerHTML = ''
        mealAreas.forEach(area => {
            allButtons += this.creatAreaCard(area)
        })

        areasCard.innerHTML = `<button
              class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all"
            >
              All Recipes
            </button> ` + allButtons;
    }

    createCategoryCard(category) {
        let nameDetails = {
            'beef': {
                'div-color': 'bg-gradient-to-br from-red-50 to-rose-50',
                'background-color' : 'bg-gradient-to-br from-red-400 to-rose-500',
                'icon': 'drumstick-bite'
            },
            'chicken' : {
                'div-color': 'bg-gradient-to-br from-amber-50 to-orange-50',
                'background-color' : 'bg-gradient-to-br from-amber-400 to-orange-500',
                'icon': 'drumstick-bite'
            },
            'dessert' : {
                'div-color': 'bg-gradient-to-br from-pink-50 to-rose-50',
                'background-color' : 'bg-gradient-to-br from-pink-400 to-rose-500',
                'icon': 'cake-candles'
            },
            'lamb' : {
                'div-color': 'bg-gradient-to-br from-amber-50 to-orange-50',
                'background-color' : 'bg-gradient-to-br from-amber-400 to-orange-500',
                'icon': 'drumstick-bite'
            },
            'miscellaneous' : {
                'div-color': 'bg-gradient-to-br from-slate-50 to-gray-50',
                'background-color' : 'bg-gradient-to-br from-slate-400 to-gray-500',
                'icon': 'bowl-rice'
            },
            'pasta' : {
                'div-color': 'bg-gradient-to-br from-yellow-50 to-amber-50',
                'background-color' : 'bg-gradient-to-br from-yellow-400 to-amber-500',
                'icon': 'bowl-food'
            },
            'pork': {
                'div-color': 'bg-gradient-to-br from-red-50 to-rose-50',
                'background-color' : 'bg-gradient-to-br from-red-400 to-rose-500',
                'icon': 'bacon'
            },
            'seafood': {
                'div-color': 'bg-gradient-to-br from-cyan-50 to-blue-50',
                'background-color' : 'bg-gradient-to-br from-cyan-400 to-blue-500',
                'icon': 'fish'
            },
            'side': {
                'div-color': 'bg-gradient-to-br from-green-50 to-emerald-50',
                'background-color' : 'bg-gradient-to-br from-green-400 to-emerald-500',
                'icon': 'plate-wheat'
            },
            'starter': {
                'div-color': 'bg-gradient-to-br from-teal-50 to-cyan-50',
                'background-color' : 'bg-gradient-to-br from-teal-400 to-cyan-500',
                'icon': 'utensils'
            },
            'vegan': {
                'div-color': 'bg-gradient-to-br from-emerald-50 to-green-50',
                'background-color' : 'bg-gradient-to-br from-emerald-400 to-green-500',
                'icon': 'leaf'
            },
            'vegetarian': {
                'div-color': 'bg-gradient-to-br from-lime-50 to-green-50',
                'background-color' : 'bg-gradient-to-br from-lime-400 to-green-500',
                'icon': 'seedling'
            },
            'default': {
                'div-color': 'bg-gradient-to-br from-gray-50 to-gray-100',
                'background-color': 'bg-gradient-to-br from-gray-400 to-gray-500',
                'icon': 'utensils'
            }
        }
        let key = category.name.toLowerCase()
        let details = nameDetails[key] || nameDetails['default']
        return `<div
                    class="category-card ${details['div-color']} to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
                    data-category="${category.name}"
                    >
                    <div class="flex items-center gap-2.5">
                        <div
                            class="text-white w-9 h-9 ${details['background-color']}  rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                            >
                                <i class="fa-solid fa-${details['icon']}"></i>
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
                        </div>
                    </div>
                </div>`
    }

    renderCategories(categories = this.mealCategories) {
        let grid = document.querySelector('#categories-grid');
        grid.innerHTML = ''
        categories.forEach(category => {
            grid.innerHTML += this.createCategoryCard(category)
        })
    }

    createMealCard(meal) {
        return `<div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id="${meal.id}" >
                    <div class="relative h-48 overflow-hidden">
                        <img
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src="${meal.thumbnail}"
                        alt="${meal.name}"
                        loading="lazy"
                        />
                        <div class="absolute bottom-3 left-3 flex gap-2">
                            <span
                                class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                            >
                                ${meal.category}
                            </span>
                            ${meal.area != null? `<span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">${meal.area}</span>`: ''} 
                        </div>
                    </div>
                    <div class="p-4">
                        <h3
                        class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                        >
                            ${meal.name}
                        </h3>
                        <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                            ${meal.instructions.join(' ')}
                        </p>
                        <div class="flex items-center justify-between text-xs">
                            <span class="font-semibold text-gray-900">
                                <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                                ${meal.category}
                            </span>
                            <span class="font-semibold text-gray-500">
                                <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                                ${meal.area != null ? meal.area : 'International'}
                            </span>
                        </div>
                    </div>
                </div>`
    }

    renderMeals(meals = this.meals) {
        document.querySelector('#recipes-count').innerText = `Showing ${meals.length} recipes`;
        let grid = document.querySelector('#recipes-grid');
        grid.innerHTML = ''
        meals.forEach(meal => {
            grid.innerHTML += this.createMealCard(meal);
        })
    }

    activeCategory(categoriesCard) {
        categoriesCard.forEach(category => {
            category.addEventListener('click', async e => {
                const categoryName = e.currentTarget.dataset.category;
                const data = await this.mealService.filterMeals(categoryName)
            
                this.renderMeals(data.results)
            })
        })
    }

    activeArea(areasButtons) {
        areasButtons.forEach(areaButton => {
            areaButton.addEventListener('click', async e => {
                const areaName = e.currentTarget.innerText
                if (areaName.toLowerCase() == ('all recipes')) {
                    this.renderMeals()
                    return;
                }
                const data = await this.mealService.mealsByArea(areaName)
                this.renderMeals(data.results)
            })
        })
    }

    search(searchInput = document.querySelector('#search-input  ')) {
        searchInput.addEventListener('input', async e => {
            const query = e.target.value.trim()

            if(!query) {
                this.renderMeals()
            }

            const data = await this.mealService.searchMeals(query)
            this.renderMeals(data.results)
        })
    }

}

(async function() {
    const loading = new Loading()
    loading.show()
    try {
    
        activeLink(links)
        showActiveSection(sections)
        const api = new ApiService('https://nutriplan-api.vercel.app/api/')
        const meal = new MealService(api);
        const mealAreas = await meal.getAreas()
        const mealCategories = await meal.getCategories()
        const mealData = await meal.searchMeals();
        const homeMeals = new HomePage(meal, mealData.results, mealCategories.results, mealAreas.results.slice(0, 10));
        homeMeals.renderMeals();
        homeMeals.renderCategories();
        homeMeals.renderAreas();
        const categoriesCards = document.querySelectorAll('.category-card');
        homeMeals.activeCategory(categoriesCards)
        areasButtons = Array.from(document.querySelectorAll('#search-filters-section button'));
        homeMeals.activeArea(areasButtons)
        homeMeals.search()
        activeArea(areasButtons);
        changeViewRecipes(toggleViewButtons);
    } catch(error) {
        console.error(error)
    } finally{
        loading.hide()
    }

})();


function activeLink(links) {
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            links.forEach(link => {
                link.classList.remove('bg-emerald-50', 'text-emerald-700')
                link.classList.add('text-gray-600', 'hover:bg-gray-50')
                link.querySelector('span').classList.remove('font-semibold')
                link.querySelector('span').classList.add('font-medium')
            })
            e.currentTarget.classList.add('bg-emerald-50', 'text-emerald-700')
            e.currentTarget.classList.remove('text-gray-600', 'hover:bg-gray-50')
            e.currentTarget.querySelector('span').classList.add('font-semibold')
            e.currentTarget.querySelector('span').classList.remove('font-medium')
            currentActiveLink = e.currentTarget
            showActiveSection(sections, e.currentTarget)
        })
    })
}

function activeArea(areasButtons) {
    areasButtons.forEach(area => {
        area.addEventListener('click', e => {
            areasButtons.forEach(area => {
                area.classList.remove('bg-emerald-600', 'text-white', 'hover:bg-emerald-700')
                area.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200')
            })
            e.currentTarget.classList.add('bg-emerald-600', 'text-white', 'hover:bg-emerald-700')
            e.currentTarget.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200')
        })
    })
}

function changeViewRecipes(buttons) {
    buttons.forEach(button => {
        button.addEventListener('click', e => {
            buttons.forEach(button => {
                button.classList.remove('bg-white','rounded-md','shadow-sm')
            })
            e.currentTarget.classList.add('bg-white','rounded-md','shadow-sm')
            if(e.currentTarget.id == 'list-view-btn') {
                document.querySelector('#recipes-grid').classList.remove('grid-cols-4')
                document.querySelector('#recipes-grid').classList.add('grid-cols-2')
            } else {
                document.querySelector('#recipes-grid').classList.add('grid-cols-4')
                document.querySelector('#recipes-grid').classList.remove('grid-cols-2')
            }
        })
    })
}

function showActiveSection(sections , activeLink = currentActiveLink) {
    let sectionTarget = '';
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
            let homeSection = relatedSections[section.id]
            if(homeSection) {
                homeSection.forEach(id => document.querySelector('#' + id).classList.remove('hidden'))
                sectionValue = "home"
            }
            sectionTarget= sectionValue;
        }   
    })
    if (sectionTarget) {
        window.location.hash = `${sectionTarget}`;
    }
}