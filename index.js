const express = require("express");
const app = express();
const port = process.env.PORT || 5002;
const dbConn = require("./db.config.js");

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

app.post("/transaksi", (req, res, next) => {
  let jenis_transaksi = req.body.jenis_transaksi;
  let lama_pinjam = req.body.lama_pinjam;
  let biaya = req.body.biaya;
  let denda = req.body.denda;
  let id_member = req.body.id_member;
  let id_film = req.body.id_film;
  let errors = false;

  if (
    jenis_transaksi.length === 0 ||
    lama_pinjam.length === 0 ||
    biaya.length === 0 ||
    denda.length === 0 ||
    id_member.length === 0 ||
    id_film.length === 0
  ) {
    errors = true;
    res.send("Ada yang kosong!");
  } else if (!errors) {
    var form_data = {
      jenis_transaksi: jenis_transaksi,
      lama_pinjam: lama_pinjam,
      biaya: biaya,
      denda: denda,
      id_member: id_member,
      id_film: id_film,
    };

    dbConn.query("INSERT INTO transaksi SET ?", form_data, (err, result) => {
      if (err) {
        res.send("error");
      } else {
        res.send("Transaksi successfully added!");
      }
    });
  }
});

//query select all transaksi
app.get("/transaksi", (req, res) => {
  dbConn.query("SELECT * FROM transaksi ", (err, result) => {
    if (err) {
      res.send("error");
    } else {
      res.send(result);
    }
  });
});

//query select id transaksi
app.get("/transaksi/:id_transaksi", (req, res, next) => {
  let id_transaksi = req.params.id_transaksi;
  dbConn.query(
    "SELECT * FROM transaksi WHERE id_transaksi = " + id_transaksi,
    (err, result) => {
      if (err) {
        res.send("error");
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/transaksi/:id_transaksi", (req, res, next) => {
  let id_transaksi = req.params.id_transaksi;
  let jenis_transaksi = req.body.jenis_transaksi;
  let lama_pinjam = req.body.lama_pinjam;
  let biaya = req.body.biaya;
  let denda = req.body.denda;
  let id_member = req.body.id_member;
  let id_film = req.body.id_film;
  let errors = false;

  if (
    jenis_transaksi.length === 0 ||
    lama_pinjam.length === 0 ||
    biaya.length === 0 ||
    denda.length === 0 ||
    id_member.length === 0 ||
    id_film.length === 0
  ) {
    errors = true;
    res.send("Ada yang kosong!");
  } else if (!errors) {
    var form_data = {
      jenis_transaksi: jenis_transaksi,
      lama_pinjam: lama_pinjam,
      biaya: biaya,
      denda: denda,
      id_member: id_member,
      id_film: id_film,
    };

    dbConn.query(
      "UPDATE transaksi SET ? WHERE id_transaksi = " + id_transaksi,
      form_data,
      (err, result) => {
        if (err) {
          res.send("error");
        } else {
          res.send("Transaksi successfully updated!");
        }
      }
    );
  }
});
