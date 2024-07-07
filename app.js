// Auswahl der Elemente aus dem DOM
const characterAmountRange = document.getElementById('characterAmountRange');
const characterAmountNumber = document.getElementById('characterAmountNumber');
const passwordDisplay = document.getElementById('passwordDisplay');
const enablePasswordCheckbox = document.getElementById('enablePasswordCheckbox');
const enablePhraseCheckbox = document.getElementById('enablePhraseCheckbox');
const generateBtn = document.getElementById('generateBtn');
const passwordAmountRange = document.getElementById('passwordAmountRange');
const passwordAmountNumber = document.getElementById('passwordAmountNumber');
// Auswahlelemente der include-Elemente
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeSymbolsElement = document.getElementById('includeSymbols');
const includeLowercaseElement = document.getElementById('includeLowercase');
// Auswahlelemente der exclude-Elemente
const excludeUppercaseElement = document.getElementById('excludeUppercase');
const excludeLowercaseElement = document.getElementById('excludeLowercase');
const excludeNumbersElement = document.getElementById('excludeNumbers');
const excludeSymbolsElement = document.getElementById('excludeSymbols');
// Auswahl der Mindestanzahlelemente aus dem DOM
const minLowercase = document.getElementById('minLowercase');
const minUppercase = document.getElementById('minUppercase');
const minNumbers = document.getElementById('minNumbers');
const minSymbols = document.getElementById('minSymbols');
// const für das Hauptkopier-Symbol
const maincopyBtn = document.getElementById('copyBtn');
// Elemente für die verschiedenen Passworttypen aus dem Dokument auswählen
const passwordTypeRadios = document.querySelectorAll('input[name="passwordType"]');
const characterTypeAccordion = document.getElementById('panelsStayOpen-collapseTwo_test');
const minimumCountAccordion = document.getElementById('panelsStayOpen-collapseThree_test');
const passwordPhraseAccordion = document.getElementById('panelsStayOpen-collapseFour_test');
// Definieren der Charaktercodes für verschiedene Typen
const uppercaseCharCodes = arrayFromLowToHigh(65, 90);
const lowercaseCharCodes = arrayFromLowToHigh(97, 122);
const numberCharCodes = arrayFromLowToHigh(48, 57);
const symbolCharCodes = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));
// Sammle alle Elemente mit der Klasse 'btnSetRequirement' in ein Array.
const elemntsBtnRequirement = document.getElementsByClassName("btnSetRequirement");

// Alle Funktionen
// Funktion, um einen Event-Listener zu einem Button hinzuzufügen, der den Text aus einem bestimmten Textfeld kopiert.
function addCopyListener(buttonId, textfieldId) {
   // Findet den Button basierend auf seiner ID.
   let button = document.getElementById(buttonId);
   if (button) {
       // Fügt einen 'click' Event-Listener zum Button hinzu.
       button.addEventListener('click', function() {
           // Findet das Textfeld, dessen Inhalt kopiert werden soll, basierend auf seiner ID.
           let copyText = document.getElementById(textfieldId);

           // Wählt den Text im Textfeld aus.
           copyText.select();

           // Führt den Kopiervorgang aus.
           document.execCommand('copy');
       }); // click
   }; // if
}; // function

// Array der Button-IDs und der zugehörigen Textfeld-IDs.
var copyButtons = [
   ['copyHashOutput', 'hashOutput'],
   ['copyMd5', 'md5'],
   ['copySha1', 'sha1'],
   ['copySha2', 'sha2'],
   ['copySha3', 'sha3']
]; // Object-CopyButtons
 
 // Geht über das Array und fügt jedem Button einen Event-Listener hinzu.
 copyButtons.forEach(function(pair) {
     addCopyListener(pair[0], pair[1]);
 }); // function
 
// Funktion zum Aktualisieren des hashOutput
 function updateHashOutput() {
     let salt1 = document.getElementById('saltInput1').value;
     let salt2 = document.getElementById('saltInput2').value;
     let password = document.getElementById('passwordDisplay').value;
     let saltedPassword = password;
 
     // Überprüfen, ob die Checkboxen aktiviert sind
     let addSalt1 = document.getElementById('saltCheck1').checked;
     let addSalt2 = document.getElementById('saltCheck2').checked;
 
     // Salts vor und hinter das Passwort setzen, wenn die Checkboxen aktiviert sind
     if (addSalt1) {
         saltedPassword = salt1 + saltedPassword;
     }; // if
 
     if (addSalt2) {
         saltedPassword = saltedPassword + salt2;
     }; // if
 
     // Setzt das Salt1 oder Salt2 in das hashOutput Feld
     document.getElementById('hashOutput').value = saltedPassword;
 
     // Update der Hashes
     updateMD5(saltedPassword);
     updateSHA1(saltedPassword);
     updateSHA256(saltedPassword);
     updateSHA3(saltedPassword);
 }; // function
 
 // Event-Listener für Salt-Textfelder (wenn sich der Inhalt ändert)
 document.getElementById('saltInput1').addEventListener('input', updateHashOutput);
 document.getElementById('saltInput2').addEventListener('input', updateHashOutput);
 
 // Event-Listener für Checkboxen (wenn sich der Status ändert)
 document.getElementById('saltCheck1').addEventListener('change', updateHashOutput);
 document.getElementById('saltCheck2').addEventListener('change', updateHashOutput);
 
 // Event-Listener für das Textfeld (wenn sich der Inhalt ändert)
 document.getElementById('passwordDisplay').addEventListener('input', updateHashOutput);

