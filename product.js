// Get the current URL
const currentURL = window.location.href;

// Create a URL object to parse the URL
const url = new URL(currentURL);

// Get the value of the 'productID' parameter from the URL
const productIDParam = url.searchParams.get('productID');

// Ensure that productIDParam is a valid number
const productID = parseInt(productIDParam, 10);

console.log(productID); // Output: 3 (or the correct productID)


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
    const foundProduct = data.find(({ id }) => id === +productID);

    if (foundProduct) {
        productName.style.fontSize = '2rem';
        productName.innerHTML = `<b>${foundProduct.product}</b>`;
    } else {
        console.error(`Product with ID ${productID} not found`);
        // Handle this case (e.g., display an error message or redirect)
    }
}); 