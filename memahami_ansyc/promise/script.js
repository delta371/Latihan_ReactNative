// fetch('http://www.omdbapi.com/?apikey=b6c876e6&s=avengers')
//   .then((response) => response.json())
//   .then((response) => console.log(response));

//   Promise adalah object yang merepresentasikan keberhasilan atau kegagalan sebuah event yang Ansycronus di masa yang akan datang
// janji (terpenuhi/ingkar)
// states  (fullfield/ rejected/ pending)
// callback (resolve/reject/finally)
//  aksi (then/ catch)

// ? CONTOH 1
// let ditepati = false;
// const janji1 = new Promise((resolve, reject) => {
//   if (ditepati) {
//     resolve('janji telah ditepati!');
//   } else {
//     reject('ingkar janji!');
//   }
// });

// console.log(janji1);

// janji1
//   .then((hasil) => console.log('OK!', hasil))
//   .catch((hasil) => console.log('NOT OK!', hasil));

// ? CONTOH2
// let ditepati = true;
// const janji2 = new Promise((resolve, reject) => {
//   if (ditepati) {
//     setTimeout(() => {
//       resolve('ditepati setelah beberapa waktu !');
//     }, 2000);
//   } else {
//     setTimeout(() => {
//       resolve('tidak ditepati setelah beberapa waktu !');
//     }, 2000);
//   }
// });

// console.log('mulai');
// console.log(janji2.then(() => console.log(janji2)));
// janji2
//   .finally(() => console.log('selesai menunggu')) //di jalankan di awal sebelum salah satu terpenuhi
//   .then((hasil) => console.log('OK!', hasil))
//   .catch((hasil) => console.log('NOT OK!', hasil));
// console.log('selesai');

// ! Promise.all

const film = new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      {
        judul: 'Avengers',
        sutradara: 'Muhamad Ridwan',
        pemain: 'aming,beben,emad',
      },
    ]);
  }, 1000);
});

const cuaca = new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      {
        kota: 'Bogor',
        temp: 26,
        kondisi: 'Cerah berawan',
      },
    ]);
  }, 500);
});

// film.then((response) => console.log(response));
// cuaca.then((response) => console.log(response));

Promise.all([film, cuaca])
  // .then((response) => console.log(response));
  .then((response) => {
    const [film, cuaca] = response;
    console.log(film);
    console.log(cuaca);
  }); //untuk memisahkan arrray di dalam array
