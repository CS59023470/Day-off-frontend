<template>
    <div class="menu">
        <div class="user">
            <div class="employee">
                <div class="employee_img">
                    <img :src="dataUser.img">
                </div>
                <div class="employee_text">
                    <label class="user_status">{{dataUser.status}}</label>
                    <label class="user_name">{{dataUser.name}}</label>
                    <label class="user_position">{{dataUser.position}} For Artisan Digital</label>
                </div>
            </div>
        </div>
        <div class="group_menu">
            <ul>
                <li  v-for="(menu, index) in getListMenu" :key="index" >
                    <div v-if="menu.status" class="box-content-manu is_active">
                        <div class="menu-icon flex-center">
                            <i class="material-icons">{{menu.icon}}</i>
                        </div>
                        <div class="menu-text flex-center-left">
                            <button type="button" class="btnMenu">{{menu.text}}</button>
                        </div>
                    </div>
                    <div v-else class="box-content-manu">
                        <div class="menu-icon flex-center">
                            <i class="material-icons">{{menu.icon}}</i>
                        </div>
                        <div class="menu-text flex-center-left">
                            <button type="button" class="btnMenu" @click="topage(index,menu.path)">{{menu.text}}</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {    
    data(){
        return{
            dataUser: {
                name: '',
                email: '',
                img: '',
                status: '',
                position: ''
            }
        }
    },
    mounted(){
         let dataLogin = JSON.parse(localStorage.getItem('userprofile'))
         this.dataUser.name = dataLogin.name
         this.dataUser.email = dataLogin.email
         this.dataUser.img = dataLogin.img
         this.dataUser.position = dataLogin.position         
    },
    methods:{
        topage(i,pathselect){
            let model = {
                index : i,
                path : this.pathDefult
            }
            this.$store.commit('menu/setStatusSelect',model)
            this.$router.push(this.pathDefult+pathselect)
            this.$emit('close',true)
        }
    },
    computed:{
        ...mapState({ pathDefult: state => state.pathDefult.path }),
        ...mapState({ pathSelect: state => state.menu.pathSelect }),
        getListMenu(){
            switch(this.pathDefult){
                case '/superadmin/' : return this.$store.state.menu.manuSuperAdmin
                case '/admin/' : return this.$store.state.menu.manuAdmin
                case '/employee/' : return this.$store.state.menu.manuEmployee
                case '/intern/' : return this.$store.state.menu.manuIntern
                default: break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.is_active{
    background-color: #cfdbe6;
    i , a { color: #0f4c81;}
    .btnMenu{ color: #0f4c81; }
}


.flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
}

.flex-center-left{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.menu{
    width: 100%;
    height: 100%;
    border: none;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-right: 2px solid #00294d;

        .user{
            height: fit-content;
    
            .employee{
                width: 100%;
                height: 100%;
                display: flex;
                background-color: #00294d;
                padding: 15px 10px;
                color: #fff;

                .employee_img{
                    height: 100%;
                    width: 25%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    img{
                        width: 65px;
                        height: 65px;
                        border-radius: 50%;
                    }
                }

                .employee_text{
                    height: 100%;
                    width: 75%;
                    display: flex;
                    flex-direction: column;
                    padding-left: 15px;

                    .user_status{
                        font-size: 18px;
                        font-weight: 400;
                        color: #fff;
                    }
                    .user_name{
                        font-size: 12px;
                        font-weight: 300;
                    }
                    .user_position{
                        font-size: 12px;
                        font-weight: 300;
                    }
                }
            }
        }

        .group_menu{
            width: 100%;
            color: #666;

            ul{
                width: 100%;
                list-style-type:none;
                padding: 0px;

                li{
                    height: 50px;
                    .box-content-manu{
                        display: flex;
                        height: 100%;
                        .menu-icon{
                            width: 25%;
                            height: 100%;
                        }
                        .menu-text{
                            width: 75%;
                            height: 100%;    
                            
                            .btnMenu{
                                background: transparent;
                                width: 100%;
                                height: 100%;
                                border: none;
                                outline: none;
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                font-size: 15px;
                            }
                        }
                    }
                }
            }
        } 
}


.test{
    background-color: red;
}
.index{
    background-color: #0F4C81;
}
    
</style>
