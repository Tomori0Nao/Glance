<script setup lang="ts">
import { ApiConfig } from "@/src/utils/options-page";
import { ref } from "vue";
const optionsStore = useOptionsStore()
// const { api_config,setApiConfig } = storeToRefs(optionsStore)

const form_data = ref<ApiConfig>({ api_key: '', url: '', model: '', app_id: '', firecrawl_url: '' })
const snackbar = ref(false)
const rules = [
  (value: string) => {
    if (value) return true
    return 'Please enter a value'
  },
]
const text = ref('config finished!!!')
function submit() {
  console.log(form_data)
  snackbar.value = true
  chrome.runtime.sendMessage({ action: { type: "config" }, message: form_data.value }, function (response: conmmonResponese) {
    if (response["action"]["type"] == "config_finished") {
      chrome.runtime.sendMessage({ action: { type: "config_finished_recieved" }, message: response['action'] })
    }
  })
  // optionsStore.setApiConfig(form_data.value.api_key, form_data.value.url, form_data.value.model, form_data.value.app_id, form_data.value.firecrawl_url)
}
</script>

<template>
  <RouterLinkUp />
  <div>
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent>
        <v-text-field v-model="form_data.api_key" :rules="rules" label="api key"></v-text-field>
        <v-text-field v-model="form_data.url" :rules="rules" label="url"></v-text-field>
        <v-text-field v-model="form_data.model" :rules="rules" label="model name"></v-text-field>
        <v-text-field v-model="form_data.app_id" :rules="rules" label="app id"></v-text-field>
        <v-text-field v-model="form_data.firecrawl_url" :rules="rules" label="firecrawl url"></v-text-field>
        <v-btn class="mt-2" type="submit" block :onclick="submit">Submit</v-btn>
        <v-snackbar v-model="snackbar">
          {{ text }}

          <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar> </v-form>
    </v-sheet>

  </div>


</template>
