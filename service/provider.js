import HttpRequest from './http_request'

class Provider extends HttpRequest {
  constructor () {
    super()
    this.text_success = 'Successfully'
    this.text_fail = 'Failure'
  }

    //OK
    //Check Type User Login
    async checkUserLogin(email) {
        let email_api = ""+email
        return await this.get('/userLogin/'+email_api).then(request => {
            return request.data
        }).catch((err)=>{
            //console.log("No => ",err);
            return null
        })
    }

    //OK
    //Add Leave Request 
    async addFormLeaveRequest(opj_form) {
        let dataReturn = {
            status : false,
            text : ''
        }
        return await this.create('/addLeaveRequest',opj_form).then(request => {
            if(request.data === true){
                dataReturn.status = true
                dataReturn.text = 'ดำเนินการสำเร็จ'
                return dataReturn
            }else{
                dataReturn.text = 'Server เกิดข้อผิดพลาด'
                return dataReturn
            }
        }).catch((err)=>{
            dataReturn.status = null
            dataReturn.text = 'การเชื่อมต่อผิดพลาด'
            return dataReturn
        })
    }

    //OK
    //Query All Leave Request For Super Admin
    async getLeaveRequestForSuperAdmin(id) {
        return await this.create('/allLeaveRequestNotApprove', id).then(request => {
            //console.log("YES => ",request.data);
            return request.data
        }).catch((err)=>{
            //console.log("No => ",err);
            return null
        })
    }

    //OK
    //Query All Leave Request For Admin
    async getLeaveRequestForAdmin(id) {
        return await this.create('/leaveRequestForAdmin',id).then(request => {
            //console.log("YES => ",request.data);
            return request.data
        }).catch((err)=>{
            //console.log("No => ",err);
            return null
        })
    }

    //OK
    //Check Special holiday by user id
    async checkSpecialholiday(userId) {
        let model = {userid : ''+userId}
        return await this.create('/specialHolidayById',model).then(request => {
            //console.log("RESULT => ", request.data[0])
            return request.data
        }).catch((err)=>{
            //console.log("ERROR => ",err)
            return null
        })
    }

    //OK
    //Query Data User For Form Request
    async getUserFormRequest(userId) {
        return await this.get('/queryDayLeft/'+userId).then(request => {
            //console.log("RESULT => ", request.data[0])
            return request.data
        }).catch((err)=>{
            //console.log("ERROR => ",err)
            return null
        })
    }

    //OK
    //Query All Weekend Company
    async getAllWeekendCompany() {
        return await this.get('/allWeekend').then(request => {
            //console.log("YES => ",request.data);
            return request.data
        }).catch((err)=>{
            //console.log("No => ",err);
            return null
        })
    }

    //OK
    //Query All Day Off Company
    async getAllDayoffCompany() {
        return await this.get('/queryAllDayOff').then(request => {
            //console.log("YES => ",request.data);
            return request.data
        }).catch((err)=>{
            //console.log("No => ",err);
            return null
        })
    }

    //OK
    //Query eventcalendar
    async getEventCelendar() {
        return await this.get('/queryforcalendar').then(request => {
            //console.log("YES => ",request.data);
            return request.data
        }).catch((err)=>{
            //console.log("No => ",err);
            return null
        })
    }

    //OK
    //Query Config Day
    async getConfigDay() {
        return await this.get('/configday').then(request => {
            //console.log("YES => ",request.data);
            return request.data
        }).catch((err)=>{
            //console.log("No => ",err);
            return null
        })
    }

    //OK
    //Query searchhistory
    async getSearchHistory(data) {
        return await this.create('/historyallbymonth',data).then(request => {
            //console.log("YES => ",request.data);
            return request.data
        }).catch((err)=>{
            //console.log("No => ",err);
            return null
        })
    }

    //OK
    //Query Leave By User Id
    async getHistoryLeaveByUserId(userId) {
        return await this.get('/historyallbyid/'+userId).then(request => {
            //console.log("YES => ",request.data);
            return request.data
        }).catch((err)=>{
            //console.log("No => ",err);
            return null
        })
    }
     
    //OK
    //Update Leave Reauest
    async updateLeaveRequest(rowId,adminId) {
        let dataReturn = {
            status : false,
            text : ''
        }
        return await this.get('/updateLeaveRequest/'+rowId+'/'+adminId).then(request => {
            if(request.data.status){
                dataReturn.status = true
                dataReturn.text = 'Approve Successfully'
                return dataReturn
            }else{
                switch(request.data.description){
                    case 'not_found' : 
                        dataReturn.text = 'Can not approve because other Admin or Super admin has been rejected!'
                        break;
                    case 'approved' : 
                        dataReturn.text = 'Can not approve because other Admin or Super admin has been approved!'
                        break;
                    case 'system_error' : 
                        dataReturn.text = 'System error please try agian!'
                        break;
                }
                return dataReturn
            }
        }).catch((err)=>{
            dataReturn.text = 'Connection error'
            return dataReturn
        })
    }

    //OK
    //Remove Leave Request
    async removeLeaveRequest(rowId,adminId) {
        let dataReturn = {
            status : false,
            text : ''
        }
        return await this.get('/removeLeaveRequest/'+rowId+'/'+ adminId).then(request => {
            if(request.data.status){
                dataReturn.status = true
                dataReturn.text = 'Reject Successfully'
                return dataReturn
            }else{
                switch(request.data.description){
                    case 'not_found' : 
                        dataReturn.text = 'Can not reject because Data not found!'
                        break;
                    case 'approved' : 
                        dataReturn.text = 'Can not reject because other Admin or Super admin has been approved!'
                        break;
                    case 'system_error' : 
                        dataReturn.text = 'System error please try agian!'
                        break;
                }
                return dataReturn
            }
        }).catch((err)=>{
            dataReturn.text = 'Connection error'
            return dataReturn
        })
    }
}

export default Provider
