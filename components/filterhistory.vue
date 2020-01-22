<template>
    <div>
        <div class="Box">
            <div class="StartDate">
                <div class="TextStart"> ตั้งแต่ </div>
                <input type="date" class="unstyled"/>
                
            </div>
            <div class="EndDate">
                <div class="TextEnd"> ถึง </div>
                <input type="date" class="unstyled">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .Box {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 50px;
        align-items: center;
        padding: 10px;
        .StartDate{
            display: flex;
            align-items: center;
            .TextStart{
            font-size: 18px;
            color: black;
            margin: 0px 15px;
            }
            
            input {
                border-radius: 5px;
                border: solid 1px black;
                width: 160px;
                height: 45px;
                background-color: white;
            }
        }
        .EndDate{
            display: flex;
            align-items: center;
            .TextEnd{
            font-size: 18px;
            color: black;
            margin: 0px 15px;
            }
            input {
                border-radius: 5px;
                border: solid 1px black;
                width: 160px;
                height: 45px;
                background-color: white;
            }
        }
    }
        ::-webkit-calendar-picker-indicator {
            color: rgba(0, 0, 0, 0);
            opacity: 1;
            background-image: url('data:image/svg+xml;charset=utf8,%3Csvg fill="%23000" fill-opacity=".54" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/%3E%3Cpath d="M0 0h24v24H0z" fill="none"/%3E%3C/svg%3E');
            background-repeat: no-repeat;
            width: 20px;
            height: 20px;
            margin-left: .5rem;
        }
        ::-webkit-calendar-picker-indicator:hover {
            -webkit-box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.04);
            box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.04);
        }
        .unstyled::-webkit-inner-spin-button{
            display: none;
            -webkit-appearance: none;
}
</style>