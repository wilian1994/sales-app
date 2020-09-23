const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const cors = require("cors")({ origin: true });
admin.initializeApp();
const db = admin.firestore();
// const request = require("request");
const key =
  "fa36d64ae155e42a638d9a128cf698afc671a42013ee3c6e3341e50fbae34c4368513afe";
var FormData = require("form-data");
var data = new FormData();

// teste();
// function teste() {

// }

exports.createUser = functions.firestore
  .document("finalized/{Id}")
  .onCreate(async (snap, context) => {
    var dataReturned = snap.data();
    data.append("apikey", key);
    data.append(
      "xml",
      '<?xml version="1.0" encoding="UTF-8"?>\n    <pedido>\n        <idSituacao>9</idSituacao>\n    </pedido>'
    );

    var config = {
      method: "put",
      url: `https://bling.com.br/Api/v2/pedido/${dataReturned.id}/json/`,
      headers: {
        apikey: key,
        ...data.getHeaders()
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  });

exports.scheduledFunction = functions.pubsub
  .schedule("every day 00:00")
  .onRun(context => {
    return cors(req, res, async () => {
      // <------ RETURN NEEDED HERE
      if (req.method !== "GET") {
        return res.status(401).json({
          message: "Not allowed"
        });
      }

      try {
        let isPage = true;
        var produtos = [];
        for (let index = 0; index < 10000; index++) {
          const getProdutos = await axios.get(
            `https://bling.com.br/Api/v2/produtos/page=${index}/json/&apikey=${key}`
          );
          const retorno = getProdutos.data.retorno;
          if (retorno.erros) {
            break;
          }
          const produto = retorno.produtos;
          produtos = produtos.concat(produto);
        }
        if (produtos.length > 0) {
          let productTable = await db.collection("products");
          var records = [];
          produtos.forEach(async element => {
            const produto = element.produto;
            let record = {};
            record["descricao"] = produto.descricao;
            record["id"] = produto.codigo !== "" ? produto.codigo : produto.id;
            records.push(record);
          });
          await Promise.all(
            records.map(data =>
              productTable.doc(data.id).set(data, { merge: true })
            )
          );
        }

        res.send(produtos);
        //   return batch.commit().then(function () {
        //     res.send(produtos);
        //   });
      } catch (error) {
        return res.status(401).json({
          message: error
        });
      }

      try {
        var pedidos = [];
        functions.logger.log("init try");
        for (let index = 0; index < 10000; index++) {
          const url = `https://bling.com.br/Api/v2/pedidos/page=${index}/json/&filters=idSituacao[6]&apikey=${key}`;
          functions.logger.info("url here:", url);
          functions.logger.log("url here:", url);
          var getPedidos = await axios.get(url);
          functions.logger.log("passou da bling");

          var retorno = getPedidos.data.retorno;
          if (retorno.erros) {
            break;
          }
          functions.logger.log("passou ", retorno);
          var pedido = retorno.pedidos;
          pedidos = pedidos.concat(pedido);
        }
        functions.logger.log("final for", pedidos);
        if (pedidos.length > 0) {
          let productTable = await db.collection("products");
          var records = [];
          var orders = [];
          pedidos.forEach(element => {
            const pedido = element.pedido;
            pedido.itens.forEach(el => {
              const item = el.item;
              let record = {};
              if (item.codigo !== "" && item.codigo != null) {
                record["saleDate"] = pedido.data;
                record["id"] = item.codigo;
                record["productCost"] = item.precocusto;
                records.push(record);
              }
            });
            let order = {};
            order["id"] = pedido.numero;
            order["observation"] = pedido.observacoes;
            order["data"] = pedido.data;
            order["total"] = pedido.totalprodutos;

            order["itens"] = pedido.itens;
            orders.push(order);
          });

          await Promise.all(
            records.map(data => {
              functions.logger.log("recordData ", data);
              return productTable.doc(data.id).set(data, { merge: true });
            })
          );

          await Promise.all(
            orders.map(data =>
              db.collection("orders").doc(data.id).set(data, { merge: true })
            )
          );
        }
        // let productTable = await db.collection("products");
        // var records = [];
        // produtos.forEach(async element => {
        //   const produto = element.produto;
        //   let record = {};
        //   record["descricao"] = produto.descricao;
        //   record["id"] = produto.id;
        //   records.push(record);
        // });
        // await Promise.all(
        //   records.map(data => productTable.doc(data.id).set(data))
        // );
        res.send(pedidos);
        //   return batch.commit().then(function () {
        //     res.send(produtos);
        //   });
      } catch (error) {
        functions.logger.error("error ", error);
        return res.status(401).json({
          message: error
        });
      }
    });
  });

exports.getProdutos = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    // <------ RETURN NEEDED HERE
    if (req.method !== "GET") {
      return res.status(401).json({
        message: "Not allowed"
      });
    }

    try {
      let isPage = true;
      var produtos = [];
      for (let index = 0; index < 10000; index++) {
        const getProdutos = await axios.get(
          `https://bling.com.br/Api/v2/produtos/page=${index}/json/&apikey=${key}`
        );
        const retorno = getProdutos.data.retorno;
        if (retorno.erros) {
          break;
        }
        const produto = retorno.produtos;
        produtos = produtos.concat(produto);
      }
      if (produtos.length > 0) {
        let productTable = await db.collection("products");
        var records = [];
        produtos.forEach(async element => {
          const produto = element.produto;
          let record = {};
          record["descricao"] = produto.descricao;
          record["id"] = produto.codigo !== "" ? produto.codigo : produto.id;
          records.push(record);
        });
        await Promise.all(
          records.map(data =>
            productTable.doc(data.id).set(data, { merge: true })
          )
        );
      }

      res.send(produtos);
      //   return batch.commit().then(function () {
      //     res.send(produtos);
      //   });
    } catch (error) {
      return res.status(401).json({
        message: error
      });
    }
  });
});

