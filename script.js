const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const hamburger = document.getElementById("hamburger");
const categoriesDiv = document.getElementById("categories");
const menu = document.getElementById("menu");
const search = document.getElementById("search");
const categoryTitle = document.getElementById("category-title");
const loadingScreen = document.getElementById("loading-screen");

const modal = document.getElementById("item-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-desc");

// Sidebar toggle
hamburger.onclick = () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
};

overlay.onclick = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
};

let selectedCategory = "All";
let currentLang = "en";

// Translations
const translations = {
    en: {
        searchPlaceholder: "Search food...",
        categoryAll: "All",
        poweredBy: "📸 Powered by ATLAS",
        restaurantName: "My Restaurant",
        noDescription: "No description available",
        // Category translations
        categories: {
            "Pizza": "Pizza",
            "Fast Food": "Fast Food",
            "Drinks": "Drinks",
            "Desserts": "Desserts",
            "Salads": "Salads",
            "Pasta": "Pasta"
        }
    },
    al: {
        searchPlaceholder: "Kërkoni ushqim...",
        categoryAll: "Të gjitha",
        poweredBy: "📸 Mundësuar nga ATLAS",
        restaurantName: "Restoranti Im",
        noDescription: "Nuk ka përshkrim",
        // Category translations
        categories: {
            "Pizza": "Pica",
            "Fast Food": "Ushqim i Shpejtë",
            "Drinks": "Pije",
            "Desserts": "Ëmbëlsira",
            "Salads": "Sallata",
            "Pasta": "Makaronat"
        }
    },
    it: {
        searchPlaceholder: "Cerca cibo...",
        categoryAll: "Tutti",
        poweredBy: "📸 Powered by ATLAS",
        restaurantName: "Il Mio Ristorante",
        noDescription: "Nessuna descrizione disponibile",
        // Category translations
        categories: {
            "Pizza": "Pizza",
            "Fast Food": "Fast Food",
            "Drinks": "Bevande",
            "Desserts": "Dolci",
            "Salads": "Insalate",
            "Pasta": "Pasta"
        }
    }
};

