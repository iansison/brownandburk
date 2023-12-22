// Get the current URL
const currentURL = window.location.href;

// Create a URL object to parse the URL
const url = new URL(currentURL);

// Get the value of the 'productID' parameter from the URL
const productID = url.searchParams.get('productID');

console.log(productID); // Output: 3


const productName = document.querySelector('.product-name')
// const 

fetch('product.json')
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
        data.forEach(element => {
            if(element.id === +productID) {
                productName.style.fontSize = '2rem';
                productName.innerHTML=`<b>${element.product}</b>`
            }
        });
    })