<template>
  <div>
    <!-- <h1>Side Panel Playground</h1> -->
    <!-- <h1>Glance today</h1> -->
    <v-chip color="primary">Glance today</v-chip>
    <v-card class="mx-auto" max-width="300">
      <v-list>
        <v-list-item v-for="(item, index) in items"  :base-color="getListItemColor(colorList)" :key="index"
          @click="onClick(index)">
          {{ item.title }}

          <!-- <v-chip>
            Default
          </v-chip>

          <v-chip color="primary">
            Primary
          </v-chip>

          <v-chip color="secondary">
            Secondary
          </v-chip>

          <v-chip color="red">
            Red
          </v-chip>

          <v-chip color="green">
            Green
          </v-chip> -->
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const optionsStore = useOptionsStore()
import { reactive } from 'vue'
import { BookMark } from '@/src/utils/bookmarks'
import { Color,getListItemColor } from '@/src/utils/common'
const items = reactive<BookMark[]>([])
function onClick(index: number) {
  chrome.runtime.sendMessage({ action: { type: "click index" }, message: index })
  chrome.tabs.create({
    active: true,
    // Open the setup page and append `?type=install` to the URL so frontend
    // can know if we need to show the install page or update page.
    url: items[index].url,
  })
}
function getBookmarks() {
  chrome.runtime.sendMessage({ action: { type: "READ_LIST" }, data: { num: 10 }, message: "getBookmarks" }, function (response: conmmonResponese) {
    chrome.runtime.sendMessage({ action: { type: "READ_LIST_DEV" }, message: response })
    if (response["action"]["type"] == "READ_LIST_FINISHED") {
      chrome.runtime.sendMessage({ action: { type: "READ_LIST_FINISHED_RECIEVED" }, message: response['action'] })
      response.data.map((item) => {
        items.push(item)
      })
    }
  })
}
getBookmarks()
// test()

const colorList: Color[] = [{ color: "primary" }, { color: "secondary" }, { color: "Red" }, { color: "pink" }, { color: "purple" }, { color: "deep-purple" }, { color: "indigo" }, { color: "blue" }, { color: "light-blue" }, { color: "cyan" }, { color: "teal" }, { color: "green" }, { color: "light-green" }, { color: "lime" }, { color: "yellow" }, { color: "amber" }, { color: "orange" }, { color: "deep-orange" }, { color: "brown" }, { color: "grey" }, { color: "blue-grey" }]
</script>
