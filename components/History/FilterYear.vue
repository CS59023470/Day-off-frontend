<template>
    <div class="layout_filter_year_wrapper">
        <div class="btn_back">
            <button
                type="button"
                class="content_center"
                :disabled="yearSelect === list_year[0]"
                @click="back"
            >
                <i class="material-icons" style="transform: rotate(180deg)">play_arrow</i>
            </button>
        </div>
        <div class="layout_content">
            <div
                class="box_year content_center"
                v-for="(year, index) in getListYear"
                :key="index"
                v-bind:class="{ focut_year: index === 1 }"
                @click="clickYear(year,index)"
            >
                {{year}}
            </div>
        </div>
        <div class="btn_next">
            <button
                type="button"
                class="content_center"
                @click="next"
                :disabled="yearSelect === list_year[(list_year.length-1)]"
            >
                <i class="material-icons">play_arrow</i>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: ["list_year", "sizeYear"],
    data(){
        return {
            list_show: ['','',''],
            statusBtn: false,
            yearSelect: null,
            index_Select: null
        }
    },
    mounted(){
        this.yearSelect = this.$props.list_year[this.$props.sizeYear-1]
        this.index_Select = this.$props.sizeYear-1
        this.returnDataYear()
    },
    methods: {
        back(){
            this.index_Select--
            this.yearSelect = this.$props.list_year[this.index_Select]
            this.returnDataYear()
        },
        next(){
            this.index_Select++
            this.yearSelect = this.$props.list_year[this.index_Select]
            this.returnDataYear()
        },
        clickYear(year, index){
            if(this.yearSelect !== year && (this.list_show[index] !== undefined && this.list_show[index] !== '')){
                this.index_Select = index
                this.yearSelect = year
                this.returnDataYear()
            }
        },
        returnDataYear(){
            this.$emit('returnYear',this.yearSelect)
        }
    },
    computed:{
        getListYear(){
            let indexSelect = null;
            this.$props.list_year.forEach((year,i) => {
                if(this.yearSelect === year){
                    this.list_show[1] = year
                    indexSelect = i
                }
            })
            this.list_show[0] = this.$props.list_year[indexSelect-1]
            this.list_show[2] = this.$props.list_year[indexSelect+1]
            return this.list_show
        }
    }
}
</script>
<style lang="scss" scoped>
.layout_filter_year_wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    .btn_back, .btn_next{
        width: 8%;
        height: 100%;
        button{
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            cursor: pointer;
            background-color: transparent;
            i{
                color: #0f4c81;
            }
        }
        button:active{
            opacity: 0.2;
        }
        button:disabled{
            opacity: 0.2;
            cursor: unset;
        }
    }
    .layout_content{
        width: 84%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .box_year{
            width: 30%;
            height: 100%;
            padding: 0px 10px;
            font-size: 16px;
            color: #0f4c81;
            cursor: pointer;
        }
    }
    .layout_content::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
}
.focut_year{
    background-color: #0f4c81;
    color: #fff !important;
    font-size: 20px !important;
    border-radius: 5px;
    cursor: unset !important;
}
</style>