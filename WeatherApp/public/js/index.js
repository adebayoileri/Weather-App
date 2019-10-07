
// Declarations
const openModal = document.getElementById('open-modal');
const closeModal = document.getElementById('close');
const modal = document.getElementById('location-modal');
const bgModal = document.getElementById('bg-modal');

// Events
openModal.addEventListener('click',()=>{modal.style.display ="flex"; bgModal.style.display="block";});
closeModal.addEventListener('click',()=>{modal.style.display ="none"});