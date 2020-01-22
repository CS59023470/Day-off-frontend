<template>
    <div class="box_loadder">
        <div class="loader"></div>
        <!--<div class="loader_big"></div>-->
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}


.loader {
  opacity: 0.5;
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

.loader_big {
  border: 4px solid transparent;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  border-bottom: 4px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin_back 2s linear infinite; /* Safari */
  animation: spin_back 2s linear infinite;
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