const pool = require("../../../common/database/config");
const {
  errors,
  success,
} = require("../../../common/helpers/constants/messages");
const constants = require("../../../common/helpers/constants/constants");
const {
  readAllRecord,
  createRecord,
} = require("../../../common/helpers/functions");
const tables = require("../../../common/helpers/constants/tables");
const { response } = require("express");

const table = tables.tables.ClientesRegistros.name;

module.exports = {
  addClient: async (req, res) => {
    try {
      const { nombre, edad, iglesia, email, telefono, instrumento } = req.body;
      console.log(nombre, edad, iglesia, email, telefono, instrumento);
      let response = 0;
      let responseAux = 0;

      const myConnection = pool.connection(constants.DATABASE);
      myConnection.getConnection(async function (err, connection) {
        if (err) {
          return res.status(errors.errorConnection.code).json({
            ok: false,
            message: errors.errorConnection.message,
          });
        }

        response = await readAllRecord(
            `SELECT *  FROM ClientesRegistros WHERE email = '${email}'`,
            connection
        );

        if (response[2].length == 0) {
            console.log(response);
        const client = {
            nombre, 
            edad, 
            iglesia, 
            email, 
            telefono, 
            id_instrumento: instrumento, 
        };
        response = await createRecord(client, table, connection);

        } else {
        response[1] = errors.errorRecordAlredyExists;
        }

        connection.release();
        myConnection.end();
        
        console.log(response);
        return res.status(response[1].code).json({
          ok: response[0],
          message: response[1].message,
          data: response[2],
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(errors.errorServer.code).json({
        ok: false,
        message: errors.errorServer.message,
      });
    }
  },

  getClient: async (req, res) => {
    try {
      let response = 0;

      const myConnection = pool.connection(constants.DATABASE);
      myConnection.getConnection(async function (err, connection) {
        if (err) {
          console.log(err);
          return res.status(errors.errorConnection.code).json({
            ok: false,
            message: errors.errorConnection.message,
          });
        }
        response = await readAllRecord(
            'SELECT * FROM `ccamigos_congreso-musicos`.ClientesRegistros WHERE estatus = 0',
            connection
        );

        console.log(response);

        connection.release();
        myConnection.end();

        return res.status(response[1].code).json({
          ok: response[0],
          message: response[1].message,
          data: response[2],
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(errors.errorServer.code).json({
        ok: false,
        message: errors.errorServer.message,
      });
    }
  },
// 
//   updateUser: async (req, res) => {
//     try {
//       let { name } = req.body;
//       const id_user = req.id_user;
// 
//       const current_date = getCurrentDate();
//       const myConnection = pool.connection(constants.DATABASE);
//       myConnection.getConnection(async function (err, connection) {
//         if (err) {
//           console.log(err);
//           return res.status(errors.errorConnection.code).json({
//             ok: false,
//             message: errors.errorConnection.message,
//           });
//         }
//         response = await permissionAny(id_user, connection);
//         if (response[0]) {
//           const response = await updateRecord(
//             { name },
//             table,
//             id_user,
//             connection
//           );
//           if (response[0]) {
//             const responseFiles = await uploadFilesBySong(
//               req.files,
//               id_organization,
//               id_song,
//               connection
//             );
//             console.log(responseFiles);
//           }
//         }
//         connection.release();
//         myConnection.end();
//         return res.status(response[1].code).json({
//           ok: response[0],
//           message: response[1].message,
//           data: response[2],
//         });
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(errors.errorServer.code).json({
//         ok: false,
//         message: errors.errorServer.message,
//       });
//     }
//   },


  changeStatusClient: async (req, res) => {
    try {
      id_cliente = req.id_cliente
      console.log( id_cliente, estatus );

      const myConnection = pool.connection(constants.DATABASE);
      myConnection.getConnection(async function (err, connection) {
        if (err) {
          console.log(err);
          return res.status(errors.errorConnection.code).json({
            ok: false,
            message: errors.errorConnection.message,
          });
        }
        response = await readAllRecord(
            `UPDATE ccamigos_congreso-musicos.ClientesRegistros SET estatus = '1' WHERE (id_cliente = ${id_cliente})`,
            connection
        );

       console.log(response);

        // response = await updateRecord(
        //   tables.tables.Organizations_Users.name,
        //   id_organization_user,
        //   connection
        // );
        
        console.log(response);
        connection.release();
        myConnection.end();

        return res.status(response[1].code).json({
          ok: response[0],
          message: response[1].message,
          data: response[2],
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(errors.errorServer.code).json({
        ok: false,
        message: errors.errorServer.message,
      });
    }
  },
};
