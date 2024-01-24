// Wrap your code in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function () {
    // Get the current URL
    const currentURL = window.location.href;

    // Create a URL object to parse the URL
    const url = new URL(currentURL);

    // Get the value of the 'productID' parameter from the URL
    const productIDParam = url.searchParams.get('productID');

    // Ensure that productIDParam is a valid number
    const productID = parseInt(productIDParam, 10);
    const productName = document.querySelector('.product-title');
    const productGenericName = document.querySelector('.product-link');
    const productPrice = document.querySelector('.product-price h2');
    const productByQuantity = document.querySelector('.product-quantity p span');

    console.log(productID); // Output: 3 (or the correct productID)

    const imgs = document.querySelectorAll('.img-select a');
    const imgBtns = [...imgs];
    let imgId = 1;
    console.log('working')
    imgBtns.forEach((imgItem) => {
        imgItem.addEventListener('click', (event) => {
            event.preventDefault();
            imgId = imgItem.dataset.id;
            slideImage();
        });
    });
    
    
    function slideImage(){
        const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
    
        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }
    
    window.addEventListener('resize', slideImage);

    const randomNum = (min,max) => Math.floor(min + Math.random()*50) ;
    console.log(randomNum(2,5))
    
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
                // productName.style.fontSize = '2rem';
                document.querySelector('.product-rating span').textContent = `5(${(Math.random()*500+1).toFixed(0)})`
                productName.innerHTML = `<b>${foundProduct.product}</b>`;
                productGenericName.textContent = `${foundProduct.generic_name}`;
                productGenericName.textContent = `${foundProduct.generic_name}`;
                productPrice.textContent = `Php ${foundProduct.product_price}.00`
                productByQuantity.textContent = `${foundProduct.product_information}`
            } else {
                console.error(`Product with ID ${productID} not found`);
                // Handle this case (e.g., display an error message or redirect)
            }
        });



























});
