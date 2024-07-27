// script.js
document.addEventListener("DOMContentLoaded", () => {
    const productsBlock = document.getElementById('products__block');
    const showMoreButton = document.getElementById('showMore');
    let products = [];
    let displayedProducts = 0;

    const fetchProducts = () => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                products = data;
                displayProducts();
            });
    };

    const displayProducts = () => {
        const productsToShow = products.slice(displayedProducts, displayedProducts + 8);
        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'products__card';
            productCard.innerHTML = `
                <div class="card__img">
                    <button class="product__like"><i class="fa-regular fa-heart"></i></button>
                    <button class="product__eye"><i class="fa-solid fa-eye"></i></button>
                    <button class="product__add">Add To Cart</button>
                    <img src="${product.image}" alt="${product.title}" />
                </div>
                <div class="card__text">
                    <div class="card__content">
                        <p class="card__name">${product.title}</p>
                    </div>
                    <div class="card__price">
                        <p class="card__prices">$${product.price}</p>
                        <div class="card__stars">${'★'.repeat(Math.round(product.rating.rate))}</div>
                    </div>
                </div>
            `;
            productsBlock.appendChild(productCard);
        });
        displayedProducts += 8;
        if (displayedProducts >= products.length) {
            showMoreButton.style.display = 'none';
        }
    };

    showMoreButton.addEventListener('click', displayProducts);

    fetchProducts();
});