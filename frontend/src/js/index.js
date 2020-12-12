import '../css/style.css';
import '../sass/base.scss';

import '@fortawesome/fontawesome-free/js/all.js'

import Products from './components/products.js';
import React from 'react';
import { render } from 'react-dom';
import axios from "axios";

// wait until the DOM fully loaded and parsed
document.addEventListener("DOMContentLoaded", function (event) {

    function loadData(data) {
        if (colonies && state && city) {
            colonies.value = data.colonies;
            state.value = data.state;
            city.value = data.city;
            town.value = data.town;
        } else {
            console.log("No se cargo correctamente la pagina.")
        }
    };

    function loadPostalCode() {
        if (selectOpt.options[selectOpt.selectedIndex].value !== "11000" &&
            selectOpt.options[selectOpt.selectedIndex].value !== "8900") {
            console.log("Código Erroneo.")
        }

        axios.get("https://blackisp.herokuapp.com/postalCodes/" + selectOpt.options[selectOpt.selectedIndex].value)
            .then((data) => {

                if (data.status !== 200 || data.statusText !== 'OK') {
                    return console.log(data.statusText);
                }

                loadData(data.data)
            })
            .catch((error) => {
                console.log(`Error is: ${error}`);
            });
    }

    function loadProducts() {
        axios.get('https://blackisp.herokuapp.com/products')
            .then((data) => {

                if (data.status !== 200 || data.statusText !== 'OK') {
                    return console.log(data.statusText);
                }
                var test = "";
                render(<Products data={data.data} />, document.getElementById('listBuy'));
            })
            .catch((error) => {
                console.log(`Error is: ${error}`);
            });
    }

    function sendContact() {

        if (!isEmail(email.value) ||
            (
                selectOpt.options[selectOpt.selectedIndex].value !== "11000" &&
                selectOpt.options[selectOpt.selectedIndex].value !== "8900"
            ) ||
            state.value === "" ||
            colonies.value === "" ||
            city.value === "" ||
            town.value === "" ||
            name.value === "" ||
            lastname.value === "" ||
            telephone.value === "" ||
            street.value === "") {
            return alert("Campos no completos o no validos.");
        } 

        return alert('Pendiente el API https://blackisp.herokuapp.com/contact no indica cuantos campos espera y como los recibe')
        
        axios.post('https://blackisp.herokuapp.com/contact', {
            "name": name,
            "lastname": lastname,
            "email": email,
            "telephone": telephone,
            "postalcode": selectOpt.options[selectOpt.selectedIndex].value,
            "colonies": colonies,
            "state": state,
            "city": city,
            "town": town,
            "street": street
        })
            .then((data) => {

                if (data.status !== 200 || data.statusText !== 'OK') {
                    return console.log(data.statusText);
                }

                console.log("Se envio con existo");
            })
            .catch((error) => {
                console.log(`Error is: ${error}`);
            });
    }

    function isEmail(mail) {
        const regExp = new RegExp(/^[a-zA-Z0-9_.]+[^-.'"!#$%&/()=?¿¡*~}ÇüéâåçêëïîÄÅ♫æÆôûÿÖø£Ø×ƒ|{Ññªº®¬½¼▓«▒»░┤©╣║╗╝¥┬├─┼¤█▄¦↨▀ßµ±‗¾¶§¸°¨☺¹³²■☻]+\@+[a-z]+\.[a-z.]{1,3}(\.[a-z]{1,3})?(\.[a-z]{1,3})?$/);
        if (regExp.test(mail)) {
            return true;
        } else {
            return false;
        }
    };

    let selectOpt = document.getElementById("slct");
    selectOpt.addEventListener("change", loadPostalCode);

    let colonies = document.getElementById('suburb');
    let state = document.getElementById('region');
    let city = document.getElementById('city');
    let town = document.getElementById('town');
    let name = document.getElementById('name');
    let lastname = document.getElementById('lastname');
    let email = document.getElementById('email');
    let telephone = document.getElementById('telephone');
    let street = document.getElementById('street');

    let save = document.getElementById("save");
    save.addEventListener("click", sendContact);

    loadProducts()
});
