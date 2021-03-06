import axios from 'axios';
export function checkConnection() {
  return axios.get('/api/realtime/connected')
    .then(({data}) => {
      return data;
    })
}


let ws = null
const cbArray = [];

export function registerForUpdates(newDataCb) {
  if (!ws) {
    ws = new WebSocket(`ws://${location.host}/api/realtime/client`);
    ws.addEventListener('message', function (event) {
        console.log('New data');
        showNotificationAboutNewData();
        cbArray.forEach((cb) => cb());
    });
  }

  cbArray.push(newDataCb);
  return () => {
    var index = cbArray.indexOf(newDataCb);
    if (index > -1) {
      cbArray.splice(index, 1);
    }
  }
}

export function shouldRegisterForUpdates() {
  return window.isDynamic;
}

function showNotificationAboutNewData(){
  window.$.notify({
      icon: 'ti-alert',
      message: 'Новые данные поступили в систему и произошел пересчет состояния объекта.'

    },{
        type: 'warning',
        timer: 2000,
        placement: {
            from: 'top',
            align: 'center'
        }
    });

}