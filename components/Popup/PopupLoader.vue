<template>
    <div class="box_loadder">
        <div class="loader"></div>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.box_loadder{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
}


.loader {
  border: 5px solid transparent;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  border-left: 5px solid #3498db;
  border-bottom: 5px solid #3498db;
  width: 70px;
  height: 70px;
  -webkit-animation: spin 0.5s linear infinite; /* Safari */
  animation: spin 0.5s linear infinite;
  position: absolute;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@-webkit-keyframes spin_back {
  0% { -webkit-transform: rotate(360deg); }
  100% { -webkit-transform: rotate(0deg); }
}

@keyframes spin_back {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}
</style>