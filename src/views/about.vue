<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <IonContent>
      <div class="page-title">
        <FontAwesomeIcon icon="fa fa-chevron-left" class="ion-menu-icon start"></FontAwesomeIcon>
        About
      </div>

      <div class="container"></div>
    </IonContent>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonButtons, IonCardContent, IonTabBar, IonBackButton, IonLabel, IonIcon, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<style scoped></style>