// Function to update the MD5 field
function updateMD5() {
    let hashOutputValue = document.getElementById('hashOutput').value;
    let md5Value = MD5(hashOutputValue);
    document.getElementById('md5').value = md5Value;
}; // function

function updateSHA1() {
    let input = document.getElementById('hashOutput').value;
    let hash = CryptoJS.SHA1(input);
    document.getElementById('sha1').value = hash.toString(CryptoJS.enc.Hex);
}; // function

function updateSHA256() {
    let input = document.getElementById('hashOutput').value;
    let hash = CryptoJS.SHA256(input);
    document.getElementById('sha2').value = hash.toString(CryptoJS.enc.Hex);
}; // function

function updateSHA3() {
    let input = document.getElementById('hashOutput').value;
    let hash = CryptoJS.SHA3(input);
    document.getElementById('sha3').value = hash.toString(CryptoJS.enc.Hex);
}; // function

// Function to copy password to hashOutput and update MD5
function copyPasswordToHash() {
    let password = document.getElementById('passwordDisplay').value;
    document.getElementById('hashOutput').value = password;
    updateMD5(); 
    updateSHA1();
    updateSHA256();
    updateSHA3();
}; // function

document.getElementById('hashOutput').addEventListener('input', function() {
    updateMD5();
    updateSHA1();
    updateSHA256();
    updateSHA3();
}); // function

