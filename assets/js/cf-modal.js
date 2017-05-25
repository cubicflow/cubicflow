if (!window.cf){
   window.cf = {};
}

cf.modalGallery = function(selector){

  var opts = {
    smallBrowserWidth: 600,
    mediumBrowserWidth: 1025,
    largeBrowserWidth: 1280
  };


  var currentIndex = 0,
      modalWindow,
      modalImg,
      thumbnails;

  modalWindow = document.querySelector('#cf-gallery-modal');
  if (!modalWindow) console.log('Modal window not found. Page must contain #cf-gallery-modal');

  modalImg = modalWindow.querySelector('#cf-gallery-modal-img');
  if (!modalImg) console.log('Modal window template doesnt contain modalImg');

  thumbnails = document.querySelectorAll(selector);



  var init = function(){

      modalWindow.addEventListener('click', function(){
          closeModal();
      });


      // Add event listener to thumbnails
      for (var i = 0; i < thumbnails.length; i++){

          thumbnails[i].addEventListener('click', function(event){
              handleClick(this);
          });

      }

  };

  var nextImg = function(){
      console.log('next' + i);
  };

  var handleClick = function(thumbnail){

    var fullsize,
        re,
        filename,
        ext,
        parentDir,
        newSrc;


    fullsize = thumbnail.getAttribute('data-fullsize');
    if (!fullsize) return console.log('No data-fullsize attr');

    if(!cf.isMobile(opts) && cf.isRetina(opts)){
        re = /([\w\d_-]*)\.?[^\\\/]*$/i;
        filename = fullsize.match(re)[1];
        ext = fullsize.split('.').pop();
        parentDir = fullsize.substr(0, fullsize.lastIndexOf('/'));
        newSrc = parentDir + '/' + filename + '@2x.' + ext;
    } else {
        newSrc = fullsize;
    }

    modalImg.style.opacity = 0;
    modalImg.src = '';
    modalImg.src = newSrc;

    openModal();

    modalImg.onload = function(){
        modalImg.style.opacity = 1;
    };

  };

  var closeModal = function(){
      modalWindow.className = 'modal';
      modalImg.style.opacity = 0;
  };

  var openModal = function(){
      modalWindow.className = 'modal active';
  };

  init();

};
