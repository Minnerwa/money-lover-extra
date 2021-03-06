import _ from 'lodash'
import moment from 'moment'

export default {
  cvsToData (vuex, text) {
    let data = []
    let keys = []
    text.split(`\n`).forEach((t, row) => {
      const rawData = t.split(`;`)
      if (row === 0) {
        /* Find Keys Object */
        keys = rawData.map(raw => _.camelCase(raw))
      } else if (rawData.length === 8) {
        let d = {}
        rawData.forEach((value, index) => {
          const key = keys[index]
          if (key === 'amount') {
            d[key] = parseFloat(value)
          } else if (key === 'date') {
            d[key] = value
            d.moment = moment(value, `DD/MM/YYYY`)
            d.day = d.moment.date()
            d.month = d.moment.month()
            d.year = d.moment.year()
            d.dateGroup = `${d.year}-${d.month}`
          } else {
            d[key] = value
          }
        })
        data.push(d)
      }
    })
    return data
  },

  setDataToLocal ({ state }, values) {
    window.localStorage.setItem(state.LOCAL_KEY_DATA, JSON.stringify(values))
  },
  setLastUploadToLocal ({ state }) {
    window.localStorage.setItem(state.LOCAL_KEY_UPDATE, JSON.stringify(moment()))
  }
}
