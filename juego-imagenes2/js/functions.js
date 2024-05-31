let filas = 2;
let columnas = 4;
let matriz = new Array(filas);

function fillImg() {
  for (let i = 0; i < filas; i++) {
    matriz[i] = new Array(columnas);
  }

  // Llenar la matriz asegurando que cada número no se repita más de dos veces
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      let num;
      let count;

      do {
        num = Math.floor(Math.random() * 4) + 1; // Generar un número aleatorio entre 1 y 4
        count = 0;

        // Contar las ocurrencias del número en la matriz
        for (let k = 0; k < filas; k++) {
          for (let l = 0; l < columnas; l++) {
            if (matriz[k][l] === num) {
              count++;
            }
          }
        }
      } while (count >= 2); // Repetir mientras el número se repita más de dos veces

      matriz[i][j] = num; // Asignar el número a la matriz
    }
  }

  const text = document.getElementById("text");
  text.style.gridTemplateRows = `repeat(${filas}, 1fr)`;
  text.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;

  console.log(matriz);
}

function imgCreate() {
  let text = document.getElementById("text");
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      text.innerHTML +=
        '<img src="../img/buscame.jpg" onclick="img(' + i + "," +j + "," + matriz[i][j] +   ')" alt="">';
    }
  }
}

let m = new Array(filas);
let mAux = new Array(filas);

function mAux1() {
  for (let i = 0; i < filas; i++) {
    m[i] = new Array(columnas);
  }
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      m[i][j] = 0;
    }
  }
  console.log(m);
  //matriz auxiliar(copia de m)
  for (let i = 0; i < filas; i++) {
    mAux[i] = new Array(columnas);
  }
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      mAux[i][j] = 0;
    }
  }
}
let is = [];

function llenarmAux() {
  //actualiza datos cada click
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (m[i][j] !== 0) {
        mAux[i][j] = m[i][j];
      }
    }
  }
  console.log(mAux);
}

//funcion para comparar las matrices
function comMatris() {
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (mAux[i][j] !== matriz[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function compareImg1(val, fil, col) {
  is.push(val);

  console.log(is);
  console.log("picture value =" + val);
  let count = 0;
  //comparar y ubicar imagenes
  for (let i = 0; i < is.length; i++) {
    count++;
  }

  if (count >= 2) {
    let con = false;
    if (is[0] == is[1]) {
      con = true;
    }

    if (con == true) {
      let text = document.getElementById("text");
      text.innerHTML = "";
      console.log("los valores son iguales " + con);
      llenarmAux();

      for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
          if (mAux[i][j] !== 0) {
            text.innerHTML +=
              '<img src="../img/img' + mAux[i][j] + '.jpg" alt="">';
          } else {
            text.innerHTML +=
              '<img src="../img/buscame.jpg" onclick="img(' +
              i +
              "," +
              j +
              "," +
              matriz[i][j] +
              ')" alt="">';
          }
        }
      }
    } else {
      // Resetea la matriz m a la matriz auxiliar mAux
      for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
          m[i][j] = mAux[i][j];
        }
      }
      console.log("imagenes diferentes");
    }
    let com = comMatris();
    console.log(" las matices son iguales " + com);
    if (com) {
      console.log("juego terminado");
      let relo = confirm("juego terminado, ¿quieres volver a jugar?");
      if (relo) {
        location.reload();
      }
    }

    is = [];
  }

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {}
  }
}

function loadImg(i, j) {
  let text = document.getElementById("text");
  text.innerHTML = "";
  for (let r = 0; r < filas; r++) {
    for (let c = 0; c < columnas; c++) {
      if (r === i && c === j) {
        text.innerHTML +=
          '<img src="../img/img' + matriz[i][j] + '.jpg" alt="">';
      } else if (mAux[r][c] !== 0) {
        text.innerHTML += '<img src="../img/img' + mAux[r][c] + '.jpg" alt="">';
      } else {
        text.innerHTML +=
          '<img src="../img/buscame.jpg" onclick="img(' +
          r +
          "," +
          c +
          "," +
          matriz[r][c] +
          ')" alt="">';
      }
    }
  }

  compareImg1(matriz[i][j], i, j);
}

function img(i, j, val) {
  console.log("Has presionado la imagen con valor: " + val);
  m[i][j] = val;
  loadImg(i, j);
}

mAux1();
fillImg();
imgCreate();
