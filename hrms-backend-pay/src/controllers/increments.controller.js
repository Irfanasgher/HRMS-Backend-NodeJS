const db = require("../../models");

// const Shop = db.shops;
const Op = db.Sequelize.Op;
exports.createIncrements = async (req, res) => {
  // Create comment
  const addressType = {
    period_payment_id: req.body.period_payment_id,

    increment_type_id: req.body.increment_type_id,
    amount_increment: req.body.amount_increment,
    is_enable: 1,
  };
  await db.increments
    .create(addressType)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "addressType cant be created",
      });
    });
};
