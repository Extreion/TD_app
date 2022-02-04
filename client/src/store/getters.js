import state from "./state";

// https://vuex.vuejs.org/en/getters.html

export default {
    nbrGateways(state) {
        return state.gateways.length
    },

    nbrGatewaysError(state) {
        return state.gateways.filter(x => { return x.status == "closed" && x.enable }).length;
    },

    nbrGatewaysDisabled() {
        return state.gateways.filter(x => { return !x.enable }).length
    },

    nbrCounters(state) {
        let counters = state.gateways.map(x => { return x.counters.length })
        if (counters.length > 0) {
            return counters.reduce((total, x) => { return total + x })
        }
        return 0
    },

    // powerPoste1(state) {
    //     let gateway, counter;
    //     gateway = state.gateways.find(x => { return x.name === "Poste P1" })
    //     if (gateway) {
    //         counter = gateway.counters.find(x => { return x.name == "Général poste 1" })
    //         if (counter) {
    //             return counter.datas.filter(x => {
    //                 return x.label.indexOf("Puissance") >= 0
    //             });
    //         }
    //     }
    //     return []
    // },

    // powerPoste2(state) {
    //     let gateway, counter;
    //     gateway = state.gateways.find(x => { return x.name === "Poste P2" })
    //     if (gateway) {
    //         counter = gateway.counters.find(x => { return x.name == "Général poste 2" })
    //         if (counter) {
    //             return counter.datas.filter(x => {
    //                 return x.label.indexOf("Puissance") >= 0
    //             });
    //         }
    //     }
    //     return []
    // },

    // powerSite(state) {
    //     let res = new Array();
    //     let powerPoste1 = [], powerPoste2 = [];
    //     let gateway, counter;
    //     //poste 1
    //     gateway = state.gateways.find(x => { return x.name === "Poste P1" })
    //     if (gateway) {
    //         counter = gateway.counters.find(x => { return x.name == "Général poste 1" })
    //         if (counter) {
    //             powerPoste1 = counter.datas.filter(x => {
    //                 return x.label.indexOf("Puissance") >= 0
    //             });
    //         }
    //     }


    //     //poste 2
    //     gateway = state.gateways.find(x => { return x.name === "Poste P2" })
    //     if (gateway) {
    //         counter = gateway.counters.find(x => { return x.name == "Général poste 2" })
    //         if (counter) {
    //             powerPoste2 = counter.datas.filter(x => {
    //                 return x.label.indexOf("Puissance") >= 0
    //             });
    //         }
    //     }

    //     for (let data of powerPoste1) {
    //         let d = powerPoste2.find(x => { return x.label === data.label })
    //         if (d) {
    //             res.push({
    //                 label: data.label,
    //                 unity: data.unity,
    //                 value: (Number(data.value) + Number(d.value)).toFixed(2)
    //             })
    //         } else continue;
    //     }

    //     return res;
    // },

    socketio_status(state) {
        if (state.socketio) {
            return state.socketio.connected
        }
        return false;
    },

    isLoading(state){
        return (state.loading > 0 ? true : false)
    },

    dataIsLoading(state){
        return state.dataLoading
    }
}