exports.getPedidos = functions.https.onRequest(async (req, res) => {
  functions.logger.log("init getPedidos");
  return cors(req, res, async () => {
    // <------ RETURN NEEDED HERE
    if (req.method !== "GET") {
      return res.status(401).json({
        message: "Not allowed"
      });
    }

    try {
      var pedidos = [];
      functions.logger.log("init try");
      for (let index = 0; index < 10000; index++) {
        const url = `https://bling.com.br/Api/v2/pedidos/page=${index}/json/&filters=idSituacao[6]&apikey=${key}`;
        functions.logger.info("url here:", url);
        functions.logger.log("url here:", url);
        var getPedidos = await axios.get(url);
        functions.logger.log("passou da bling");

        var retorno = getPedidos.data.retorno;
        if (retorno.erros) {
          break;
        }
        functions.logger.log("passou ", retorno);
        var pedido = retorno.pedidos;
        pedidos = pedidos.concat(pedido);
      }
      functions.logger.log("final for", pedidos);
      if (pedidos.length > 0) {
        let productTable = await db.collection("products");
        var records = [];
        var orders = [];
        pedidos.forEach(element => {
          const pedido = element.pedido;
          pedido.itens.forEach(el => {
            const item = el.item;
            let record = {};
            if (item.codigo !== "" && item.codigo != null) {
              record["saleDate"] = pedido.data;
              record["id"] = item.codigo;
              record["productCost"] = item.precocusto;
              records.push(record);
            }
          });
          let order = {};
          order["id"] = pedido.numero;
          order["observation"] = pedido.observacoes;
          order["data"] = pedido.data;
          order["total"] = pedido.totalprodutos;

          order["itens"] = pedido.itens;
          orders.push(order);
        });

        await Promise.all(
          records.map(data => {
            functions.logger.log("recordData ", data);
            return productTable.doc(data.id).set(data, { merge: true });
          })
        );

        await Promise.all(
          orders.map(data =>
            db.collection("orders").doc(data.id).set(data, { merge: true })
          )
        );
      }
      // let productTable = await db.collection("products");
      // var records = [];
      // produtos.forEach(async element => {
      //   const produto = element.produto;
      //   let record = {};
      //   record["descricao"] = produto.descricao;
      //   record["id"] = produto.id;
      //   records.push(record);
      // });
      // await Promise.all(
      //   records.map(data => productTable.doc(data.id).set(data))
      // );
      res.send(pedidos);
      //   return batch.commit().then(function () {
      //     res.send(produtos);
      //   });
    } catch (error) {
      functions.logger.error("error ", error);
      return res.status(401).json({
        message: error
      });
    }
  });

  function createOrder(data) {
    let record = {};
    record["id"] = data.numero;
    record["observation"] = data.observacoes;
    record["data"] = data.data;
    record["produto"] = data.totalprodutos;
    record["itens"] = data.itens;
    return record;
  }
});
