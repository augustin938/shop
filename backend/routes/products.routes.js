const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Продукты');
});

module.exports = router;