// MD5 Funktion
MD5 = function(e) {
    function h(a, b) {
        var c, d, e, f, g;
        e = a & 2147483648;
        f = b & 2147483648;
        c = a & 1073741824;
        d = b & 1073741824;
        g = (a & 1073741823) + (b & 1073741823);
        return c & d ? g ^ 2147483648 ^ e ^ f : c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f : g ^ 1073741824 ^ e ^ f : g ^ e ^ f
    }

    function k(a, b, c, d, e, f, g) {
        a = h(a, h(h(b & c | ~b & d, e), g));
        return h(a << f | a >>> 32 - f, b)
    }

    function l(a, b, c, d, e, f, g) {
        a = h(a, h(h(b & d | c & ~d, e), g));
        return h(a << f | a >>> 32 - f, b)
    }

    function m(a, b, d, c, e, f, g) {
        a = h(a, h(h(b ^ d ^ c, e), g));
        return h(a << f | a >>> 32 - f, b)
    }

    function n(a, b, d, c, e, f, g) {
        a = h(a, h(h(d ^ (b | ~c), e), g));
        return h(a << f | a >>> 32 - f, b)
    }

    function p(a) {
        var b = "",
            d = "",
            c;
        for (c = 0; 3 >= c; c++) d = a >>> 8 * c & 255, d = "0" + d.toString(16), b += d.substr(d.length - 2, 2);
        return b
    }
    var f = [],
        q, r, s, t, a, b, c, d;
    e = function(a) {
        a = a.replace(/\r\n/g, "\n");
        for (var b = "", d = 0; d < a.length; d++) {
            var c = a.charCodeAt(d);
            128 > c ? b += String.fromCharCode(c) : (127 < c && 2048 > c ? b += String.fromCharCode(c >> 6 | 192) : (b += String.fromCharCode(c >> 12 | 224), b += String.fromCharCode(c >> 6 & 63 | 128)), b += String.fromCharCode(c & 63 | 128))
        }
        return b
    }(e);
    f = function(b) {
        var a, c = b.length;
        a = c + 8;
        for (var d = 16 * ((a - a % 64) / 64 + 1), e = Array(d - 1), f = 0, g = 0; g < c;) a = (g - g % 4) / 4, f = g % 4 * 8, e[a] |= b.charCodeAt(g) << f, g++;
        a = (g - g % 4) / 4;
        e[a] |= 128 << g % 4 * 8;
        e[d - 2] = c << 3;
        e[d - 1] = c >>> 29;
        return e
    }(e);
    a = 1732584193;
    b = 4023233417;
    c = 2562383102;
    d = 271733878;
    for (e = 0; e < f.length; e += 16) q = a, r = b, s = c, t = d, a = k(a, b, c, d, f[e + 0], 7, 3614090360), d = k(d, a, b, c, f[e + 1], 12, 3905402710), c = k(c, d, a, b, f[e + 2], 17, 606105819), b = k(b, c, d, a, f[e + 3], 22, 3250441966), a = k(a, b, c, d, f[e + 4], 7, 4118548399), d = k(d, a, b, c, f[e + 5], 12, 1200080426), c = k(c, d, a, b, f[e + 6], 17, 2821735955), b = k(b, c, d, a, f[e + 7], 22, 4249261313), a = k(a, b, c, d, f[e + 8], 7, 1770035416), d = k(d, a, b, c, f[e + 9], 12, 2336552879), c = k(c, d, a, b, f[e + 10], 17, 4294925233), b = k(b, c, d, a, f[e + 11], 22, 2304563134), a = k(a, b, c, d, f[e + 12], 7, 1804603682), d = k(d, a, b, c, f[e + 13], 12, 4254626195), c = k(c, d, a, b, f[e + 14], 17, 2792965006), b = k(b, c, d, a, f[e + 15], 22, 1236535329), a = l(a, b, c, d, f[e + 1], 5, 4129170786), d = l(d, a, b, c, f[e + 6], 9, 3225465664), c = l(c, d, a, b, f[e + 11], 14, 643717713), b = l(b, c, d, a, f[e + 0], 20, 3921069994), a = l(a, b, c, d, f[e + 5], 5, 3593408605), d = l(d, a, b, c, f[e + 10], 9, 38016083), c = l(c, d, a, b, f[e + 15], 14, 3634488961), b = l(b, c, d, a, f[e + 4], 20, 3889429448), a = l(a, b, c, d, f[e + 9], 5, 568446438), d = l(d, a, b, c, f[e + 14], 9, 3275163606), c = l(c, d, a, b, f[e + 3], 14, 4107603335), b = l(b, c, d, a, f[e + 8], 20, 1163531501), a = l(a, b, c, d, f[e + 13], 5, 2850285829), d = l(d, a, b, c, f[e + 2], 9, 4243563512), c = l(c, d, a, b, f[e + 7], 14, 1735328473), b = l(b, c, d, a, f[e + 12], 20, 2368359562), a = m(a, b, c, d, f[e + 5], 4, 4294588738), d = m(d, a, b, c, f[e + 8], 11, 2272392833), c = m(c, d, a, b, f[e + 11], 16, 1839030562), b = m(b, c, d, a, f[e + 14], 23, 4259657740), a = m(a, b, c, d, f[e + 1], 4, 2763975236), d = m(d, a, b, c, f[e + 4], 11, 1272893353), c = m(c, d, a, b, f[e + 7], 16, 4139469664), b = m(b, c, d, a, f[e + 10], 23, 3200236656), a = m(a, b, c, d, f[e + 13], 4, 681279174), d = m(d, a, b, c, f[e + 0], 11, 3936430074), c = m(c, d, a, b, f[e + 3], 16, 3572445317), b = m(b, c, d, a, f[e + 6], 23, 76029189), a = m(a, b, c, d, f[e + 9], 4, 3654602809), d = m(d, a, b, c, f[e + 12], 11, 3873151461), c = m(c, d, a, b, f[e + 15], 16, 530742520), b = m(b, c, d, a, f[e + 2], 23, 3299628645), a = n(a, b, c, d, f[e + 0], 6, 4096336452), d = n(d, a, b, c, f[e + 7], 10, 1126891415), c = n(c, d, a, b, f[e + 14], 15, 2878612391), b = n(b, c, d, a, f[e + 5], 21, 4237533241), a = n(a, b, c, d, f[e + 12], 6, 1700485571), d = n(d, a, b, c, f[e + 3], 10, 2399980690), c = n(c, d, a, b, f[e + 10], 15, 4293915773), b = n(b, c, d, a, f[e + 1], 21, 2240044497), a = n(a, b, c, d, f[e + 8], 6, 1873313359), d = n(d, a, b, c, f[e + 15], 10, 4264355552), c = n(c, d, a, b, f[e + 6], 15, 2734768916), b = n(b, c, d, a, f[e + 13], 21, 1309151649), a = n(a, b, c, d, f[e + 4], 6, 4149444226), d = n(d, a, b, c, f[e + 11], 10, 3174756917), c = n(c, d, a, b, f[e + 2], 15, 718787259), b = n(b, c, d, a, f[e + 9], 21, 3951481745), a = h(a, q), b = h(b, r), c = h(c, s), d = h(d, t);
    return (p(a) + p(b) + p(c) + p(d)).toLowerCase()
};

// Funktion zum Wechseln der Sprache
var currentLang = 'de'; // Setzt die anfängliche Sprache auf Deutsch

function switchLang(lang) {
    console.log('Beginne Sprachwechsel zu:', lang); // Loggt den Start des Sprachwechsels

    // Lädt die Sprachdatei
    fetch('language.json')
        .then(function(response) { return response.json(); }) // Konvertiert die Antwort in ein JSON-Objekt
        .then(function(data) {
            console.log('Geladene Sprachdaten:', data); // Loggt die geladenen Sprachdaten

            // Durchläuft alle Elemente mit einer ID
            Array.prototype.forEach.call(document.querySelectorAll('[id]'), function(element) {
                var key = element.getAttribute('id'); // Holt den Schlüsselwert des Elements
                
                // Überprüft, ob ein entsprechender Text für den Schlüssel in der gewählten Sprache existiert
                if (data[lang][key]) {
                    // Unterscheidet zwischen normalen Textinhalten und HTML-formatierten Inhalten
                    if (key === "langGuidanceText") {
                        element.innerHTML = data[lang][key]; // Für HTML-Inhalte
                    } // if
                    else {
                        element.innerHTML = data[lang][key]; // Für normale Textinhalte
                    }; // else                  
                }; // if

            }); // forEach

            currentLang = lang; // Aktualisiert die aktuelle Sprache
        }) // then
        .catch(function(error) { console.error('Fehler beim Laden der Sprachdatei:', error); }); // Fängt Fehler beim Laden der Sprachdatei ab
}; // function

