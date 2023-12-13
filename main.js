const toggle = document.querySelector('.btn-nav');

const btnToggle = document.querySelector('.mobile-nav-toggle');

const nav = document.querySelector('.primary-navigation');

const companyLogo = document.querySelector('.company-logo');

const productsContainer = document.querySelector('.container-products');

// const search = document.querySelector('.')

console.log(`JS started`)




function addClassOnResize() {
    const minWidth = 1120;
  
    function handleResize() {
      if (window.innerWidth <= minWidth) {
        nav.classList.add('hidden');
      } else {
        nav.classList.remove('hidden');
      }
    }
  
    // Initial check when the page loads
    handleResize();
  
    // Listen for window resize events
    window.addEventListener('resize', handleResize);
  }
  
  // Call the function
  addClassOnResize();



let toggleValue = 0;

toggle.addEventListener('click',(e) => {
    if(e.target.classList.contains('mobile-nav-toggle')) {
        if(!toggleValue) {
            nav.classList.remove('hidden');
            btnToggle.style.background = `url('img/close.png')`
            btnToggle.style.width = "2rem";
            btnToggle.style.aspectRatio = "1";
            btnToggle.style.backgroundRepeat = "no-repeat";
            toggleValue = 1;
        } else {
            nav.classList.add('hidden');
            btnToggle.style.background = `url('img/hamburger-menu.png')`
            toggleValue = 0;            
        }
    }
    return;
})


companyLogo.addEventListener('click', (e) => {
    // console.log(e.target.closest('.bb-logo'));
    const logo = e.target.closest('.bb-logo');
    if(!logo) return;
    window.location.href = 'index.html'
    // if(!e.target.closest('.bb-logo')) return;
})






nav.addEventListener('click', (e) => {
    console.log(`I'm still working`)
    const active = e.target.closest('.nav-link')
    if(!active) return;
    console.log(active)
    const links = document.querySelectorAll('.nav-link');
    links.forEach(el => {
        el.classList.remove('active')
    })
    active.classList.add('active');
    setTimeout( () => {
      if(active.dataset.link === 'Microlabs') window.location.href = `https://www.microlabsltd.com/`;
      else window.location.href = `${active.dataset.link}.html`
    },500)
})


// Get the input element
const searchInput = document.getElementById('search');

// Function to handle keypress event
function handleKeyPress(event) {
    // Check if the Enter key (key code 13) was pressed
    if (event.key === 'Enter') {
        // Replace 'https://example.com' with the desired website URL
        window.location.href = 'products.html';
    }
}

// Add event listener to the input field
searchInput.addEventListener('keypress', handleKeyPress);


// Function to display products
function displayProducts(products) {

  productsContainer.innerHTML = '';
  
  products.forEach(product => {
    const html = `
      <div class="card card-product">
          <div>
          <h3>${product.product}</h3> </div>
          <h5>${product.generic_name}</h5>
          <img class = "card-product-img"src="img/product-med.jpg" alt="" srcset="" height = "110px">
          <p class="product-information"><b>Qty / Box: </b>${product.product_information}</p>
          <span class="product-price"><strong>₱ ${product.product_price}</strong></span>
          <a class = "product-button hidden"href="#">More details</a>
      </div>
    `;
    productsContainer.insertAdjacentHTML('beforeend', html);
  });
}

if (window.location.pathname === '/products.html') {
// Fetch products from JSON and display all products initially
  fetch('product.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayProducts(data); // Display all products initially
      const searchInput = document.getElementById('search');
      
      // Event listener for search input
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredProducts = data.filter(product => {
          return product.product.toLowerCase().includes(searchTerm) ||
          product.generic_name.toLowerCase().includes(searchTerm);
        });
        displayProducts(filteredProducts); // Display filtered products
      });
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
    });



}

// document.querySelector('#contact-form').addEventListener('submit', (e) => {
//   e.preventDefault();
//   e.target.elements.name.value = '';
//   e.target.elements.email.value = '';
//   e.target.elements.message.value = '';
// });


productsContainer.addEventListener('mouseover', (e) => {
  const activeCard = e.target.closest('.card');
  if (!activeCard) return;

  const productBtn = activeCard.querySelector('.product-button');
  activeCard.classList.add('card-product--active');
  
  if (productBtn) {
    productBtn.classList.add('d-block');
    productBtn.classList.remove('hidden');
  }
});

productsContainer.addEventListener('mouseout', (e) => {
  const activeCard = e.target.closest('.card');
  if (!activeCard) return;

  activeCard.classList.remove('card-product--active');

  const productBtn = activeCard.querySelector('.product-button');
  if (productBtn) {
    productBtn.classList.remove('d-block');
    productBtn.classList.add('hidden');
  }
});


// const productDetails = document.querySelector('.')


// toggle.addEventListener('click',(e) => {
//     if(e.target.classList.contains('mobile-nav-toggle')) {
//         nav.classList.add('hidden');
//     }
// })


// toggle.addEventListener('click',(e) => {
//     if(e.target.classList.contains('mobile-nav-toggle')) {
//         nav.classList.remove('hidden');
//         btnToggle.style.background = `url('resources/close-btn.png')`
//     }
// })