// Menu items with translations
const menuItems = [
    { 
        category: "Pizza", 
        price: 8, 
        img: "https://lilluna.com/wp-content/uploads/2025/10/margherita-pizza-resize-8-1.jpg",
        translations: {
            en: { name: "Margherita Pizza", description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil" },
            al: { name: "Pica Margherita", description: "Pica klasike italiane me mocarela të freskët, domate dhe borzilok" },
            it: { name: "Pizza Margherita", description: "Pizza italiana classica con mozzarella fresca, pomodoro e basilico" }
        }
    },
    { 
        category: "Pizza", 
        price: 10, 
        img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=300",
        translations: {
            en: { name: "Pepperoni Pizza", description: "Spicy pepperoni with melted cheese and tomato sauce" },
            al: { name: "Pica Pepperoni", description: "Pepperoni pikant me djathë të shkrirë dhe salcë domate" },
            it: { name: "Pizza al Pepperoni", description: "Pepperoni piccante con formaggio fuso e salsa di pomodoro" }
        }
    },
    { 
        category: "Pizza", 
        price: 12, 
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300",
        translations: {
            en: { name: "BBQ Chicken Pizza", description: "Grilled chicken, BBQ sauce, red onions, and cilantro" },
            al: { name: "Pica me Pulë BBQ", description: "Pulë e pjekur në skarë, salcë BBQ, qepë të kuqe dhe cilantro" },
            it: { name: "Pizza al Pollo BBQ", description: "Pollo alla griglia, salsa BBQ, cipolle rosse e cilantro" }
        }
    },
    { 
        category: "Fast Food", 
        price: 6, 
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
        translations: {
            en: { name: "Classic Burger", description: "Beef patty, lettuce, tomato, and our special sauce" },
            al: { name: "Burger klasik", description: "Mish viçi, marule, domate dhe salcë speciale" },
            it: { name: "Hamburger Classico", description: "Polpetta di manzo, lattuga, pomodoro e salsa speciale" }
        }
    },
    { 
        category: "Fast Food", 
        price: 7, 
        img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300",
        translations: {
            en: { name: "Cheeseburger", description: "Classic burger with melted cheddar cheese" },
            al: { name: "Çizburger", description: "Burger klasik me djathë cheddar të shkrirë" },
            it: { name: "Cheeseburger", description: "Hamburger classico con formaggio cheddar fuso" }
        }
    },
    { 
        category: "Fast Food", 
        price: 3, 
        img: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=300",
        translations: {
            en: { name: "French Fries", description: "Crispy golden fries with sea salt" },
            al: { name: "Patate të skuqura", description: "Patate të arta krokante me kripë deti" },
            it: { name: "Patatine Fritte", description: "Patatine croccanti dorate con sale marino" }
        }
    },
    { 
        category: "Drinks", 
        price: 2, 
        img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300",
        translations: {
            en: { name: "Coca Cola", description: "Refreshing carbonated soft drink" },
            al: { name: "Coca Cola", description: "Pije freskuese e gazuar" },
            it: { name: "Coca Cola", description: "Bibita gassosa rinfrescante" }
        }
    },
    { 
        category: "Drinks", 
        price: 1.5, 
        img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300",
        translations: {
            en: { name: "Coffee", description: "Freshly brewed aromatic coffee" },
            al: { name: "Kafe", description: "Kafe e sapokrijuar aromatike" },
            it: { name: "Caffè", description: "Caffè aromatico appena preparato" }
        }
    },
    { 
        category: "Desserts", 
        price: 4, 
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300",
        translations: {
            en: { name: "Chocolate Cake", description: "Rich and moist chocolate cake" },
            al: { name: "Tortë me çokollatë", description: "Tortë e pasur dhe e lagësht me çokollatë" },
            it: { name: "Torta al Cioccolato", description: "Torta al cioccolato ricca e umida" }
        }
    },
    { 
        category: "Salads", 
        price: 6, 
        img: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=300",
        translations: {
            en: { name: "Caesar Salad", description: "Romaine lettuce, croutons, parmesan, and Caesar dressing" },
            al: { name: "Sallatë Cezar", description: "Marule romaine, krutona, parmixhan dhe salcë Cezar" },
            it: { name: "Insalata Cesare", description: "Lattuga romana, crostini, parmigiano e salsa Cesare" }
        }
    },
    { 
        category: "Pasta", 
        price: 9, 
        img: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/1c036c65cea784cc9f7720e361500779/Derivates/b29ea27a12e2e20a9c51b3d5670c3f2e13adad54.jpg",
        translations: {
            en: { name: "Carbonara", description: "Creamy pasta with eggs, pecorino cheese, and pancetta" },
            al: { name: "Karbonara", description: "Makaronë kremoze me vezë, djathë pecorino dhe panceta" },
            it: { name: "Carbonara", description: "Pasta cremosa con uova, pecorino e pancetta" }
        }
    }
];

// Search functionality
function filterMenu() {
    const searchTerm = search.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    
    cards.forEach(card => {
        const title = card.querySelector("h3").innerText.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

search.addEventListener("input", filterMenu);

// Get translated text for an item
function getTranslation(item, field) {
    return item.translations[currentLang][field];
}

// Get translated category name
function getTranslatedCategory(categoryKey) {
    if (categoryKey === "All") {
        return translations[currentLang].categoryAll;
    }
    return translations[currentLang].categories[categoryKey] || categoryKey;
}

// Update UI text based on language
function updateUIText() {
    search.placeholder = translations[currentLang].searchPlaceholder;
    
    const headerTitle = document.querySelector(".header h1");
    if (headerTitle) headerTitle.innerText = translations[currentLang].restaurantName;
    
    const poweredByLink = document.querySelector(".powered-by a");
    if (poweredByLink) poweredByLink.innerHTML = translations[currentLang].poweredBy;
    
    // Update category title if it's "All" or a specific category
    if (selectedCategory === "All") {
        categoryTitle.innerText = translations[currentLang].categoryAll;
    } else {
        categoryTitle.innerText = getTranslatedCategory(selectedCategory);
    }
}

// Get unique categories
function getCategories() {
    return ["All", ...new Set(menuItems.map(i => i.category))];
}

function renderCategories() {
    categoriesDiv.innerHTML = "";
    const cats = getCategories();

    cats.forEach(cat => {
        const btn = document.createElement("button");
        // Display translated category name
        btn.innerText = getTranslatedCategory(cat);
        btn.dataset.originalCat = cat;

        // Check if this is the selected category (compare original category names)
        if (cat === selectedCategory) btn.classList.add("active-category");

        btn.onclick = () => {
            // Store the original category name for filtering
            selectedCategory = cat;
            renderCategories();
            renderMenu();
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
            search.value = "";
            filterMenu();
        };

        categoriesDiv.appendChild(btn);
    });
}

function renderMenu() {
    menu.innerHTML = "";
    
    // Update category title with translation
    if (selectedCategory === "All") {
        categoryTitle.innerText = translations[currentLang].categoryAll;
    } else {
        categoryTitle.innerText = getTranslatedCategory(selectedCategory);
    }

    menuItems
        .filter(i => selectedCategory === "All" || i.category === selectedCategory)
        .forEach(item => {
            const card = document.createElement("div");
            card.className = "card";

            const itemName = getTranslation(item, "name");
            const itemDesc = getTranslation(item, "description");

            card.innerHTML = `
                <div class="card-content">
                    <h3>${itemName}</h3>
                    <p>${item.price}€</p>
                </div>
                <img src="${item.img}" alt="${itemName}">
            `;

            card.onclick = (e) => {
                e.stopPropagation();
                modalImg.src = item.img;
                modalImg.alt = itemName;
                modalTitle.innerText = itemName;
                modalPrice.innerText = item.price + "€";
                modalDesc.innerText = itemDesc || translations[currentLang].noDescription;
                modal.classList.add("active");
                document.body.style.overflow = "hidden";
            };

            menu.appendChild(card);
        });
}

// Language buttons initialization
function initLanguageButtons() {
    const langBtns = document.querySelectorAll(".lang-btn");
    
    langBtns.forEach(btn => {
        btn.onclick = () => {
            const newLang = btn.getAttribute("data-lang");
            currentLang = newLang;
            updateUIText();
            renderCategories();
            renderMenu();
            filterMenu();
            
            langBtns.forEach(b => b.classList.remove("active-lang"));
            btn.classList.add("active-lang");
        };
    });
}

// Close modal functions
function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

// Close button
const closeBtn = document.querySelector(".close-btn");
if (closeBtn) {
    closeBtn.onclick = closeModal;
}

// Click outside modal to close
modal.onclick = (e) => {
    if (e.target === modal) {
        closeModal();
    }
};

// Escape key to close modal
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});

// Initialize everything when page loads
window.onload = () => {
    setTimeout(() => {
        loadingScreen.classList.add("hide");
    }, 1000);
    
    updateUIText();
    renderCategories();
    renderMenu();
    initLanguageButtons();
    
    // Set default active language button
    const defaultBtn = document.querySelector('.lang-btn[data-lang="en"]');
    if (defaultBtn) defaultBtn.classList.add("active-lang");
};