// Funktion zum Laden der Markenanforderungen aus der config.json
function loadBrandRequirements() {
  
    // Ruft die config.json-Datei ab
    fetch('config.json')
        .then(response => {
            // Wirft einen Fehler, wenn die Antwort nicht okay ist
            if (!response.ok) {
                throw new Error('Fehler beim Laden der JSON-Datei');
            }; // if

            // Konvertiert die Antwort in JSON
            return response.json();
        }) // then
        .then(data => {

            // Ruft die Funktion auf, um Brand Buttons zu erstellen
            createBrandButtons(data.brandRequirements);
        }) // then
        .catch(error => {
            // Protokolliert Fehler, die während des Abrufens auftreten
            console.error('Fehler aufgetreten:', error);
        }); // catch
}; // function

// Function to generate a random length within a given range
function generateRandomLength(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} // function

// Funktion zum Erstellen der Brand Buttons
function createBrandButtons(brandRequirements) {
    const brandButtonsContainer = document.getElementById('brandButtonsContainer');

    // Überprüft, ob das Container-Element gefunden wurde
    if (!brandButtonsContainer) {
        console.error('Element mit ID "brandButtonsContainer" nicht gefunden');
        return;
    }; // if
    
    // Leert vorhandene Inhalte im Container
    brandButtonsContainer.innerHTML = '';
    
    // Erstellt eine neue Zeile für die Buttons
    const rowDiv = document.createElement('div');
    rowDiv.className = 'd-flex justify-content-between flex-wrap'; // Verwenden von Flexbox für die Ausrichtung

    // Durchläuft jede Markenanforderung und erstellt entsprechende Buttons
    brandRequirements.forEach((requirement, index) => {
        // Erstellt einen neuen Button
        let button = document.createElement('button');
        button.className = 'btn btn-outline-secondary btnSetRequirement';
        button.type = 'button';
        button.setAttribute('data-id', index.toString());
        button.style.minWidth = '180px';
        button.style.marginTop = '7px';
        button.style.marginBottom = '7px';
        
        button.innerHTML = `<i class="${requirement.ButtonIcon}" style="${requirement.ButtonStyle},${requirement.ButtonMin}; font-size:40px;"></i> <span style='color: ${requirement.textColor};'>${requirement.buttonText}</span>`;

        
        // Fügt einen Event-Listener für jeden Button hinzu
        button.addEventListener('click', function() {
            btnSetRequirementClick(index, brandRequirements);
        }); // function

        rowDiv.appendChild(button);
    }); // forEach
    
    // Fügt die fertige Zeile mit den Buttons zum Container hinzu
    brandButtonsContainer.appendChild(rowDiv);
}; // function

// Funktion, die bei Klick auf einen Button aufgerufen wird
function btnSetRequirementClick(id, brandRequirements) {
    setRequirement(id, brandRequirements);
}; // function

// Funktion zum Setzen der Anforderungen basierend auf der gewählten Markenanforderung
function setRequirement(id, brandRequirements) {
    // Holt die spezifische Anforderung basierend auf der ID
    let requirement = brandRequirements[id];
    
    // Überprüft, ob die Anforderung existiert
    if (!requirement) {
        console.error('Anforderung mit ID ' + id + ' nicht gefunden');
        return;
    }; // if

    // Generiert eine zufällige Länge innerhalb des angegebenen Bereichs
    let randomLength = generateRandomLength(requirement.range[0], requirement.range[1]);
    requirement.characterAmountRange = randomLength;
    requirement.characterAmountNumber = randomLength;
    
    // Zeigt das Toast-Element an
    showToast(requirement.toastId);

    // Aktualisiert die Benutzeroberfläche mit den neuen Anforderungen
    updateUI(requirement);
}; // function

// Funktion zum Aktualisieren der Benutzeroberfläche mit den Anforderungen
function updateUI(requirement) {
    document.getElementById('minLowercase').value = requirement.minLowercase;
    document.getElementById('minUppercase').value = requirement.minUppercase;
    document.getElementById('minNumbers').value = requirement.minNumbers;
    document.getElementById('minSymbols').value = requirement.minSymbols;
    document.getElementById('includeLowercase').checked = requirement.includeLowercase;
    document.getElementById('includeUppercase').checked = requirement.includeUppercase;
    document.getElementById('includeNumbers').checked = requirement.includeNumbers;
    document.getElementById('includeSymbols').checked = requirement.includeSymbols;
    document.getElementById('characterAmountNumber').value = requirement.characterAmountNumber;
    document.getElementById('characterAmountRange').value = requirement.characterAmountRange;
    
    document.getElementById('generateBtn').click();
}; // function

