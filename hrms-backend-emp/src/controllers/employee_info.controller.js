const db = require("../../models");
const jwt = require("jsonwebtoken");
const tokenData = require("../../config/authConfig");
var nodemailer = require("nodemailer");
const email_config = require("../../config/emailConfig");
const axios = require("axios");
const accessTokenSecret = tokenData.secret;
const config = require("../../config/config");

// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.salaryCalculate = async (req, res) => {
  console.log("i m in");
  let sub = [];
  let add = [];
  const typesData = await axios
    .get(`${config.PAYROLL_BASEURL}/api/deduction_type/findall`)
    .catch((e) => {
      return res.send(e);
    });

  let at = await db.allocation_type.findOne({
    where: {
      name_allocation: "salary",
    },
  });
  let empsalary = await db.employee_allocation.findOne({
    where: {
      employee_info_id: req.params.id,
      allocation_type_id: at.id_allocation,
    },
  });
  if (!empsalary) {
    res.status(500).send({
      message: "salary not added for this employee",
    });
  }
  console.log(parseFloat(empsalary.value_employee_allocation.replace(",", "")));
  let empNumber = parseFloat(
    empsalary.value_employee_allocation.replace(",", "")
  );
  let salary = empNumber * 12;
  let tax = 0;

  if (salary <= 600000) {
    tax = 0;
  } else if (salary <= 1200000) {
    tax = (salary - 600000) * 0.05;
  } else if (salary <= 1800000) {
    tax = (salary - 1200000) * 0.1 + 30000;
  } else if (salary <= 2500000) {
    tax = (salary - 1800000) * 0.15 + 90000;
  } else if (salary <= 3500000) {
    tax = (salary - 1800000) * 0.175 + 195000;
  } else if (salary <= 5000000) {
    tax = (salary - 3500000) * 0.2 + 370000;
  } else if (salary <= 8000000) {
    tax = (salary - 5000000) * 0.225 + 670000;
  }
  let fsalary = tax / 12;
  const taxFoundded = typesData.data.ded.find(
    (element) => element.name_deduction_type == "tax"
  );
  sub.push({
    deduction_type_id: taxFoundded.id_deduction_type,
    amount_deduction: fsalary,
    is_enable: 1,
  });
  //----------------------------------------
  let deductions = [];
  let increase = [];
  let policies = await db.allocation_type.findOne({
    where: {
      name_allocation: "policy",
    },
  });
  let empPolicies = await db.employee_allocation.findAll({
    where: {
      employee_info_id: req.params.id,
      allocation_type_id: policies.id_allocation,
    },
  });
  let parray = [];
  for (let m = 0; m < empPolicies.length; m++) {
    parray.push(empPolicies[m].value_employee_allocation);
  }
  console.log(parray);
  if (empPolicies.length != 0) {
    data = {
      arr: parray,
    };
    // let policyarray = [];
    // for (let a = 0; a < alloc.length; a++) {
    const policyApi = await axios
      .post(`${config.BASEURL}/api/policy_defination/getByPolicyIds`, data)
      .catch((e) => {
        return res.send(e);
      });
    let policySalary = empNumber;

    for (let i = 0; i < policyApi.data.length; i++) {
      let a = 0;
      if (policyApi.data[i].factors[0].adjustment_factor == "Percentage") {
        a = (policySalary * policyApi.data[i].factors[0].value_factor) / 100;
      }
      if (policyApi.data[i].factors[0].adjustment_factor == "Actual") {
        a = policyApi.data[i].factors[0].value_factor / 1;
      }
      if (
        policyApi.data[i].policy_type_policy_type.name_policy_type ==
        "increment"
      ) {
        increase.push(a);
      } else {
        deductions.push(a);
      }
    }
  }
  console.log(increase, deductions);
  //----------------------------------------
  //adding in increments
  const policyFoundinc = typesData.data.inc.find(
    (element) => element.name_increment == "policy"
  );
  const policyFoundded = typesData.data.ded.find(
    (element) => element.name_deduction_type == "policy"
  );
  increase.map((x) => {
    add.push({
      increment_type_id: policyFoundinc.id_increment_type,
      amount_increment: x,
      is_enable: 1,
    });
  });
  deductions.map((x) => {
    sub.push({
      deduction_type_id: policyFoundded.id_deduction_type,
      amount_deduction: x,
      is_enable: 1,
    });
  });

  //---------------------------------
  var totalIncrement = increase.reduce(function (a, b) {
    return a + b;
  }, 0);
  var totalDeduction = deductions.reduce(function (a, b) {
    return a + b;
  }, 0);
  console.log(totalDeduction);
  //--------------------------------------------------
  //attendence
  // var days = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];
  // var d = new Date("2021-12-03");
  // var dayName = days[d.getDay()];

  // console.log(dayName);
  //--------------------------------------------------
  //late time calculations
  const lateData = await axios
    .get(
      `${config.ATD_BASEURL}/api/attendence/findByEmployeeId/${req.params.id}`
    )
    .catch((e) => {
      return res.send(e);
    });
  console.log(lateData.data);
  let tardi = 0;
  if (lateData.data.count != 0) {
    let oneDay = empNumber / lateData.data.divide;

    tardi = oneDay * lateData.data.count;

    tardi = Math.floor(tardi);
  }
  console.log(tardi);
  const tardyfound = typesData.data.ded.find(
    (element) => element.name_deduction_type == "tardy"
  );
  console.log(tardyfound);
  sub.push({
    deduction_type_id: tardyfound.id_deduction_type,
    amount_deduction: tardi,
    is_enable: 1,
  });
  //--------------------------------------------------
  // let today = new Date().toISOString().slice(0, 10)
  const apiData = {
    payment_type_id: 1,
    employee_id: req.params.id,
    payment_method_type_id: 1,
    title_period_payment: "Salary",
    start_date_period_payment: "2021-12-13",
    end_date_period_payment: "2021-12-13",
    salary_amount_period_payment: empNumber,
    paid_amount_period_payment:
      empNumber - fsalary + totalIncrement - totalDeduction - tardi,
    message_period_payment: "nothing",
    note_period_payment: "nothing",
    is_enable: 1,
    increments: add,
    deductions: sub,
  };
  // res.send(apiData);
  const period_payment = await axios
    .post(`${config.PAYROLL_BASEURL}/api/period_payment/`, apiData)
    .catch((e) => {
      return res.send(e);
    });
  // console.log(period_payment.data);

  res.send({
    salary: empNumber - fsalary + totalIncrement - totalDeduction - tardi,
  });
};
exports.empFanIn = async (req, res) => {
  const emp = await db.employee_info.create(
    req.body,

    {
      include: [
        { model: db.employee_address, as: "employee_addresses" },
        { model: db.work_experience, as: "work_experiences" },
        { model: db.eductation, as: "eductations" },
        { model: db.employee_dependent, as: "employee_dependents" },
        { model: db.employee_allocation, as: "employee_allocations" },
      ],
    }
  );
  const auth = {
    employee_id: emp.id_employee_info,
    authentication_type_id: req.body.authentication_type_id,
    value_employee_authentication: "pass1234",

    is_enable: 1,
  };
  await db.employee_authentication.create(auth);
  const transporter = nodemailer.createTransport({
    host: email_config.host,
    port: email_config.port,
    auth: {
      user: email_config.user,
      pass: email_config.pass,
    },
  });

  try {
    mailText = ` your hrms login credentials are : ${req.body.official_email_employee_info}  pass1234 `;

    let info = await transporter.sendMail({
      from: "hrms@gmail.com",
      to: req.body.official_email_employee_info,
      subject: "HRMS login credentials",
      text: mailText,
    });
    // return res.status(201).send({ message: info.response });
  } catch (e) {
    return res.status(500).send(e);
  }
  res.send(emp);
};

