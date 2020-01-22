<template>
    <div class="card-wrapper">
        <div class="box-type-name centent_between">
            <div 
                class="type-user content_center"
                v-bind:class="{position_full_time: statusUser, position_intern: !statusUser}"
            >
                {{createTypeUser(statusUser)}}
            </div>
            <div v-if="statusUser" class="icon-company centent_right">
                <img src="~/assets/logo.jpg">
            </div>
        </div>
        <div class="box-content-show">
            <div
                class="box-name-user content_center"
                v-bind:class="{color_fulltime: statusUser, color_intern: !statusUser}"
            >
                {{datashow.name}}
            </div>
            <div
                class="box-date content_center"
                v-bind:class="{color_fulltime: statusUser, color_intern: !statusUser}"
            >
                {{datashow.startDate}} - {{datashow.endDate}}
            </div>
            <div 
                class="box-detail content_center"
                v-bind:class="{color_detail_fulltime: statusUser, color_detail_intern: !statusUser}"
            >
                {{datashow.detail}}
            </div>
            <div class="box-icon-popup content_center">
                <button type="button">
                    <i class="material-icons">more_horiz</i>
                </button>
            </div>
        </div>
        <div class="box-btn centent_between">
            <div class="box-btn-cancel">
                <button type="button" @click="actionLeave(false,indexData)">REJECT</button>
            </div>
            <div class="box-btn-confirm">
                <button type="button" @click="actionLeave(true,indexData)">APPROVE</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['statusUser','datashow','indexData'],
    methods:{
        createTypeUser(type){
            if(type === true){
                return 'Employee'
            }else{
                return 'Intern'
            }
        },
        actionLeave(status,index){
            let model = {
                title_popup_confirm: '',
                status_select: '',
                index_data: index
            }
            if(status){
                model.title_popup_confirm = 'Are you sure to APPROVE?'
                model.status_select = 'APPROVE'
            }else{
                model.title_popup_confirm = 'Are you sure to REJECT?'
                model.status_select = 'REJECT'
            }
            this.$emit('clickBtnCard',model)
        },
    }
}
</script>

<style lang="scss" scoped>

$heightFull: 100%;
$widthFull: 100%;
$radius: 20px;
$color_blue : #0f4c81;
$color_red : #dd3333;
$color_green : #2d810f;

.card-wrapper{
    height: $heightFull;
    width: $widthFull;
    background-color: #fff;
    border-radius: 10px;
    padding-top: 5%;

    .box-type-name{
        height: 12%;
        .type-user{
            min-width: 30%;
            max-width: fit-content;
            height: 100%;
            border-top-right-radius: $radius;
            border-bottom-right-radius: $radius;
            padding: 0px 20px 0px 15px;
            font-size: 14px;
            font-weight: 400;
        }

        .icon-company{
            height: 100%;
            padding-right: 10px;
            img{
                height: 100%;
                width: auto;
                border-radius: 50%;
            }
        }
    }

    .box-content-show{
        height: 68%;
        padding: 0px 10px;

        .box-name-user, .box-date, .box-detail{
            height: 25%;
            font-weight: 400;
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis; 
        }

        .box-icon-popup{
            height: 25%;
            button{
                outline: none;
                background-color: transparent;
                border: none;
            }
            button:hover{
               opacity: 0.5;
            }
        }
    }

    .box-btn{
        height: 20%;

        .box-btn-confirm, .box-btn-cancel{
            height: 100%;
            width: 49.8%;
            button{
                height: 100%;
                width: 100%;
                border: none;
            }
        }

        .box-btn-cancel{
            button{
                border-bottom-left-radius: 10px;
                color: $color_red;
                background-color: #fff;
            }
            button:hover{
                background-color: rgba(221, 51, 51,0.2);
            }
        }
        .box-btn-confirm{
            button{
                border-bottom-right-radius: 10px;
                background-color: $color_green;
                color: #fff;
            }
            button:hover{
                background-color: rgba(45, 129, 15,0.5);
                color: $color_green;
            }
        }
    }
}

/*---------- Style For Intern ----------*/
.position_intern{
    color: #000;
    border: 1px solid #000;
    border-left: none;
}
.position_full_time{
    background-color: $color_blue; 
    color: #fff;
}

.color_fulltime{
    color: $color_blue;
}

.color_intern{
    color: #000;
}

.color_detail_fulltime{
    color: rgba(15, 76, 129, 0.8);
}

.color_detail_intern{
    color:rgba(0, 0, 0, 0.6);
}
</style>