// Eine generische Funktion zum Anzeigen von Toasts.
function showToast(toastId) {
    var toastElement = document.getElementById(toastId);
    if (toastElement) {
        console.log(toastId + ' Button wurde geklickt.');
        var toast = new bootstrap.Toast(toastElement);
        toast.show();
    }; // if
}; // function

// Funktion zum Anzeigen mehrerer Passwörter
function displayPasswords(passwords) {
    // Elemente für die Passwortanzeige und Steuerungselemente aus dem Dokument auswählen
    let passwordDisplay = document.getElementById('passwordDisplay');
    let morePasswords = document.getElementById('morePasswords');
    let resetButton = document.getElementById('resetButton');
    let copyAllButton = document.getElementById('copyAllButton');
    
    // Das erste Passwort im Hauptanzeigefeld setzen
    passwordDisplay.value = passwords[0];
    // Weitere Passwörter löschen
    morePasswords.innerHTML = '';

    // Anzeigen oder Verbergen der Steuerungselemente je nach Anzahl der Passwörter
    if (passwords.length > 1) {
        resetButton.style.display = "inline-block";
        copyAllButton.style.display = "inline-block";
    } // if
    else {
        resetButton.style.display = "none";
        copyAllButton.style.display = "none";
    }; // else
    
    // Schleife durch zusätzliche Passwörter und erstelle Elemente für deren Anzeige
    for (let i = 1; i < passwords.length; i++) {
        let div = document.createElement('div');
          div.classList.add('input-group', 'd-flex', 'align-items-top', 'mb-2', 'mt-2');

        let input = document.createElement('input');
          input.classList.add('form-control');
          input.type = 'text';
          input.value = passwords[i];
          input.readOnly = true;

        let button = document.createElement('button');
          button.classList.add('btn', 'btn-outline-secondary');
          button.innerHTML = '<i class="fa-regular fa-copy"></i>';
          button.style = 'color: #104093';
        
        // Event-Listener zum Kopieren des Passworts beim Klicken des Buttons
        button.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            input.select();
            document.execCommand('copy'); 
            // Toast anzeigen, dass das Passwort kopiert wurde
            showToast('copyToast');
        }); // function
        
        // Elemente zum Container hinzufügen
        div.appendChild(input);
        div.appendChild(button);
        morePasswords.appendChild(div);
    }; // for
}; // function

// Funktion zur Synchronisation der Passwortanzahl zwischen Range und Number Input
function syncPasswordAmount(e) {
  let value = e.target.value;
    passwordAmountNumber.value = value;
    passwordAmountRange.value = value;
}; // function

// Funktion, um den aktuell ausgewählten Passworttyp zu erhalten
function getCurrentPasswordType() {
  return document.querySelector('input[name="passwordType"]:checked').id;
}; // function

// Funktion zur Generierung von Passwörtern basierend auf dem ausgewählten Typ
function generatePasswords() {
  // Parsen der Anzahl der zu generierenden Passwörter als ganze Zahl
  let amount = parseInt(passwordAmountNumber.value, 10);
  console.log("Amount to generate:", amount);
  let passwordType = getCurrentPasswordType();
  let passwords = [];

  // Generiere so viele Passwörter wie angegeben
  for (let i = 0; i < amount; i++) {
    switch (passwordType) {
      // Generiere ein Standardpasswort
      case 'enablePasswordCheckbox':
        passwords.push(generatePassword(characterAmountNumber.value, includeLowercaseElement.checked, includeUppercaseElement.checked, includeNumbersElement.checked, includeSymbolsElement.checked, excludeLowercaseElement.value, excludeUppercaseElement.value, excludeNumbersElement.value, excludeSymbolsElement.value));
        break;
      // Generiere eine Passphrase
      case 'enablePhraseCheckbox':
        let wordCount = parseInt(document.getElementById('wordCount').value);
        passwords.push(generatePassphrase(wordCount));
        break;
      // Generiere ein Hex-Passwort
      case 'enableHexCheckbox':
        passwords.push(generateHexPassword());
        break;
      // Fehlerbehandlung für unbekannte Passworttypen
      default:
        console.error('Unbekannter Passworttyp:', passwordType);
    }; // switch
  }; // for

  // Gebe die Liste der generierten Passwörter zurück
  return passwords;
}; // function

// Funktion zur Aktualisierung der Sichtbarkeit der Accordions
function updateVisibility() {
    // Überprüfen, welcher Passworttyp aktuell ausgewählt ist
    let checkedType = document.querySelector('input[name="passwordType"]:checked').id;
    let brandButtonsContainer = document.getElementById('brandButtonsContainer');
    
    // Entsprechend des ausgewählten Passworttyps die Sichtbarkeit der Accordions anpassen
    switch (checkedType) {
        case 'enablePasswordCheckbox':
            characterTypeAccordion.classList.remove('d-none');
            minimumCountAccordion.classList.remove('d-none');
            passwordPhraseAccordion.classList.add('d-none');
            brandButtonsContainer.style.display = 'block';
            break;

        case 'enablePhraseCheckbox':
            characterTypeAccordion.classList.add('d-none');
            minimumCountAccordion.classList.add('d-none');
            passwordPhraseAccordion.classList.remove('d-none');
            brandButtonsContainer.style.display = 'none';
            break;

        case 'enableHexCheckbox':
            characterTypeAccordion.classList.add('d-none');
            minimumCountAccordion.classList.add('d-none');
            passwordPhraseAccordion.classList.add('d-none');
            brandButtonsContainer.style.display = 'none';
            break;

        default:
            break;
    }; // switch
}; // function

