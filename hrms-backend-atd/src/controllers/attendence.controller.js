const db = require("../../models");
const Op = db.Sequelize.Op;
const moment = require("moment");

exports.create = async (req, res) => {
  const publicHoliday = {
    leave_bank_id: req.body.leave_bank_id,
    over_time_id: req.body.over_time_id,
    employee_id: req.body.employee_id,
    time_slot_id: req.body.time_slot_id,
    date_attendance: req.body.date_attendance,
    is_absent_attendance: req.body.is_absent_attendance,
    is_leave_attendance: req.body.is_leave_attendance,
    is_public_holiday_attendance: req.body.is_public_holiday_attendance,
    work_hour_attendance: req.body.work_hour_attendance,
    is_over_time_attendance: req.body.is_over_time_attendance,
    over_work_hour_attendance: req.body.over_work_hour_attendance,
    is_leave_approved_attendance: req.body.is_leave_approved_attendance,
    leave_balance_attendance: req.body.leave_balance_attendance,
    is_enable_attendance: 1,
  };
  db.attendance
    .create(publicHoliday)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "public_holiday cant be created",
      });
    });
};

exports.findAll = async (req, res) => {
  db.attendance
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no holidays ",
      });
    });
};
exports.findByEmpId = async (req, res) => {
  //---------------------------------------
  // var todayDate = new Date().toISOString().slice(0, 10);
  // Date.prototype.addDays = function (days) {
  //   const date = new Date(this.valueOf());
  //   date.setDate(date.getDate() - days);
  //   return date.toISOString().slice(0, 10);
  // };
  // const date = new Date(todayDate);
  // console.log(todayDate);
  // startDate = date.addDays(2);
  // console.log(startDate);
  var dt = new Date();
  console.log(dt, "Dddddddddd");
  var month = dt.getMonth();
  var year = dt.getFullYear();
  daysInMonth = new Date(year, month, 0).getDate();
  // console.log(daysInMonth);
  //---------------------------------------

  let count = 0;
  db.attendance
    .findAll({
      where: {
        employee_id: req.params.id,
        comment_time_difference: "late",

        [Op.and]: [
          {
            date_attendance: { [Op.gte]: moment().subtract(1, "months") },
          },
          {
            date_attendance: { [Op.lt]: dt },
          },
        ],
      },
    })
    .then((data) => {
      if (data.length >= 3) {
        if (data.length - 3 == 0) {
          count = 1;
          res.status(200).send({
            count: count,
            divide: daysInMonth,
          });
        } else {
          let a = data.length - 3;

          count = 1 + a / 2;
          count = Math.floor(count);

          res.status(200).send({
            count: count,
            divide: daysInMonth,
          });
        }
      } else {
        res.status(200).send({
          count: count,
          divide: daysInMonth,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no holidays ",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  db.attendance
    .update(req.body, {
      where: { id_attendance: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " updated successfully .",
        });
      } else {
        res.send({
          message: `Cannot update  id:${id}. Please check  ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating  id=" + id,
      });
    });
};

exports.disable = async (req, res) => {
  const id = req.params.id;

  db.attendance
    .update(
      { is_enable_attendance: 0 },
      {
        where: { id_attendance: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " disable successfully .",
        });
      } else {
        res.send({
          message: `Cannot disable  id:${id}. Please check  ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating  id=" + id,
      });
    });
};

exports.enable = async (req, res) => {
  const id = req.params.id;

  db.attendance
    .update(
      { is_enable_attendance: 1 },
      {
        where: { id_attendance: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " enable successfully .",
        });
      } else {
        res.send({
          message: `Cannot disable  id:${id}. Please check  ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating  id=" + id,
      });
    });
};