exports.create = async (req, res) => {
  // Create comment
  const emp = {
    employee_type_id: req.body.employee_type_id,
    code_employee_info: req.body.code_employee_info,
    first_name_employee_info: req.body.first_name_employee_info,
    middle_name_employee_info: req.body.middle_name_employee_info,
    last_name_employee_info: req.body.last_name_employee_info,
    personal_email_employee_info: req.body.personal_email_employee_info,
    official_email_employee_info: req.body.official_email_employee_info,
    personal_mobile_employee_info: req.body.personal_mobile_employee_info,
    official_mobile_employee_info: req.body.official_mobile_employee_info,
    father_fullname_employee_info: req.body.father_fullname_employee_info,
    dob_employee_info: req.body.dob_employee_info,
    gender_employee_info: req.body.gender_employee_info,
    cnic_number_employee_info: req.body.cnic_number_employee_info,
    blood_group_emloyee_info: req.body.blood_group_emloyee_info,
    marital_status: req.body.marital_status,
    joining_date_employee_info: req.body.joining_date_employee_info,
    termination_date_employee_info: req.body.termination_date_employee_info,
    note_admin_employee_info: req.body.note_admin_employee_info,
    reason_note_employee_info: req.body.reason_note_employee_info,
    comment_note_employee_info: req.body.comment_note_employee_info,

    is_enable_employee_info: 1,
  };

  // let empcheck = await db.employee_info.findOne({
  //   where: {
  //     official_email_employee_info: req.body.official_email_employee_info,
  //   },
  // });
  // if (empcheck)
  //   return res.status(400).send({
  //     message: "email already exists",
  //   });

  // let authType = await db.authentication_type.findOne({
  //   where: {
  //     name_authentication_type: "login",
  //   },
  // });
  // if (!authType)
  //   return res.status(404).send({
  //     message: "auth type not exists",
  //   });

  await db.employee_info
    .create(emp)
    .then(async (empData) => {
      // const empauth = {
      //   employee_id: empData.id_employee_info,
      //   authentication_type_id: authType.id_authentication_type,
      //   value_employee_authentication: req.body.password,
      //   is_enable: 1,
      // };
      // await db.employee_authentication
      //   .create(empauth)
      //   .then((authdata) => {
      //     res.status(200).send({
      //       emp: empData,
      //       message: "user created",
      //     });
      //   })
      //   .catch((err) => {
      //     res.status(500).send({
      //       message: err.message || "addressType cant be created",
      //     });
      //   });
      res.send(empData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "addressType cant be created",
      });
    });
};