// Event-Listener für alle Radio-Buttons hinzufügen
Array.prototype.forEach.call(passwordTypeRadios, function(radio) {
    radio.addEventListener('change', function() {
        updateVisibility();
    }); // function
}); // function


// Initialen Aufruf der updateVisibility Funktion zum Setzen der Anfangssichtbarkeit
updateVisibility();

// Plus - Minus - Buttons
function createCounterButtons(inputId, minusButtonId, plusButtonId, initialValue) {
  const input = document.getElementById(inputId);
  const minusButton = document.getElementById(minusButtonId);
  const plusButton = document.getElementById(plusButtonId);

  input.value = initialValue;

  minusButton.addEventListener('click', event => {
    event.preventDefault();
    const currentValue = Number(input.value) || 0;
    if (currentValue > 0) {
      input.value = currentValue - 1;
    } // if
  }); // click

  plusButton.addEventListener('click', event => {
    event.preventDefault();
    const currentValue = Number(input.value) || 0;
    input.value = currentValue + 1;
  }); // click
  
}; // function

  createCounterButtons('minUppercase', 'btn-minus-uppercase', 'btn-plus-uppercase');
  createCounterButtons('minLowercase', 'btn-minus-lowercase', 'btn-plus-lowercase');
  createCounterButtons('minNumbers', 'btn-minus-number', 'btn-plus-number');
  createCounterButtons('minSymbols', 'btn-minus-symbol', 'btn-plus-symbol');
  createCounterButtons('wordCount', 'btn-minus-wordCount', 'btn-plus-wordCount', 3);

// Funktion zur Generierung einer Passphrase aus einer Liste von Wörtern
function generatePassphrase(wordCount) {
  // Verfügbare Wörter für die Passphrase
  let words = [
    "Apfel", "Banane", "Cherry", "Dattel", "Erdbeere",
    "Feige", "Grapefruit", "Himbeere", "Ingwer", "Johannisbeere",
    "Kirsche", "Orange", "Pfirsich", "Melone", "Traube", "Mango"
  ];
  let selectedWords = [];

  // Wähle zufällig Wörter aus der Liste, basierend auf der gewünschten Anzahl
  for (let i = 0; i < wordCount; i++) {
    let word = words[Math.floor(Math.random() * words.length)];
    selectedWords.push(word);
  }; // for

  // Trennzeichen für die Passphrase, mit Standardwert '-'
  let delimiter = document.getElementById('delimiter').value || "-";
  
  // Verbinde die ausgewählten Wörter mit dem Trennzeichen zu einer Passphrase
  return selectedWords.join(delimiter);
}; // function

// Funktion zur Generierung eines Hexadezimal-Passworts
function generateHexPassword() {
    // Definiere die erlaubten Zeichen für ein Hexadezimal-Passwort
    let hexChars = '0123456789abcdef';
    let password = '';

    // Erstelle vier Segmente des Passworts
    for (let i = 0; i < 4; i++) {
        // Jedes Segment besteht aus vier Zeichen
        for (let j = 0; j < 4; j++) {
            // Wähle ein zufälliges Zeichen aus hexChars und füge es zum Passwort hinzu
            password += hexChars[Math.floor(Math.random() * hexChars.length)];
        }; // for
        // Füge einen Bindestrich hinzu, außer nach dem letzten Segment
        if (i < 3) {
            password += '-';
        }; // if
    }; // for

    // Gib das generierte Passwort zurück
    return password;
}; // function

// Funktion zur Generierung des Passworts
function generatePassword(characterAmount, includeLowercase, includeUppercase, includeNumbers, includeSymbols, excludeLowercase, excludeUppercase, excludeNumbers, excludeSymbols) {
  let charCodes = [];
  let passwordCharacters = [];

  // CharCodes nach Ausschlusskriterien modifizieren
  let modifiedLowercaseCharCodes = excludeCharsFromArray(lowercaseCharCodes, excludeLowercase);
  let modifiedUppercaseCharCodes = excludeCharsFromArray(uppercaseCharCodes, excludeUppercase);
  let modifiedNumberCharCodes = excludeCharsFromArray(numberCharCodes, excludeNumbers);
  let modifiedSymbolCharCodes = excludeCharsFromArray(symbolCharCodes, excludeSymbols);

  // CharCodes zusammenfügen, wenn sie eingeschlossen werden sollen
  if (includeLowercase) {
    charCodes = charCodes.concat(modifiedLowercaseCharCodes);
  }; // if
  if (includeUppercase) {
    charCodes = charCodes.concat(modifiedUppercaseCharCodes);
  }; // if
  if (includeNumbers) {
    charCodes = charCodes.concat(modifiedNumberCharCodes);
  }; // if
  if (includeSymbols) {
    charCodes = charCodes.concat(modifiedSymbolCharCodes);
  }; // if

  // Minimale Anzahl jedes Charaktertyps zum Passwort hinzufügen
  addCharacters(modifiedLowercaseCharCodes, minLowercase.value, passwordCharacters, includeLowercase);
  addCharacters(modifiedUppercaseCharCodes, minUppercase.value, passwordCharacters, includeUppercase);
  addCharacters(modifiedNumberCharCodes, minNumbers.value, passwordCharacters, includeNumbers);
  addCharacters(modifiedSymbolCharCodes, minSymbols.value, passwordCharacters, includeSymbols);

  // Passwort bis zur gewünschten Länge auffüllen
  for (let i = passwordCharacters.length; i < characterAmount; i++) {
    let characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }; // for

  // Passwort mischen und als String zurückgeben
  let password = shuffle(passwordCharacters);
  return password.join('');
}; // function

