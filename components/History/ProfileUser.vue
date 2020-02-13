<template>
    <div 
        class="layout_profile_wrapper"
        v-bind:class="{intern: status === 'internship', employee: status !== 'internship'}"
    >
        <div class="layout_img_user content_center">
            <img :src="user.img" alt="user">
        </div>
        <div class="layout_data_user">
            <div>
                <div class="layout_name_type">
                    <div class="name_user">
                        {{user.name}}
                    </div>
                    <div
                        v-if="status !== 'internship'"
                        class="type_user content_center"
                    >
                        Employee
                    </div>
                     <div
                        v-else
                        class="type_user content_center"
                    >
                        Internship
                    </div>
                </div>
                <div class="layout_email_user">
                    {{user.email}}
                </div>
            </div>
            <div class="layout_data_leave">
                {{total}} Leave requests in {{year}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["year","status","user","total"],
}
</script>
<style lang="scss" scoped>
.layout_profile_wrapper{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin: 0px 12%;
    display: flex;
    padding: 10px;
    .layout_img_user{
        width: 25%;
        height: 100%;
        img{
            width: 70px;
            height: 70px;
            border-radius: 50%;
        }
    }
    .layout_data_user{
        width: 75%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .layout_name_type{
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            .type_user{
                padding: 0px 15px;
               
                border-radius: 5px;
                font-size: 10px;
                font-weight: 200;
            }
        }
        .layout_email_user, .layout_data_leave{
            font-size: 12px;
            font-weight: 200;
        }
    }
}
.employee{
    background-color: #0F4C81;
    color: #fff;
    .layout_data_user{
        .layout_name_type{
            .type_user{
                border: 1px solid #fff;
            }
        }
    }
}
.intern{
    border: 1px solid #0F4C81;
    background-color: #ffffff;
    color: #0F4C81;
    .layout_data_user{
        .layout_name_type{
            .type_user{
                border: 1px solid #0F4C81;
            }
        }
    }
}
</style>