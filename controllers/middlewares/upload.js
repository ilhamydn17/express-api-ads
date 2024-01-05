const multer = require('multer');
const slug = require('slug');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './assets/images');
	},

	filename: (req, file, cb) => {
		const ext = file.originalname.split('.').pop().toLowerCase();
		const sluggedName = slug(file.originalname.slice(0, -ext.length));
		const randomNum = Math.floor(Math.random() * (999 - 100 + 1) + 100);
		const fileName = `${randomNum}-${sluggedName}.${ext}`;
		
		const validExtension = ['jpg', 'jpeg', 'png'];
		if (!validExtension.includes(ext)) {
			// Ekstensi tidak valid, kirim respons JSON
			return cb(new Error('Invalid file extension!'), false);
		}
		cb(null, fileName);
	},
});

const upload = multer({
	storage,
	limits: { fileSize: 1024 * 1024 * 5 },
});


module.exports = { upload };
