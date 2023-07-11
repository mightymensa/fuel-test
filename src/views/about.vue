<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <IonContent>
      <div class="page-title">
        <IonButton style="margin-top: -15px" fill="clear">
          <FontAwesomeIcon icon="fa fa-chevron-left"></FontAwesomeIcon>
        </IonButton>
        About
      </div>

      <div class="container"></div>
    </IonContent>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonButtons, IonCardContent, IonTabBar, IonButton, IonLabel, IonIcon, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<style scoped></style>
