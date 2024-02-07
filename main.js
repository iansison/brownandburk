'use strict';
const toggle = document.querySelector('.btn-nav');

const btnToggle = document.querySelector('.mobile-nav-toggle');

const nav = document.querySelector('.primary-navigation');

const companyLogo = document.querySelector('.company-logo');

const productsContainer = document.querySelector('.products');

const section = document.querySelector('.container-search-bar');



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
// searchInput.addEventListener('keypress', handleKeyPress);



// Function to display products
function displayProducts(products) {

  productsContainer.innerHTML = '';
  
  // <span class="product-price"><strong>₱ ${product.product_price}</strong></span> 
  // ^ IKAKABIT TO SA html
  products.forEach((product,index) => {
    const html = `
    <!--
      <div class="card card-product">
          <div>
          <h3>${product.product}</h3> </div>
          <h5>${product.generic_name}</h5>
          <img class = "card-product-img"src="img/product-med.jpg" alt="" srcset="" height = "110px">
          <p class="product-information"><b>Qty / Box: </b>${product.product_information}</p>
          <a class = "product-button hidden"href="#"  data-id="${product.id}">More details</a>
      </div>
    -->

      <div class="product-card"><a class="product-card__image" href="" target="_blank"><img src="img/product-med.jpg" alt="Product List Card UI"/></a>
        <div class="product-card__body"><a class="product-card__title" href="">${product.product}</a>
          <div class="product-card__desc">${product.generic_name}</div>
          <div class="product-card__stock">In stock</div>
          <div class="product-card__price price"><span class="price__current">Php ${product.product_price}.00</span><!--<span class="price__old">8054р</span>--></div>
          <div class="product-card__labels">Qty / Box:<span class="label label_hit">${product.product_information}</span></div>
        </div>
        <div class="product-card__btn">
          <button class="btn btn_product" data-id="${product.id} type="button">More details</button>
        </div>
      </div>

    

    `;
    productsContainer.insertAdjacentHTML('beforeend', html);
  });
}

let originalProducts = []; // Store the original unfiltered products
let clickedProduct;

if (window.location.pathname === '/products.html') {
// Fetch products from JSON and display all products initially

// Get the current URL
const currentURL = window.location.href;

// Create a URL object to parse the URL
const url = new URL(currentURL);

// Get the value of the 'productID' parameter from the URL
const searched = url.searchParams.get('search');

  fetch('./product.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      originalProducts = data; // Save the original products
      displayProducts(data); // Display all products initially
      const searchInput = document.getElementById('search');
      
      // Event listener for search input
      searchInput.addEventListener('input', () => {
        
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredProducts = originalProducts.filter(product => {
          return (
            product.product.toLowerCase().includes(searchTerm) ||
            product.generic_name.toLowerCase().includes(searchTerm)
          );
        });
        console.log(filteredProducts)
        displayProducts(filteredProducts); // Display filtered products
      });
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
    });


      
  // productsContainer.addEventListener('mouseover', (e) => {
  //   const activeCard = e.target.closest('.card');
  //   if (!activeCard) return;

  //   const productBtn = activeCard.querySelector('.product-button');
  //   activeCard.classList.add('card-product--active');
    
  //   if (productBtn) {
  //     productBtn.classList.add('d-block');
  //     productBtn.classList.remove('hidden');
  //   }
  // });

  // productsContainer.addEventListener('mouseout', (e) => {
  //   const activeCard = e.target.closest('.card');
  //   if (!activeCard) return;

  //   activeCard.classList.remove('card-product--active');

  //   const productBtn = activeCard.querySelector('.product-button');
  //   if (productBtn) {
  //     productBtn.classList.remove('d-block');
  //     productBtn.classList.add('hidden');
  //   }
  // });



  // const productsContainer = document.querySelector('.container-products');

  productsContainer.addEventListener('click',(e) => {

    e.preventDefault();
    // window.scrollTo({top: 0,
    //   left:0,
    //   behavior: 'smooth'
    // })
    const btn = e.target.closest('.btn_product');
    clickedProduct = e.target.dataset.id;
    console.log(clickedProduct)
    if(!btn) return;
    document.querySelector('.overlay').classList.remove('hidden')
    // displayProductsInformation('test')
    setTimeout(() => {
      document.querySelector('.overlay').classList.add('hidden')
      // window.location.href = 'product-info.html'
      // When navigating to another page
      window.location.href = `product-info.html?productID=${clickedProduct}`;

  
  
    },3000)
  
  
      // .catch(error => {
      //   console.error('There was a problem fetching the data:', error);
      // });
  
  
    
  })
  


}




