<!-- eslint-disable vue/multi-word-component-names -->
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
    <IonContent>
      <div class="container mt-20">
        <div>My Fuel Calculator</div>
        <div class="mt-20">Version : 1.0.0</div>
        <div class="mt-50">© 2023 Kosey</div>
      </div>
    </IonContent>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent } from "@ionic/vue";
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
