const express = require("express");
const app = express();
const port = process.env.PORT || 5002;
// const dbConn = require("./db.config.js");
const fire = require("./fire");
const db = fire.firestore();

const cors = require("cors");

app.use(cors((origin = true)));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.listen(port, () => {
  console.log(port, "service runinng");
});

app.get("/", (req, res) => {
  const date_obj = new Date();

  const tanggal = `${date_obj.getFullYear()}-${
    date_obj.getMonth() + 1
  }-${date_obj.getDate()}`;

  res.send(tanggal);
});

app.post("/transaksi", (req, res) => {
  const date_obj = new Date();
  let tanggal = `${date_obj.getFullYear()}-${
    date_obj.getMonth() + 1
  }-${date_obj.getDate()}`;
  let jenis_transaksi = "Pinjam";
  let id_member = req.body.id_member;
  let list_film = req.body.list_film;
  let biaya = req.body.biaya;
  let denda = 0;
  let errors = false;
  if (
    jenis_transaksi.length === 0 ||
    id_member.length === 0 ||
    list_film.length === 0 ||
    biaya.length
  ) {
    errors = true;
    res.send("Ada yang kosong!");
  } else if (!errors) {
    var form_data = {
      tanggal,
      jenis_transaksi,
      id_member,
      list_film,
      biaya,
      denda,
    };

    db.collection("transaksi").add(form_data);
    res.send("Transaksi successfully added!");
  }
});

//query select all transaksi
app.get("/transaksi", (req, res) => {
  db.collection("transaksi")
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.send(data);
    });
});

//query select id transaksi
app.get("/transaksi/:id_member", (req, res) => {
  let id_member = req.params.id_member;
  db.collection("transaksi")
    .where("id_member", "==", id_member)
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.send(data);
    });
});

app.post("/cart", (req, res) => {
  let id_user = req.body.id_user;
  let id_film = req.body.id_film;
  let poster = req.body.poster;
  let price = req.body.price;
  let title = req.body.title;

  if (
    id_user.length === 0 ||
    id_film.length === 0 ||
    poster.length === 0 ||
    price.length === 0 ||
    title.length === 0
  ) {
    res.send("Ada yang kosong!");
  } else {
    const form_data = {
      id_user,
      id_film,
      poster,
      price,
      title,
    };

    db.collection("cart").add(form_data);
    res.send(form_data);
  }
});

app.get("/cart/:id_user", (req, res) => {
  let id_user = req.params.id_user;
  db.collection("cart")
    .where("id_user", "==", id_user)
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.send(data);
    });
});

// app.put("/transaksi/:id_transaksi", (req, res) => {
//   let id_transaksi = req.params.id_transaksi;
//   let jenis_transaksi = req.body.jenis_transaksi;
//   let lama_pinjam = req.body.lama_pinjam;
//   let biaya = req.body.biaya;
//   let denda = req.body.denda;
//   let id_member = req.body.id_member;
//   let id_film = req.body.id_film;
//   let errors = false;

//   if (
//     jenis_transaksi.length === 0 ||
//     lama_pinjam.length === 0 ||
//     biaya.length === 0 ||
//     denda.length === 0 ||
//     id_member.length === 0 ||
//     id_film.length === 0
//   ) {
//     errors = true;
//     res.send("Ada yang kosong!");
//   } else if (!errors) {
//     var form_data = {
//       jenis_transaksi: jenis_transaksi,
//       lama_pinjam: lama_pinjam,
//       biaya: biaya,
//       denda: denda,
//       id_member: id_member,
//       id_film: id_film,
//     };

//     dbConn.query(
//       "UPDATE transaksi SET ? WHERE id_transaksi = " + id_transaksi,
//       form_data,
//       (err, result) => {
//         if (err) {
//           res.send("error");
//         } else {
//           res.send("Transaksi successfully updated!");
//         }
//       }
//     );
//   }
// });
