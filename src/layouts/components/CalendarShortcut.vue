<script setup>
import AppDateTimePicker from '@core/components/AppDateTimePicker.vue';

</script>

<template>
  <AppDateTimePicker 
    :model-value="new Date().toJSON().slice(0, 10)"
    label="Choisir une date"
    :config="{ altInput: true, altFormat: 'F j, Y', dateFormat: 'Y-m-d', altLocal: 'fr-FR' }"
  />
</template>
