import {zbiorPytan} from './zbiorPytan.js'

const przyciskStart = document.getElementById("startButton")
const przyciskNastepne = document.getElementById("nastepneButton")
const ekranStartowy = document.getElementById("startContainer")
const ekranQuizu = document.getElementById("pytaniaContainer")
const pytanie = document.getElementById("trescPytania")
const odpowiedzi = document.getElementById("odpowiedzi")
przyciskStart.addEventListener("click", rozpocznijGre)

// zmienne globalne
var wybranaOdp
var aktualnePytanie
var punkty = 0
var zadanePytania = 0
var wykorzystanePytania = []


function rozpocznijGre() {
    ekranStartowy.style.display = "none";
    ekranQuizu.style.display = "block";
    nastepnePytanie()
}

function nastepnePytanie() {
    var index = Math.floor(Math.random() * zbiorPytan.length)
    while (wykorzystanePytania.includes(index)) {
        index = Math.floor(Math.random() * zbiorPytan.length)
    }
    wykorzystanePytania.push(index)
    aktualnePytanie = zbiorPytan[index]
    pytanie.innerText = `Pytanie ${zadanePytania+1}/25\n${aktualnePytanie.pytanie}`
    przyciskNastepne.addEventListener("click", sprawdzOdpowiedz)

    aktualnePytanie.odpowiedzi.forEach(element => {
        var odp = document.createElement("button")
        odp.innerText = element
        odp.classList.add("element")
        odp.style.fontSize = "1.4rem"
        odp.addEventListener("click", () => {
            wybranaOdp = odp.innerText
            console.log(odp.innerText)
            wybierzOdpowiedz(odp)
        })
        odpowiedzi.appendChild(odp)
    });
} 

function wybierzOdpowiedz(button) {
    var zaznaczona = button.classList.contains("zaznaczona");
    odznaczOdpowiedzi();
    if (!zaznaczona) {
      button.classList.add("zaznaczona");
      wybranaOdp = button.innerText;
    } else {
      wybranaOdp = null;
    }
    przyciskNastepne.addEventListener("click", sprawdzOdpowiedz);
  }

function odznaczOdpowiedzi() {
    var warianty = odpowiedzi.getElementsByClassName("element");
    for (var i = 0; i < warianty.length; i++) {
        warianty[i].classList.remove("zaznaczona");
    }
}

function sprawdzOdpowiedz() {
    if (wybranaOdp === aktualnePytanie.poprawna) {
        punkty += 1
        pytanie.innerText = `Dobrze!\n Ilość punktów: ${punkty}`;
    } else {
        pytanie.innerText = `Źle!\n Ilość punktów: ${punkty}`
    }
    zadanePytania += 1
    odpowiedzi.innerHTML = '';
    przyciskNastepne.removeEventListener("click", sprawdzOdpowiedz)
    wybranaOdp = null
    if (zadanePytania >= 25) {
        zakonczQuiz()
    } else {
        setTimeout(nastepnePytanie, 1200)
    }
}

function zakonczQuiz() {
    if (punkty >= 19) {
        pytanie.innerText = `Gratulacje, Wygrałeś!\nIlość zdobytych punktów: ${punkty}/25`;
    } else {
        pytanie.innerText = `Tym razem się nie udało!\n Ilość zdobytych punktów: ${punkty}/25`;
    }
        odpowiedzi.innerHTML = '';
}
