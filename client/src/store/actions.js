import axios from "axios";
import io from "socket.io-client";
import { throws } from "assert";


let URL = "http://172.19.181.156:4545/";
//let URL = "http://PA133237:4545/";
//let URL = "http://192.168.135.129:4545/";
export default {
  /**
   * real communicationwith socketio
   */
  connect_socketio(context) {
    const socketio = io(URL);
    socketio.on("connect", () => {
      console.log(
        "Connexion TR établie;  ID de la connexion",
        socketio.id,
        "Etat de la connexion :",
        socketio.connected
      );
      context.commit("SET_SOCKETIO", socketio);
    });
    socketio.on("error", (err) => () => {
      console.log(
        "Connexion TR erreur ID de la connexion ",
        socketio.id,
        " état de la connexion ",
        socketio.connected
      );
    });
    socketio.on("gateway_status", (data) => {
      context.commit("GATEWAY_STATUS", data);
    });
    socketio.on("data_update", (infos) => {
      context.commit("DATA_UPDATE", infos);
    });
    socketio.on("log_update", (data) => {
      if(data.update){
        context.dispatch('get_logs', {Id: '0'});
      }
    });
  },

  /**
   * Get all gateways from the API
   */
  get_gateways(context) {
    axios
      //.get(URL.concat("runtime/get-gateways"))
      .get(URL.concat('api/data/site-config'))
      .then((res) => {
        context.commit("GET_GATEWAYS", res.data);
      })
      .catch((err) => throws(err));
  },

  /**
   * Consomations actions
   */
  get_all_groups(context) {
    axios
      .get(URL.concat("consommations/get-all-groups"))
      .then((res) => {
        context.commit("GET_GROUPS", res.data);
      })
      .catch((err) => throws(err));
  },

  /**
   * Configuration du site (unifilaire)
   */
   get_site_config(context) {
    axios.get(URL.concat('api/data/unifilaire-config'))
      .then(res => { context.commit("GET_SITE_CONFIG", res.data) })
      .catch(err => throws(err));
  },


  get_consomation(context, infos) {
    context.commit("INC_LOADING");
    axios
      .post(URL.concat("consommations/get-consommation-year"), infos)
      .then((res) => {
        context.commit("DEC_LOADING");
        context.commit("GET_CONSOMATION", res.data);
      })
      .catch((err) => {
        context.commit("DEC_LOADING");
        throws(err);
      });
  },

  get_data_consommation(context, params) {
    context.commit("DATA_LOADING", true);
    context.commit("GET_CONSOMMATION", undefined)
    axios
      .get(URL.concat('api/data/consommation'), { params: params })
      .then(res => {
        context.commit("GET_CONSOMMATION", res.data)
        context.commit("DATA_LOADING", false); 
      })
      .catch(err => throws(err));
  },

  get_counter_data_consommation(context, params) {
    context.commit("DATA_LOADING", true);
    context.commit("GET_CONSOMMATION", undefined)
    axios.get(URL.concat('api/data/compteur-consommation'), { params: params })
      .then(res => {
        context.commit("GET_CONSOMMATION", res.data)
        context.commit("DATA_LOADING", false); 
      })
      .catch(err => throws(err));
  },

  /**
   * windows width
   */
  set_windows_width(context, value) {
    context.commit("SET_WINDOW_WIDTH", value);
  },

  /**
   * windows height
   */
  set_windows_height(context, value) {
    context.commit("SET_WINDOW_HEIGHT", value);
  },

  set_year(context, value) {
    context.commit("SET_YEAR", value);
  },

  login(context, value) {
    return new Promise((resolve, reject) => {
      axios
      .post(URL.concat("api/user/login"), value)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("jwtToken", res.data.token);
          context.commit("SET_USER", res.data.user);
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });

    })
    
  },

  get_max_power(context, params){
    axios
      .post(URL.concat("api/maxPower"), params)
      .then((res) => {
        context.commit('GET_MAX_POWER', res.data)
      })
      .catch(function (error){
        console.log(new Date().toLocaleString('fr-FR') + " - Erreur lors de la récupération des valeurs puissances max - " + error);
      });
  },

  get_logs(context, params){
    axios
      .post(URL.concat("api/logs/getType"), params)
      .then((res) => {
        context.commit('GET_LOGS', res.data)
      })
      .catch(function (error){
        console.log(new Date().toLocaleString('fr-FR') + " - Erreur lors de la récupération des logs - " + error);
      });
  },

  ack_log(context, params){
    axios
      .post(URL.concat("api/logs/ackLog"), params)
      .then((res) => {
        context.dispatch('get_logs', {Id: '0'});
      })
      .catch(function (error){
        console.log(new Date().toLocaleString('fr-FR') + " - Erreur lors de l'acquittement d'un log - " + error);
      });
  },

  get_template(context, params){
    context.commit("DATA_LOADING", true);
    axios({
      method: 'get',
      url: URL.concat("api/report/download-exceltemplate"),
      params: params,
      responseType: "arraybuffer"
    })
      .then((res) => {
        //Mécanique permettant de télécharger un fichier côté client
        var blob = new Blob([res.data]);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = params.filename;
        link.click();
        context.commit("DATA_LOADING", false);
      })
      .catch(function (error){
        console.log(new Date().toLocaleString('fr-FR') + " - Erreur lors de la récupération du template - " + error);
      });
  },

  get_report(context, params){
    context.commit("DATA_LOADING", true);
    axios({
      method: 'get',
      url: URL.concat("api/report/download"),
      params: params,
      responseType: "blob"
    })
      .then((res) => {
        //Mécanique permettant de télécharger un fichier côté client
        var blob = new Blob([res.data], {type: res.data.type});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = res.headers['x-suggested-filename'];
        link.click();
        context.commit("DATA_LOADING", false);
        context.dispatch('get_reports')
      })
      .catch(function (error){
        console.log(new Date().toLocaleString('fr-FR') + " - Erreur lors de la récupération d'un rapport - " + error);
      });
  },

  get_reports(context, params){
    context.commit("DATA_LOADING", true);
    axios
      .get(URL.concat("api/report/get"))
      .then((res) => {
        context.commit('GET_REPORTS', res.data)
        context.commit("DATA_LOADING", false);
      })
      .catch(function (error){
        console.log(new Date().toLocaleString('fr-FR') + " - Erreur lors de la récupération de la liste des rapports - " + error);
      });
  },
  
  set_report_frequency(context, params) {
    axios
      .get(URL.concat('api/report/updatefrequency'), { params: params })
      .then((res) => {
        context.dispatch('get_reports')
      })
      .catch(err => throws(err));
  },

  get_mails(context,params){
    axios
      .get(URL.concat('api/mail/get'))
      .then((res) => {
        context.commit('GET_MAILS',res.data);
      })
      .catch(function (error){
        console.log(new Date().toLocaleString('fr-FR') + " - Erreur lors de la récupération des mails - " + error);
      })
  },

  add_mail(context,params){
    axios
      .post(URL.concat('api/mail/add'), params)
      .then((res) =>{
        context.dispatch('get_mails')
      })
      .catch(err => throws(err));
  },

  delete_mail(context,params){
    axios
      .post(URL.concat('api/mail/delete'), params)
      .then((res) =>{
        context.dispatch('get_mails')
      })
      .catch(err => throws(err));
  }
  
};
