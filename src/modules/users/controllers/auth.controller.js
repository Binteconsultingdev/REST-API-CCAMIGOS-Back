const { generateJWT } = require("../../../common/helpers/jwt");
const pool = require("../../../common/database/config");
const {
  errors,
  success,
} = require("../../../common/helpers/constants/messages");
const constants = require("../../../common/helpers/constants/constants");
const { readAllRecord } = require("../../../common/helpers/functions");
const tables = require("../../../common/helpers/constants/tables");
const { validatePassword } = require("../common/functions");
module.exports = {
  login: async (req, res) => {
    try {
      const { correo, password } = req.body;
      console.log(correo, password);
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
          `SELECT * FROM Users WHERE  correo = '${correo}'`,
          connection
        );
        console.log(response);
        if (response[2].length > 0) {
         
          responseAux = await validatePassword(response[2][0], password);
          if (responseAux[0]) {
            response[2] = await generateJWT(response[2][0].id);
          } else {
            response[1] = errors.errorPassword;
            response[2] = "";
          }
        } else {
          response[1] = errors.errorEmail;
        }
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

  renewToken: async (req, res) => {
    try {
      const id_user = req.id_user;
      console.log(id_user);
      let response = 0;
      let responseAux = 0;
      let token = "";
      const myConnection = pool.connection(constants.DATABASE);
      myConnection.getConnection(async function (err, connection) {
        if (err) {
          return res.status(errors.errorConnection.code).json({
            ok: false,
            message: errors.errorConnection.message,
          });
        }
        response = await readAllRecord(
          `SELECT * FROM ${tables.tables.Users.name} WHERE  id = '${id_user}'`,
          connection
        );
        if (response[2].length > 0) {
          responseAux = await readAllRecord(
            `SELECT  ${tables.tables.Organizations.name}.*, ${tables.tables.Organizations_Users.name}.id as id_organization_user FROM ${tables.tables.Organizations_Users.name} INNER JOIN ${tables.tables.Organizations.name} ON ${tables.tables.Organizations.name}.id = ${tables.tables.Organizations_Users.name}.id_organization WHERE ${tables.tables.Organizations_Users.name}.id_status = 1 AND ${tables.tables.Organizations_Users.name}.id_user = ${response[2][0].id}`,
            connection
          );
          console.log(responseAux);
          response[2][0].organizations = responseAux[2];
          responseAux = await readAllRecord(
            `SELECT  ${tables.tables.Skills.name}.* FROM ${tables.tables.Users_Skills.name} INNER JOIN ${tables.tables.Skills.name} ON ${tables.tables.Skills.name}.id = ${tables.tables.Users_Skills.name}.id_skill WHERE ${tables.tables.Users_Skills.name}.id_status = 1 AND ${tables.tables.Users_Skills.name}.id_user = ${response[2][0].id}`,
            connection
          );
          response[2][0].skills = responseAux[2];
          if (response[2][0].organizations.length > 0) {
            response[2][0].id_organization_user =
              response[2][0].organizations[0].id_organization_user;
            response[2][0].id_organization = response[2][0].organizations[0].id;
          } else {
            response[2][0].id_organization_user = 0;
            response[2][0].id_organization = 0;
          }
          token = await generateJWT(response[2][0].id);
        } else {
          response[1] = errors.errorNotFound;
        }
        connection.release();
        myConnection.end();
        console.log(response);
        return res.status(response[1].code).json({
          ok: response[0],
          message: response[1].message,
          data: response[2][0],
          token,
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
