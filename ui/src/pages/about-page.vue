<template>
  <ion-page>
    <IonHeader>
      <IonToolbar>
        <ion-buttons slot="start">
          <ion-back-button class="ml-20" default-href="/calculator" text=""></ion-back-button>
        </ion-buttons>
        <div class="page-title">About</div>
      </IonToolbar>
    </IonHeader>
    <ion-content>
      <div class="container local-container mt-20">
        <div>My Fuel Calculator</div>
        <div class="mt-20">Version : 1.0.1</div>
        <div class="mt-50">© 2023 Kosey</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent } from "@ionic/vue";
</script>

<style scoped>
.local-container {
  height: 95%;
  background-color: white;
  border-radius: 40px 40px 0 0;
  text-align: center;
  padding: 70px;
  color: rgb(31, 200, 128);
  /* position: fixed; */
}
</style>
