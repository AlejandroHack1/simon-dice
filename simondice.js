function juego() {
  // los niveles del juego
  const niveles = 10;

  let teclas = generarTeclas(niveles);

  //Avanzar a los siguientes niveles
  function siguienteNivel(nivelActual) {
    if (nivelActual == niveles) {
      alert("Ganaste");
      document.getElementById("form").style.display = "block";
      document.getElementById("keyboard").style.display = "none";
      getName = prompt("Cual es tu Nombre ? ");
      document.getElementById("nombre").value = getName;
      document.getElementById("nivel").value = nivelActual;
      document.getElementById("puntaje").value = nivelActual * 5;
      window.location.href = "addrating.php?na=" + getName + "&le=" + nivelActual + "&pu=" + nivelActual * 5;


      return;
    } else {
      alert(`Nivel ${nivelActual + 1}`);

      for (let i = 0; i <= nivelActual; i++) {
        setTimeout(() => activate(teclas[i]), 500 * (i + 1));
      }

      let i = 0;
      let teclaActual = teclas[i];
      window.addEventListener(`keydown`, onkeydown);
      function onkeydown(ev) {
        if (ev.keyCode == teclaActual) {
          activate(teclaActual, { success: true });
          i++;
          if (i > nivelActual) {
            window.removeEventListener(`keydown`, onkeydown);
            setTimeout(() => siguienteNivel(i), 1500);
          }
          teclaActual = teclas[i];
        } else {
          activate(ev.keyCode, { fail: true });
          window.removeEventListener(`keydown`, onkeydown);
          alert(`perdiste`);
          document.getElementById("form").style.display = "block";
          document.getElementById("keyboard").style.display = "none";
          getName = prompt("Cual es tu Nombre ? ");
          document.getElementById("nombre").value = getName;
          document.getElementById("nivel").value = nivelActual;
          document.getElementById("puntaje").value = nivelActual * 5;
          window.location.href = "addrating.php?na=" + getName + "&le=" + nivelActual + "&pu=" + nivelActual * 5;
        }
      }

      //click
      window.addEventListener("click", onclick);
      function onclick(ev) {
        if (ev.target.outerText.charCodeAt(0) == teclaActual) {
          activate(teclaActual, { success: true });
          i++;
          if (i > nivelActual) {
            window.removeEventListener(`click`, onclick);
            setTimeout(() => siguienteNivel(i), 1500);
          }
          teclaActual = teclas[i];
        } else {
          activate(ev.target.outerText.charCodeAt(0), { fail: true });
          window.removeEventListener(`click`, onclick);
          alert(`perdiste`);
          document.getElementById("form").style.display = "block";
          document.getElementById("keyboard").style.display = "none";
          getName = prompt("Cual es tu Nombre ? ");
          document.getElementById("nombre").value = getName;
          document.getElementById("nivel").value = nivelActual;
          document.getElementById("puntaje").value = nivelActual * 5;
          window.location.href = "addrating.php?na=" + getName + "&le=" + nivelActual + "&pu=" + nivelActual * 5;

        }
      }
    }
  }

  siguienteNivel(0);

  //Atrapa las teclas aleatorias y las guarda
  function generarTeclas(niveles) {
    return new Array(niveles).fill(0).map(generarTeclaAleatoria);
  }

  // Genera tecla aleatoria
  function generarTeclaAleatoria() {
    const min = 65;
    const max = 90;
    return Math.round(Math.random() * (max - min) + min);
  }

  function getElementByKeyCode(keyCode) {
    return document.querySelector(`[data-key="${keyCode}"]`);
  }

  function activate(keyCode, opts = {}) {
    const el = getElementByKeyCode(keyCode);
    el.classList.add("active");
    if (opts.success) {
      el.classList.add("success");
    } else if (opts.fail) {
      el.classList.add("fail");
    }
    // retardar medio segundo
    setTimeout(() => deactivate(el), 500);
  }

  //desactivar
  function deactivate(el) {
    el.className = "key";
  }
}
