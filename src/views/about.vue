<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <IonContent>
      <div class="page-title">
        <IonButton style="margin-top: -15px" fill="clear" href="/calculator">
          <FontAwesomeIcon icon="fa fa-chevron-left"></FontAwesomeIcon>
        </IonButton>
        About
      </div>

      <div class="container">
        <div>My Fuel Calculator</div>
        <div class="mt-20">Version : 1.0.0</div>
        <div class="mt-50">© 2023 Sangie</div>
      </div>
    </IonContent>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonButton, IonContent } from "@ionic/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 40px 40px 0 0;
  position: fixed;
  text-align: center;
  padding: 70px;
  color: rgb(31, 200, 128);
}
</style>
