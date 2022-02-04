

export default {
  GET_GATEWAYS(state, gateways) {
    state.gateways = gateways;
  },

  /**
   * UPDATE STATE OF COMMUNICATION OF GATEWAYS
  */

  GATEWAY_STATUS(state, data) {
    let gateway = state.gateways.find(x => { return x._id == data._id });
    if (gateway) {
      gateway.status = data.status;
    }
  },

  /**
   * UPDATE DATA OF COUNTER 
   */
  DATA_UPDATE(state, infos) {
    let gateway = state.gateways.find(x => { return x._id == infos.gatewayId });
    if (gateway == undefined) return 0;
    let counter = gateway.counters.find(x => { return x.id == infos.counterId });
    if (counter == undefined) return 0;
    let data = counter.datas.find(x => { return x.id == infos._id });
    if (data == undefined) return 0;
    data.value = infos.data.value;
    data.date = infos.data.date;
    data.error = infos.data.error;
    if (gateway.name === "Poste P1" && counter.name == "Général poste 1"){
      state.powerP1 = counter.datas.filter(x => {
        return x.label.indexOf("Puissance") >= 0
      });
    }
    if (gateway.name === "Poste P2" && counter.name == "Général poste 2"){
      state.powerP2 = counter.datas.filter(x => {
        return x.label.indexOf("Puissance") >= 0
      });
    }
    if(counter.name == "Général poste 1" || counter.name == "Général poste 2"){
      let res = new Array();
      for (let data of state.powerP1) {
        let d = state.powerP2.find(x => { return x.label === data.label })
        if (d) {
            res.push({
                label: data.label,
                unity: data.unity,
                value: (Number(data.value) + Number(d.value)).toFixed(2)
            })
        } else continue;
      }
      state.powerSite = res
    }
  },

  /**
   * GET ALL GROUPS OF CONSOMMATION 
   */
  GET_GROUPS(state, groups) {
    state.groups = groups;
  },

  /**
   * GET  CONSOMMATION
   */
  GET_CONSOMATION(state, consomation) {
    let index = state.consomations.findIndex(x => { return x._id === consomation._id });
    if (index < 0) state.consomations.push(consomation);
    else state.consomations.splice(index, 1, consomation);
  },

  GET_CONSOMMATION(state, data) {
    state.datas = data
  },

  /**
   * GET ALL GROUPS OF CONSOMMATION 
   */
  GET_SITE_CONFIG(state, data) {
     state.configSite = data
  },
  

  GET_MAX_POWER(state, maxPower){
    state.maxPower = maxPower;
  },

  GET_LOGS(state, logs){
    state.logs = logs;
    state.logsByType = logs.filter(log => log.level_id === 2);
  },

  GET_MAILS(state, mails){
    state.mails = mails;
  },

  GET_REPORTS(state, reports){
    state.reports = reports;
  },

  SET_WINDOW_WIDTH(state, value) {
    state.windowWidth = value;
  },

  SET_WINDOW_HEIGHT(state, value) {
    state.windowHeight = value;
  },

  SET_SOCKETIO(state, socketio) {
    state.socketio = socketio;
  },

  SET_YEAR(state, value) {
    state.year = value;
  },

  DATA_LOADING(state, value){
    state.dataLoading = value;
  },

  INC_LOADING(state){
    state.loading++;
  },

  DEC_LOADING(state){
    state.loading--;
    if(state.loading < 0){
      state.loading=0;
    }
  },
  
  SET_USER(state, value) {
    state.user = value;
  },

}
