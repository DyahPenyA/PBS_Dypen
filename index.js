const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const db = require('./config.js');
const response = ('./response.js')

// Menggunakan body-parser middleware
app.use(bodyParser.json());

// Tampilan selamat datang
app.get('/', (req, res) => {
    const welcomeMessage = `
    Dyah Peny Agustin - 21312097
    `;
    res.send(welcomeMessage);
});

// Get data Produk
app.get('/Produk', (req, res) => {
    db.query('SELECT * FROM Produk', (error, results) => { 
        if (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        } else {
            res.json(results);
        }
    });
});

// Insert data (POST) Produk
app.post('/Produk', (req, res) => {
    const { nama_Produk, jenis_Produk, harga, stok } = req.body;
    const values = { nama_Produk, jenis_Produk, harga, stok };

    db.query('INSERT INTO Produk SET ?', values, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Gagal menambahkan data Produk.");
        } else {
            db.query('SELECT * FROM Produk WHERE ID_Produk = ?', result.insertId, (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Internal server error");
                } else {
                    res.json({
                        message: "Data Produk berhasil ditambahkan.",
                        data: results[0]
                    });
                }
            });
        }
    });
});

// Update data Produk (PUT)
app.put('/Produk/:id', (req, res) => {
    const id_Produk = req.params.id;
    const { nama_Produk, jenis_Produk, harga, stok } = req.body;
    const values = { nama_Produk, jenis_Produk, harga, stok };

    db.query('UPDATE Produk SET ? WHERE ID_Produk = ?', [values, id_Produk], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Gagal memperbarui data Produk.");
        } else {
            res.json({
                message: "Data Produk berhasil diperbarui."
            });
        }
    });
});

// Hapus data Produk (DELETE)
app.delete('/Produk/:id', (req, res) => {
    const id_Produk = req.params.id;

    db.query('DELETE FROM Produk WHERE ID_Produk = ?', id_Produk, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Gagal menghapus data Produk.");
        } else {
            res.json({
                message: "Data Produk berhasil dihapus."
            });
        }
    });
});

// Get data Merek
app.get('/Merek', (req, res) => {
    db.query('SELECT * FROM Merek', (error, results) => { 
        if (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        } else {
            res.json(results);
        }
    });
});

// Insert data (POST) Merek
app.post('/Merek', (req, res) => {
    const { nama_Merek, negara_asal } = req.body;
    const values = { nama_Merek, negara_asal };

    db.query('INSERT INTO Merek SET ?', values, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Gagal menambahkan data Merek.");
        } else {
            db.query('SELECT * FROM Merek WHERE ID_Merek = ?', result.insertId, (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Internal server error");
                } else {
                    res.json({
                        message: "Data Merek berhasil ditambahkan.",
                        data: results[0]
                    });
                }
            });
        }
    });
});

// Update data Merek (PUT)
app.put('/Merek/:id', (req, res) => {
    const id_Merek = req.params.id;
    const { nama_Merek, negara_asal } = req.body;
    const values = { nama_Merek, negara_asal };

    db.query('UPDATE Merek SET ? WHERE ID_Merek = ?', [values, id_Merek], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Gagal memperbarui data Merek.");
        } else {
            res.json({
                message: "Data Merek berhasil diperbarui."
            });
        }
    });
});

// Hapus data Merek (DELETE)
app.delete('/Merek/:id', (req, res) => {
    const id_Merek = req.params.id;

    db.query('DELETE FROM Merek WHERE ID_Merek = ?', id_Merek, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Gagal menghapus data Merek.");
        } else {
            res.json({
                message: "Data Merek berhasil dihapus."
            });
        }
    });
});

// Get data Penjualan
app.get('/Penjualan', (req, res) => {
    db.query('SELECT * FROM Penjualan', (error, results) => { 
        if (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        } else {
            res.json(results);
        }
    });
});

// Insert data (POST) Penjualan
app.post('/Penjualan', (req, res) => {
    const { id_Produk, id_Merek, tanggal_Penjualan, jumlah_item, total_harga } = req.body;
    const values = { id_Produk, id_Merek, tanggal_Penjualan, jumlah_item, total_harga };

    db.query('INSERT INTO Penjualan SET ?', values, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Gagal menambahkan data Penjualan.");
        } else {
            db.query('SELECT * FROM Penjualan WHERE ID_Penjualan = ?', result.insertId, (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Internal server error");
                } else {
                    res.json({
                        message: "Data Penjualan berhasil ditambahkan.",
                        data: results[0]
                    });
                }
            });
        }
    });
});

// Update data Penjualan (PUT)
app.put('/Penjualan/:id', (req, res) => {
    const id_Penjualan = req.params.id;
    const { id_Produk, id_Merek, tanggal_Penjualan, jumlah_item, total_harga } = req.body;
    const values = { id_Produk, id_Merek, tanggal_Penjualan, jumlah_item, total_harga };

    db.query('UPDATE Penjualan SET ? WHERE ID_Penjualan = ?', [values, id_Penjualan], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Gagal memperbarui data Penjualan.");
        } else {
            res.json({
                message: "Data Penjualan berhasil diperbarui."
            });
        }
    });
});

// Hapus data Penjualan (DELETE)
app.delete('/Penjualan/:id', (req, res) => {
    const id_Penjualan = req.params.id;

    db.query('DELETE FROM Penjualan WHERE ID_Penjualan = ?', id_Penjualan, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Gagal menghapus data Penjualan.");
        } else {
            res.json({
                message: "Data Penjualan berhasil dihapus."
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

