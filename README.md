# Express API
## Cara Run Program
#### 1. Clone Repository
```
git clone https://github.com/ilhamydn17/express-api-ads.git
```
#### 2. Buat Database dengan Sequelize
Jalankan command pada terminal folder repo proyek ini. Sebelumn menjalankan command tersebut, sesuaikan koneksi database pada folder config/config.json dengan perangkat yang digunakan
```
npx sequelize db:create
```
#### 3. Run migration tabel-tabel
```
npx sequelize db:migrate
```
#### 4. Jalankan server 
```
npm run ads-api
```
