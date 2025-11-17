let index = 0;
const images = document.querySelectorAll(".left img");
const texts = document.querySelectorAll(".right p");
function showSlide(n){
  images.forEach(img => img.classList.remove("active"));
texts.forEach(txt => txt.classList.remove("active"));
images[n].classList.add("active");
texts[n].classList.add("active");
}
setInterval(()=> {
 index = (index + 1) % images.length;
 showSlide(index);
},3000);
//Menu Toggle
const bars = document.querySelector("header .fa-bars");
const nav = document.getElementById("mainNav");
const overlayMenu = document.getElementById("menuOverlay");
bars.addEventListener('click', () =>{
  nav.classList.add("active");
  overlayMenu.classList.add("active");
});
overlayMenu.addEventListener('click',() => {
    nav.classList.remove("active");
overlayMenu.classList.remove("active");
});

// ===== Contact Form Validation =====
const contactForm = document.getElementById("contactForm");
if(contactForm){
    contactForm.addEventListener("submit", function(e){
        const name = this.name.value.trim();
        const email = this.email.value.trim();
        const message = this.message.value.trim();

        if(!name || !email || !message){
            alert("Please fill all fields.");
            e.preventDefault();
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(email)){
            alert("Please enter a valid email address.");
            e.preventDefault();
            return;
        }

        if(message.length < 10){
            alert("Message is too short. Please write a detailed message.");
            e.preventDefault();
            return;
        }

        alert("Form is valid! Later it can be sent via PHP.");
    });
}
