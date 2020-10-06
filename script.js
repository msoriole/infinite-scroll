const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoaded = false;

// Unsplash API
const apiKey = "oUuFPwAI2LiJUTFjEaJOT6sBdd6SqzrOqzYC8-7V5aA";
const countInitial = 5;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${countInitial}`; 
const picCount = 30;

// Update apiUrl with new count
function updateAPIUrl(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;

}

// Check if all images were loaded
function imageLoaded() {
    console.log("image loaded");
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to Set attributes on DOM Element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;
    console.log("total images: ", totalImages);
    // Run function for each object in photoArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });

        // Create <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished loading
        img.addEventListener("load", imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (!isInitialLoaded) {
            updateAPIUrl(picCount);
        }
        isInitialLoaded = true;
       //console.log(photosArray); 
    } catch (error) {
       // Catch ERROR here 

    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        // console.log("window.innerHeight:",window.innerHeight);
        // console.log("windown.scrollY:", window.scrollY);
        // console.log("window.innerHeight + scrollY:", window.scrollY + window.innerHeight);
        // console.log("document.offsetHeight - 1000:", document.body.offsetHeight - 1000);
        ready = false;
        getPhotos();
    }
})


// On Load
getPhotos();