// if (window.location.pathname === '/product-info.html') {
//   // Get the URL parameters
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);

//   // Get the value of 'productID' from the URL
//   const productID = urlParams.get('productID');
//   //console.log(productID); // This will log the value of 'productID'
//   searchInput.addEventListener('keydown', (e) => {
//     if(e.keycode === 13) {
//       window.location.href = '/products.html';
//     }
//   })
// }


// function displayProductsInformation(productsInformation) {
//   const main = document.querySelector('main.products');

//   // Remove the main element
//   main.remove();


//   const html = `
  
//   <main class="accordionProducts d-block" id="accordionProducts">
//   <h1 class="products-title">Product Name</h1>

//   <div class="product-item"><a href="products.html">Products</a> &rarr; </div>

//   <div class="accordionProducts__container flex">

//    <div class="accordionProducts__imageContainer">
//       <img loading="lazy" src="img/product-med.jpg" class="d-block accordionProducts__image accordionProducts__image--1 open" alt="" height="250px">
//    </div>

//    <div class="accordionProducts__btn-container flex">
//       <button class="accordionProducts__button accordionProducts__button--1" data-btn="1" aria-expanded="true" aria-disabled="true">

//          <h3 class="accordionProducts__heading">
//             Who this medicine's for?
//          </h3>
//       </button>
//       <button class="accordionProducts__button accordionProducts__button--2" data-btn="2" aria-expanded="false">

//          <h3 class="accordionProducts__heading">
//             What it's composed of?
//          </h3>
//       </button>
//       <button class="accordionProducts__button accordionProducts__button--3" data-btn="3" aria-expanded="false">

//          <h3 class="accordionProducts__heading">
//             Product Inserts
//          </h3>
//       </button>
//    </div>



//    <div class="accordionProducts__contentContainer">
//       <div class="accordionProducts__content accordionProducts__content--1 hidden">
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut minima at cum exercitationem harum sint modi dolor maxime autem earum unde, nemo sit laborum totam.</p>
//       </div>    
//       <div class="accordionProducts__content accordionProducts__content--2 hidden">
//             <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet soluta error reiciendis eligendi aut, dolorem laborum alias quo modi temporibus eos placeat cum rem velit?</p>
//       </div>    
//       <div class="accordionProducts__content accordionProducts__content--3 hidden">
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius cum eaque id atque in repudiandae aliquam exercitationem blanditiis. Quo deleniti, voluptate officia animi ea commodi.</p>
//       </div>                     
//    </div>
// </div>
// </main>  
  
//   `

//   section.insertAdjacentHTML('afterend', html);

// }









if (window.location.pathname === '/careers.html') {
  const traits = document.querySelector('#traits');
  const allAnswers = document.querySelectorAll('.traits-ans');
  allAnswers.forEach(el => el.style.display = 'none')
  
  traits.addEventListener('click', (e) => {
    if(e.target.classList.contains('traits-btn')) {
      const traitBtn = e.target;
      if(!traitBtn) return;
      document.querySelector(`.traits-ans--${traitBtn.dataset.trait}`).classList.toggle('d-block');
  
    }
  })
  
}


// setTimeout(() => {



// if (window.location.pathname === '/product-info.html') {

//   const accordionProductButtons = document.querySelectorAll('.accordionProducts__button');
//   const accordionProductContents = document.querySelectorAll('.accordionProducts__content');
//   const accordionContainer = document.querySelector('.accordionProducts__btn-container');
//   const mainProduct = document.getElementById('accordionProducts');
    
  
  
//   accordionContainer.addEventListener('click', (e) => {
//     const clicked = e.target.closest('.accordionProducts__button');
//     mainProduct.scrollIntoView({behavior: 'smooth'})
//     if(!clicked) return;
  
    
  
//     accordionProductButtons.forEach(el => {
//       el.classList.remove('accordionButton--active')
//     })
//     clicked.classList.add('accordionButton--active')
//     accordionProductContents.forEach(el => el.classList.add('hidden'))
//     document.querySelector(`.accordionProducts__content--${clicked.dataset.btn}`).classList.remove('hidden')
  
//   })

// }
  



if (window.location.pathname === '/contactus.html') {
  // Get the URL parameters
  const location = [14.55477100, 121.01779160]
  const map = L.map('map').setView(location, 18);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);


  
  L.marker(location).addTo(map)
      .bindPopup(`We are located here <br> <strong>@120 Rada St</strong>.`)
      .openPopup();

}