// Hilfsfunktion zum Hinzufügen einer bestimmten Anzahl von Zeichen zu einem Array
function addCharacters(charSet, amount, array, include) {
  // Nur ausführen, wenn include wahr ist
  if (include) {
    // Füge so viele Zeichen hinzu, wie in amount angegeben
    for (let i = 0; i < amount; i++) {
      // Wähle einen zufälligen CharCode aus dem charSet
      let characterCode = charSet[Math.floor(Math.random() * charSet.length)];
      // Konvertiere CharCode in ein Zeichen und füge es dem Array hinzu
      array.push(String.fromCharCode(characterCode));
    }; // Ende der for-Schleife
  }; // Ende der if-Bedingung
}; // Ende der Funktion

// Hilfsfunktion zum Entfernen von Zeichen
function excludeCharsFromArray(charCodes, excludeChars) {
  // Wenn excludeChars nicht definiert ist, geben Sie charCodes so zurück wie sie sind
  if (!excludeChars) {
    return charCodes;
  }; // if

  // Konvertiere excludeChars in ein Array von CharCodes
  let excludeCodes = [];
  for (let i = 0; i < excludeChars.length; i++) {
    excludeCodes.push(excludeChars[i].charCodeAt(0));
  }; // for

  // Erstelle ein neues Array für die gefilterten CharCodes
  let filteredCharCodes = [];

  // Schleife durch jedes Element in charCodes
  for (let i = 0; i < charCodes.length; i++) {
    let isExcluded = false;
    
    // Schleife durch jedes Element in excludeCodes
    for (let j = 0; j < excludeCodes.length; j++) {
      // Überprüfe, ob das aktuelle charCode Element ausgeschlossen werden soll
      if (charCodes[i] === excludeCodes[j]) {
        isExcluded = true;
        break;
      }; // if
    }; // for

    // Wenn das Element nicht ausgeschlossen ist, füge es dem gefilterten Array hinzu
    if (!isExcluded) {
      filteredCharCodes.push(charCodes[i]);
    }; // if
  }; // for

  // Gebe das gefilterte Array zurück
  return filteredCharCodes;
}; // function

// Funktion zur Erstellung eines Arrays von niedrigem bis hohem Wert
function arrayFromLowToHigh(low, high) {
  let array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }; // for
  return array;
}; // function

// Funktion zur Synchronisation der Zeichenmenge
function syncCharacterAmount(e) {
  let value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}; // function

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }; // for
    return a;
}; // function

