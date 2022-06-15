form = document.querySelector('.form')

form.addEventListener('submit', (e) => {
  e.preventDefault();

  setAction();
});


function setAction() {


  var webLink = document.getElementById('web-link').value;
  var mobileLink = document.getElementById('mobile-link').value;


  if (webLink === '') {
    setErrorFor(form.elements['web-link'], 'le champ desktop tracké vide !')
  } else {
    setSuccessFor(form.elements['web-link'])
  }

  if (mobileLink === '') {
    setErrorFor(form.elements['mobile-link'], 'le champ mobile tracké vide !')
  } else {
    setSuccessFor(form.elements['mobile-link'])
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement; // .form-control
    const small = formControl.querySelector('small');

    // add error message inside small
    small.textContent = message;

    // add error class
    formControl.classList.add('error')
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement; // .form-control

    // add succes class
    formControl.classList.remove('error')
    formControl.classList.add('success')
  }


  if (webLink !== '' & mobileLink !== '') {

    var videoName = webLink.split('/');
    console.log(videoName[5]);
    let generatedMobileLink = 'https://particuliers.societegenerale.fr/applimobile/services-en-ligne/' + videoName[5];
    console.log(generatedMobileLink);
    let splitedMobileLink = mobileLink.split('applimobile');
    let base64encoder = '{"DEB_typeRequest":"GET","DEB_back":"appelant","DEB_url":' + '"' + splitedMobileLink[1] + '"' + ',"DEB_idview":"999"}';
    let encodedbase64 = btoa(base64encoder);
    let finalEncodedBase64 = encodedbase64.replace(/=/g, '') + "%3D";
    let firstPart = 'https://link-particuliers.par.societegenerale.fr/?link=https://',
      appliPart = '&apn=mobi.societegenerale.mobile.lappli&isi=376991016&ibi=mobi.societegenerale.mobile.lappli&ofl=',
      appVersion = '&amv=510000&imv=510000';

    let universalLink = firstPart + finalEncodedBase64 + appliPart + webLink + appVersion;
    let result = document.getElementById("result");
    result.textContent = universalLink;


    return false
  }

};

function copyClipboard() {
  var copyText = document.getElementById("result");
  let copyMessage = document.getElementById('copied');
  navigator.clipboard.writeText(copyText.textContent);
  copyMessage.style.visibility = "visible";
  setTimeout(function () {
    copyMessage.style.visibility = "hidden"
  }, 500);
  return false;
}