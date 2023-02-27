const router = require("express").Router();
const mw = require("./accounts-middleware");

const Accounts = require("./accounts-model");

router.get("/", (req, res, next) => {
  // KODLAR BURAYA
  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let account = req.Account;
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      let insertedData = await Accounts.create(req.body);
      res.status(201).json(insertedData);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  mw.checkAccountPayload,
  mw.checkAccountId,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      let updatedData = await Accounts.updateById(req.params.id, req.body);
      res.status(201).json(updatedData);
    } catch (error) {
      next();
    }
  }
);

router.delete("/:id", mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await Accounts.deleteById(req.params.id);
    res.json(req.Account);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
});

router.use((err, res, req) => {
  res.status(err.status || 400).json({
    customMessage: "Bir hata oluştu",
    message: err.message,
  });
});

module.exports = router;
