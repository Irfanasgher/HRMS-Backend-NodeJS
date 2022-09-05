const db = require("../../models");

// const Shop = db.shops;
const Op = db.Sequelize.Op;
exports.createDeduction = async (req, res) => {
  // Create comment
  const addressType = {
    period_payment_id: req.body.period_payment_id,
    description: req.body.description,
    deduction_type_id: req.body.deduction_type_id,
    amount_deduction: req.body.amount_deduction,
    is_enable: 1,
  };
  await db.deductions
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