exports.findall = async (req, res) => {
  db.employee_info
    .findAll({ where: {} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no  id ",
      });
    });
};

exports.findById = async (req, res) => {
  db.employee_info
    .findOne({
      where: { id_employee_info: req.params.id, is_enable_employee_info: 1 },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this point title has no earned points ",
      });
    });
};

exports.updateById = async (req, res) => {
  const id = req.params.id;

  db.employee_info
    .update(req.body, {
      where: { id_employee_info: id },
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

exports.disableById = async (req, res) => {
  const id = req.params.id;

  db.employee_info
    .update(
      { is_enable_employee_info: 0 },
      {
        where: { id_employee_info: id },
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
exports.enableById = async (req, res) => {
  const id = req.params.id;

  db.employee_info
    .update(
      { is_enable_employee_info: 1 },
      {
        where: { id_employee_info: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " enable successfully .",
        });
      } else {
        res.send({
          message: `Cannot enable  id:${id}. Please check  ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating  id=" + id,
      });
    });
};

// Login
exports.LoginVerify = async (req, res) => {
  let empData = await db.employee_info.findOne({
    where: {
      official_email_employee_info: req.body.email,
    },
  });

  if (!empData) {
    res.status(404).send({
      message: "user email not found",
    });
  } else {
    let passCheck = await db.employee_authentication.findOne({
      where: {
        employee_id: empData.id_employee_info,
        // authentication_type_id: authType.id_authentication_type,
        value_employee_authentication: req.body.password,
      },
    });

    if (!passCheck) {
      res.status(403).send({
        message: "incorrect password",
      });
    } else {
      let admin = await db.authentication_type.findOne({
        where: {
          name_authentication_type: "adminLogin",
        },
      });
      let isAdmin = 0;
      if (admin.id_authentication_type == passCheck.authentication_type_id) {
        isAdmin = 1;
      }
      const username = req.body.email;
      const accessToken = jwt.sign({ username }, accessTokenSecret, {
        expiresIn: "7d", // expires in 24 hours
      });
      // console.log(accessToken);
      // res.json({
      //     accessToken
      // });
      const permissions = await axios
        .get(
          `${config.RBAC_BASEURL}/api/user_role/findByEmpId/${empData.id_employee_info}`
        )
        .catch((e) => {
          return res.send(e);
        });

      let allocation_type = await db.allocation_type.findOne({
        where: {
          name_allocation: "OrganizationOwner",
        },
      });

      let orgGet = await db.employee_allocation.findOne({
        where: {
          employee_info_id: empData.id_employee_info,
          allocation_type_id: allocation_type.id_allocation,
        },
      });

      res.status(200).send({
        message: "login success",
        authToken: accessToken,
        details: empData,
        isAdmin: isAdmin,
        rabc: permissions.data,
        organization: orgGet,
      });
      // console.log(data)
    }
  }
};
exports.verify = async (req, res) => {
  res.sendStatus(200);
};

exports.empFanOut = async (req, res) => {
  let designation = await db.allocation_type.findOne({
    where: { name_allocation: "designation" },
  });
  let department = await db.allocation_type.findOne({
    where: { name_allocation: "department" },
  });
  let grade = await db.allocation_type.findOne({
    where: { name_allocation: "grade" },
  });
  let asset = await db.allocation_type.findOne({
    where: { name_allocation: "asset" },
  });
  let salary = await db.allocation_type.findOne({
    where: { name_allocation: "salary" },
  });
  let policy = await db.allocation_type.findOne({
    where: { name_allocation: "policy" },
  });
  let empInfo = await db.employee_info.findOne({
    where: { id_employee_info: req.params.id },
    include: [
      {
        model: db.employee_allocation,
        as: "employee_allocations",
      },
      {
        model: db.employee_type,
        as: "employee_type",
      },
      {
        model: db.employee_address,
        as: "employee_addresses",
      },
      {
        model: db.work_experience,
        as: "work_experiences",
      },
      {
        model: db.eductation,
        as: "eductations",
        include: {
          model: db.degree,
          as: "degree",
        },
      },
      {
        model: db.employee_referrence,
        as: "employee_referrences",
      },
      {
        model: db.employee_loan,
        as: "employee_loans",
      },
      {
        model: db.employee_leave,
        as: "employee_leaves",
      },
      {
        model: db.employee_document,
        as: "employee_documents",
        include: [
          {
            model: db.document_type,
            as: "document_type",
          },
        ],
      },
      {
        model: db.employee_certificaiton,
        as: "employee_certificaitons",
        include: [
          {
            model: db.certifications,
            as: "certificaiton",
          },
        ],
      },
      {
        model: db.employee_benefit,
        as: "employee_benefits",
      },
      {
        model: db.employee_dependent,
        as: "employee_dependents",
        include: [
          {
            model: db.dependent_type,
            as: "dependent_type",
          },
        ],
      },
    ],
  });
  let final = [];

  if (!empInfo) {
    res.status(500).send({
      message: "emp not found",
    });
  } else {
    let alloc = await db.employee_allocation.findOne({
      where: {
        employee_info_id: empInfo.id_employee_info,
        allocation_type_id: designation.id_allocation,
      },
      order: [["updatedAt", "DESC"]],
    });
    if (alloc) {
      const designationapi = await axios
        .get(
          `${config.BASEURL}/api/designation_defination/findById/${alloc.value_employee_allocation}`
        )
        .catch((e) => {
          return res.send(e);
        });
      final.push({ designation: designationapi.data });
    } else {
      final.push({ designation: null });
    }

    alloc = await db.employee_allocation.findOne({
      where: {
        employee_info_id: empInfo.id_employee_info,
        allocation_type_id: department.id_allocation,
      },
      order: [["updatedAt", "DESC"]],
    });
    if (alloc) {
      const deptapi = await axios
        .get(
          `${config.BASEURL}/api/department_defination/findById/${alloc.value_employee_allocation}`
        )
        .catch((e) => {
          return res.send(e);
        });
      final.push({ department: deptapi.data });
    } else {
      final.push({ department: null });
    }
    alloc = await db.employee_allocation.findOne({
      where: {
        employee_info_id: empInfo.id_employee_info,
        allocation_type_id: grade.id_allocation,
      },
      order: [["updatedAt", "DESC"]],
    });
    if (alloc) {
      // const gradeapi = await axios
      //   .get(
      //     `${config.BASEURL}/api/policy_group/byGrade/${alloc.value_employee_allocation}`
      //   )
      //   .catch((e) => {
      //     return res.send(e);
      //   });
      final.push({ grade: alloc });
    } else {
      final.push({ grade: null });
    }
    alloc = await db.employee_allocation.findAll({
      where: {
        employee_info_id: empInfo.id_employee_info,
        allocation_type_id: asset.id_allocation,
      },
      order: [["updatedAt", "DESC"]],
    });
    if (alloc.length != 0) {
      let assetarray = [];
      for (let a = 0; a < alloc.length; a++) {
        const assetapi = await axios
          .get(
            `${config.BASEURL}/api/asset_detail/EmpModule/${alloc[a].value_employee_allocation}`
          )
          .catch((e) => {
            return res.send(e);
          });
        assetarray.push(assetapi.data);
      }
      final.push({ empAssets: assetarray });
    } else {
      final.push({ empAssets: null });
    }

    final.push({ empInfo: empInfo });
    alloc = await db.employee_allocation.findOne({
      where: {
        employee_info_id: empInfo.id_employee_info,
        allocation_type_id: salary.id_allocation,
      },
      order: [["updatedAt", "DESC"]],
    });
    if (alloc) {
      final.push({ salary: alloc });
    } else {
      final.push({ salary: null });
    }
    //--------------------------
    alloc = await db.employee_allocation.findAll({
      where: {
        employee_info_id: empInfo.id_employee_info,
        allocation_type_id: policy.id_allocation,
      },
      order: [["updatedAt", "DESC"]],
    });
    let parray = [];
    for (let m = 0; m < alloc.length; m++) {
      parray.push(alloc[m].value_employee_allocation);
    }
    console.log(parray);
    if (alloc.length != 0) {
      data = {
        arr: parray,
      };
      // let policyarray = [];
      // for (let a = 0; a < alloc.length; a++) {
      const policyApi = await axios
        .post(`${config.BASEURL}/api/policy_defination/getByPolicyIds`, data)
        .catch((e) => {
          return res.send(e);
        });
      // policyarray.push(policyApi.data);
      // }
      final.push({ empPolicies: policyApi.data });
    } else {
      final.push({ empPolicies: null });
    }
    //--------------------------
    res.send(final);
  }
};

exports.empList = async (req, res) => {
  let designation = await db.allocation_type.findOne({
    where: { name_allocation: "designation" },
  });
  let grade = await db.allocation_type.findOne({
    where: { name_allocation: "grade" },
  });

  let department = await db.allocation_type.findOne({
    where: { name_allocation: "department" },
  });

  const designationapi = await axios
    .get(`${config.BASEURL}/api/designation_defination/getDesignations`)
    .catch((e) => {
      return res.send(e);
    });
  // console.log(designationapi);
  const deptList = await axios
    .get(`${config.BASEURL}/api/department_defination/findAllForEmp`)
    .catch((e) => {
      return res.send(e);
    });

  db.employee_info
    .findAll({
      include: {
        model: db.employee_allocation,
        as: "employee_allocations",
        // where: { is_enable: 1 },
      },
    })
    .then(async (list) => {
      let final = [];
      console.log(list.length);
      for (let j = 0; j < list.length; j++) {
        let emp = new Object();
        let arr2 = [];

        for (let y = 0; y < list[j].employee_allocations.length; y++) {
          if (
            list[j].employee_allocations[y].allocation_type_id ==
            designation.id_allocation
          ) {
            let obj = designationapi.data.find(
              (o) =>
                o.id_designation ==
                list[j].employee_allocations[y].value_employee_allocation
            );

            arr2.push(obj);
          }
        }
        // dept add
        let arr3 = [];
        for (let y = 0; y < list[j].employee_allocations.length; y++) {
          if (
            list[j].employee_allocations[y].allocation_type_id ==
            department.id_allocation
          ) {
            let obj1 = deptList.data.find(
              (o) =>
                o.id_department ==
                list[j].employee_allocations[y].value_employee_allocation
            );

            arr3.push(obj1);
          }
        }
        // grade add
        let arr4 = [];
        for (let y = 0; y < list[j].employee_allocations.length; y++) {
          if (
            list[j].employee_allocations[y].allocation_type_id ==
            grade.id_allocation
          ) {
            arr4.push(list[j].employee_allocations[y]);
          }
        }
        emp.grade = arr4;
        emp.department = arr3;
        emp.designation = arr2;
        emp.empDetail = list[j];
        final.push(emp);
      }

      res.send(final);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this point title has no earned points ",
      });
    });
};
exports.empListforSalary = async (req, res) => {
  let designation = await db.allocation_type.findOne({
    where: { name_allocation: "designation" },
  });
  // let grade = await db.allocation_type.findOne({
  //   where: { name_allocation: "grade" },
  // });

  let department = await db.allocation_type.findOne({
    where: { name_allocation: "department" },
  });

  const designationapi = await axios
    .get(`${config.BASEURL}/api/designation_defination/getDesignations`)
    .catch((e) => {
      return res.send(e);
    });
  // console.log(designationapi);
  const deptList = await axios
    .get(`${config.BASEURL}/api/department_defination/findAllForEmp`)
    .catch((e) => {
      return res.send(e);
    });

  db.employee_info
    .findAll({
      include: {
        model: db.employee_allocation,
        as: "employee_allocations",
        // where: { is_enable: 1 },
      },
    })
    .then(async (list) => {
      let final = [];
      console.log(list.length);
      for (let j = 0; j < list.length; j++) {
        let emp = new Object();
        let arr2 = [];

        for (let y = 0; y < list[j].employee_allocations.length; y++) {
          if (
            list[j].employee_allocations[y].allocation_type_id ==
            designation.id_allocation
          ) {
            let obj = designationapi.data.find(
              (o) =>
                o.id_designation ==
                list[j].employee_allocations[y].value_employee_allocation
            );

            arr2.push(obj);
          }
        }
        // dept add
        let arr3 = [];
        for (let y = 0; y < list[j].employee_allocations.length; y++) {
          if (
            list[j].employee_allocations[y].allocation_type_id ==
            department.id_allocation
          ) {
            let obj1 = deptList.data.find(
              (o) =>
                o.id_department ==
                list[j].employee_allocations[y].value_employee_allocation
            );

            arr3.push(obj1);
          }
        }
        // grade add
        // let arr4 = [];
        // for (let y = 0; y < list[j].employee_allocations.length; y++) {
        //   if (
        //     list[j].employee_allocations[y].allocation_type_id ==
        //     grade.id_allocation
        //   ) {
        //     arr4.push(list[j].employee_allocations[y]);
        //   }
        // }
        // emp.grade = arr4;
        emp.department = arr3;
        emp.designation = arr2;
        emp.empDetail = list[j];
        final.push(emp);
      }

      res.send(final);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this point title has no earned points ",
      });
    });
};
exports.signUp = async (req, res) => {
  req.body.is_enable_employee_info = 1;

  let empcheck = await db.employee_info.findOne({
    where: {
      [Op.or]: [
        {
          official_email_employee_info: req.body.official_email_employee_info,
        },
        {
          personal_email_employee_info: req.body.personal_email_employee_info,
        },
      ],
    },
  });
  if (empcheck)
    return res.status(400).send({
      message: "email already exists",
    });

  let emp = await db.employee_info.create(req.body);
  console.log("emp created");

  let authenticationType = await db.authentication_type.findOne({
    where: {
      name_authentication_type: "adminLogin",
    },
  });
  const auth = {
    employee_id: emp.id_employee_info,
    authentication_type_id: authenticationType.id_authentication_type,
    value_employee_authentication: "pass1234",

    is_enable: 1,
  };
  await db.employee_authentication.create(auth);
  console.log("auth created");
  const org = await axios
    .post(`${config.BASEURL}/api/organization_defination/`, req.body)
    .catch((e) => {
      return res.send(e);
    });
  console.log("organization created");
  let allocation_type = await db.allocation_type.findOne({
    where: {
      name_allocation: "OrganizationOwner",
    },
  });
  let empAllocation = {
    employee_info_id: emp.id_employee_info,
    allocation_type_id: allocation_type.id_allocation,
    value_employee_allocation: org.data.id_organization,
  };

  let empAlloc = await db.employee_allocation.create(empAllocation);
  console.log("emp allocation");
  const data = {
    employee_id: emp.id_employee_info,
    role_id: 4,
  };
  const empRole = await axios
    .post(`${config.RBAC_BASEURL}/api/user_role/`, data)
    .catch((e) => {
      return res.send(e);
    });
  console.log("role created");
  const transporter = nodemailer.createTransport({
    host: email_config.host,
    port: email_config.port,
    auth: {
      user: email_config.user,
      pass: email_config.pass,
    },
  });

  try {
    mailText = ` your hrms login credentials are : ${req.body.official_email_employee_info}  pass1234 `;

    let info = await transporter.sendMail({
      from: "hrms@gmail.com",
      to: req.body.official_email_employee_info,
      subject: "HRMS login credentials",
      text: mailText,
    });
    // return res.status(201).send({ message: info.response });
  } catch (e) {
    return res.status(500).send(e);
  }
  res.send({
    empData: emp,
    organization: org.data,
  });
};
