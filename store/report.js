export const state = {
    list_leave : [
        {
          userId: "AD5555",
          nameUser: "Natcha",
          listLeave: [
            {
              date: "2020-02-01",
              statusMorning: false,
              statusAfternoon: true
            }
          ]
        },
        {
          userId: "AD7777",
          nameUser: "UserTest",
          listLeave: [
            {
              date: "2020-02-07",
              statusMorning: false,
              statusAfternoon: true
            },
            {
              date: "2020-02-15",
              statusMorning: true,
              statusAfternoon: true
            },
            {
              date: "2020-01-25",
              statusMorning: true,
              statusAfternoon: true
            }
          ]
        }
    ]
}

export const mutations = {    
    setLeaveReport(state , payload){
      state.list_leave = payload
    }
}

export const actions = {}

export const getters = {}




[
    {
      "userId": "AD7777",
      "name": "UserTest",
      "date": "2020-02-20",
      "statusMorning": true,
      "statusAfternoon": true
    },
    {
      "userId": "AD7777",
      "name": "UserTest",
      "date": "2020-01-27",
      "statusMorning": false,
      "statusAfternoon": true
    },
    {
      "userId": "AD7777",
      "name": "UserTest",
      "date": "2020-01-28",
      "statusMorning": true,
      "statusAfternoon": true
    },
    {
      "userId": "AD7777",
      "name": "UserTest",
      "date": "2020-01-29",
      "statusMorning": true,
      "statusAfternoon": true
    },
    {
      "userId": "AD7777",
      "name": "UserTest",
      "date": "2020-01-30",
      "statusMorning": true,
      "statusAfternoon": true
    },
    {
      "userId": "AD7777",
      "name": "UserTest",
      "date": "2020-01-31",
      "statusMorning": true,
      "statusAfternoon": true
    },
    {
      "userId": "AD7777",
      "name": "UserTest",
      "date": "2020-02-01",
      "statusMorning": true,
      "statusAfternoon": true
    },
    {
      "userId": "AD7777",
      "name": "UserTest",
      "date": "2020-02-02",
      "statusMorning": true,
      "statusAfternoon": false
    },
    {
      "userId": "AD7777",
      "name": "UserTest",
      "date": "2020-02-28",
      "statusMorning": true,
      "statusAfternoon": true
    },
    {
      "userId": "AD5555",
      "name": "Natcha",
      "date": "2020-02-12",
      "statusMorning": false,
      "statusAfternoon": true
    }
  ]