var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
// Alle vragen, met de antwoorden
var vragen = [['JavaScript is een programmeertaal die vaak gebruikt wordt voor', 'c', 'Structuur van de website', 'Presentatie/Stijl van de website', 'Gedrag/Interactiviteit van de website'],
['Is JavaScript hoofdlettergevoelig?', 'A', 'Ja', 'Nee'],
["Gegevens die tussen 'aanhalingstekens' staan zijn", 'A', 'Boolean', 'Strings', 'Numbers'],
['Om een pop-up te bekomen gebruik je', 'A', 'alert("tekst");', 'document.write("tekst");'],
['Om een pop-up te bekomen waarin je je naam kan invullen gebruik je', 'B', 'parseInt', 'prompt'],
['Een ander woord voor een lijst in JavaScript is', 'B', 'Array', 'Variabelen'],
['Een lijst in java telt vanaf', 'B', 'Een', 'Nul'],
['Welke lus bestaat niet in JavaScript', 'D', 'For loop', 'While loop', 'Do While loop', 'Function']];
  totaal = vragen.length;

  // Bekijk de gegeven antwoorden
function bekijkAntwoord(radioNaam){
  // Bekijk vraag door de 'name' van je input.
    var radios = document.getElementsByName(radioNaam);
    for(var i = 0; i < radios.length; i++) {
      // Kijk welk antwoord je hebt gegeven & return (geef als value) het gegeven antwoord
    if(radios[i].checked) {
      return radios[i].value;
    }
  }
}
// Een functie aanmaken om de scores te bereken.
function PuntenBerekenen(){
  document.getElementById("button").setAttribute('disabled','disabled');
  var Punten = 0;
  // Bekijk de vraag
  for (var i = 0; i < vragen.length; i++) {
    // Als gegeven gelijk is aan het juiste antwoor, dan komt er + 1 bij de punt
    if(bekijkAntwoord('vraag' + i) === vragen[i][1]) {
      document.getElementById("Titel" + i).style.color = "green";
      document.getElementById("Titel" + i).style.fontWeight = "bold";
      document.getElementById("Titel" + i).style.fontStyle = "normal";
      document.getElementById("Titel" + i).innerHTML = "Juist: " + vragen[i][0];
      Punten += 1;
    } else {
      document.getElementById("Titel" + i).style.color = "red";
      document.getElementById("Titel" + i).style.fontWeight = "800";
      document.getElementById("Titel" + i).style.fontStyle = "normal";
      document.getElementById("Titel" + i).innerHTML = "Fout: " + vragen[i][0];
      Punten -= 1;
    }
  }
  if (Punten <= 0) {
    Punten = 0;
  }
  return Punten;
}
// Het weergeven van de score's bij het bedrukken van de knop.
function LaatPuntenZien(){
  // Score laten weergeven: PuntenBerekenen()
  document.getElementById("punten").innerHTML = "Je scoorde: " + PuntenBerekenen() + "/" + totaal;
  var HelftPunten = vragen.length / '2';
  alert("Je scoorde: " + PuntenBerekenen() + "/" + totaal);
  if(PuntenBerekenen() < HelftPunten) {
    document.getElementById("punten").style.color = "red";
  } else {

    document.getElementById("punten").style.color = "green";
  } 
}
function Timer() {
  document.getElementById('timer').innerHTML =
    02 + ":" + 00;
  startTimer();
}
function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var Min = timeArray[0];
    var Sec = checkSeconde((timeArray[1] - 1));
    if(Sec == 59){Min = Min - 1}
    if(Min < 0){
      document.getElementById('timer').innerHTML =
      "Tijd is om";
      alert("Je tijd is om!");
      LaatPuntenZien();
    } else {
      document.getElementById('timer').innerHTML =
      Min + ":" + Sec;
    setTimeout(startTimer, 1000);
    }
}
function checkSeconde(Seconde) {
    if (Seconde < 10 && Seconde >= 0) {Seconde = "0" + Seconde}; // Voeg 0 toe bij cijfers kleiner als 10
    if (Seconde < 0) {Seconde = "59"};
    return Seconde;
}