// Alle Eventhandler
// Funktion wird ausgeführt, wenn das Dokument vollständig geladen ist - Initialisiert Button
document.addEventListener('DOMContentLoaded', function() {
    
    // Laden der Markenanforderungen
    loadBrandRequirements(); 
    
    // Event-Listener für Dropdown-Elemente
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLang(lang);
        }); // function
    }); // forEach
    
    // Funktion zum Hinzufügen eines Click-Event-Listeners zu einem Button   
    function addButtonListener(buttonId, toastId) {
        // Holt das Button-Element über seine ID.
        var button = document.getElementById(buttonId);
    
        // Wenn der Button existiert, füge einen Event-Listener hinzu.
        if (button) {
            // Fügt dem Button einen Click-Event-Listener hinzu.
            button.addEventListener('click', function() {
                // Zeigt den Toast mit der angegebenen ID an, wenn der Button geklickt wird.
                showToast(toastId);
            }); // function
        }; // if
    }; // function

    // Hinzufügen der Event-Listener zu den Buttons mit der addButtonListener Funktion.
    addButtonListener('copyAllButton', 'copyAllToast');
    addButtonListener('resetButton', 'resetToast');
    addButtonListener('copyBtn', 'copyToast');
    addButtonListener('generateBtn', 'generateBtnToast');
    addButtonListener('copyHashOutput', 'hashOutputToast');
    addButtonListener('copyMd5', 'md5Toast');
    addButtonListener('copySha1', 'sha1Toast');
    addButtonListener('copySha2', 'sha2Toast');
    addButtonListener('copySha3', 'sha3Toast');
    
    // Event-Listener für den Reset-Button
    resetButton.addEventListener('click', function() {
      // Löscht alle zusätzlichen Passworteingaben
      morePasswords.innerHTML = '';
      // Versteckt den Reset-Button
      resetButton.style.display = "none";
      // Versteckt den "Alle kopieren"-Button
      copyAllButton.style.display = "none";
    }); // function

    // Event-Listener für den "Alle kopieren"-Button
    copyAllButton.addEventListener('click', function() {
      // Sammelt alle Passwörter beginnend mit dem Hauptpasswort
      let allPasswords = passwordDisplay.value + '\n';
      // Wählt alle Input-Elemente mit Passwörtern aus
      let passwordInputs = morePasswords.querySelectorAll('input');
      
      // Verwendet eine Schleife anstelle von forEach für Kompatibilität
      for (let i = 0; i < passwordInputs.length; i++) {
          // Fügt den Wert jedes Passworts der allPasswords String hinzu
          allPasswords += passwordInputs[i].value + '\n';
      }; // for
      // Kopiert alle gesammelten Passwörter in die Zwischenablage
      navigator.clipboard.writeText(allPasswords.trim());
    }); // function

    // Event-Listener für die Synchronisation der Passwortanzahl
    passwordAmountNumber.addEventListener('input', syncPasswordAmount);
    passwordAmountRange.addEventListener('input', syncPasswordAmount);

    // Nur Großbuchstaben
    document.getElementById('excludeUppercase').addEventListener('input', function(e) {
      e.target.value = e.target.value.toUpperCase().replace(/[^A-Z,]/g, '');
    }); // function
    
    // Nur Kleinbuchstaben erlauben
    document.getElementById('excludeLowercase').addEventListener('input', function(e) {
      e.target.value = e.target.value.toLowerCase().replace(/[^a-z,]/g, '');
    }); // function
    
    // Nur Ziffern erlauben
    document.getElementById('excludeNumbers').addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/[^0-9,]/g, '');
    }); // function
    
    // Nur bestimmte Sonderzeichen erlauben
    document.getElementById('excludeSymbols').addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/[^!@#$%&*()\-=[\]{}:;'"<>,.?/]/g, '');
    }); // function

    // Event-Listener für die Synchronisation der Zeichenanzahl
    characterAmountNumber.addEventListener('input', syncCharacterAmount);
    characterAmountRange.addEventListener('input', syncCharacterAmount);

    // Event-Listener für den "generateBtn", um das entsprechende Passwort zu generieren
    generateBtn.addEventListener('click', function() {
      
        // Generiere Passwörter
        let passwords = generatePasswords();
        
        // Zeige die generierten Passwörter an
        displayPasswords(passwords);
      
        // Zustände der Checkboxen erfassen
        let isPasswordEnabled = enablePasswordCheckbox.checked;
        let isPhraseEnabled = enablePhraseCheckbox.checked;
        let isHexEnabled = document.getElementById('enableHexCheckbox').checked;
    
        // Prüft, welcher Passworttyp generiert werden soll
        if (isPasswordEnabled && !isPhraseEnabled && !isHexEnabled) {
            // Generiert ein normales Passwort, wenn diese Option ausgewählt ist
            let password = generatePassword(
                characterAmountNumber.value, 
                includeLowercaseElement.checked, 
                includeUppercaseElement.checked, 
                includeNumbersElement.checked, 
                includeSymbolsElement.checked, 
                excludeLowercaseElement.value, 
                excludeUppercaseElement.value, 
                excludeNumbersElement.value, 
                excludeSymbolsElement.value
            );
            passwordDisplay.value = password;
        } // if 
        else if (isPhraseEnabled && !isPasswordEnabled && !isHexEnabled) {
            // Generiert eine Passphrase, wenn diese Option ausgewählt ist
            let wordCount = parseInt(document.getElementById('wordCount').value);
            
            // Überprüft die Gültigkeit der Anzahl der Wörter
            if (wordCount === 0) {
                passwordDisplay.value = 'Die Anzahl der Wörter muss größer als 0 sein!';
            } // if
            else {
                passwordDisplay.value = generatePassphrase(wordCount);
            } // else
        } // else if 
        else if (isHexEnabled && !isPasswordEnabled && !isPhraseEnabled) {
            // Generiert ein Hex-Passwort, wenn diese Option ausgewählt ist
            passwordDisplay.value = generateHexPassword();
        } // else if 
        else {
            // Zeigt eine Fehlermeldung an, wenn keine eindeutige Auswahl getroffen wurde
            passwordDisplay.value = 'Wählen Sie entweder Passwort, Passphrase oder Hex-Passwort!';
        }; // else
    }); // function

    // Event-Listener für das Klicken auf das Haupt-Kopiersymbol
    maincopyBtn.addEventListener('click', function(event) {
   
        // Wählt den Text des Passwortfeldes aus
        passwordDisplay.select();
        
        // Führt den Kopiervorgang aus
        document.execCommand('copy');
    
    }); // function
  
}); // DOMContentLoaded