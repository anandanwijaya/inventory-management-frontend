<template>
  <div class="user-view">
      <div class="scrollable-content">
        <ItemList v-if="currentComponent === 'items'" @edit-item="showEditForm" />
        <TransactionList v-if="currentComponent === 'transactions'" />
        <HistoryList v-if="currentComponent === 'history'" />
      </div>

      <div v-if="showForm" class="form-content">
        <ItemForm :item="selectedItem" :isEdit="isEdit" @submit="handleSubmit" @cancel="cancelEditForm" />
      </div>
  </div>
</template>


<script>
import ItemList from '@/components/user/item/ItemList.vue';
import ItemForm from '@/components/user/item/ItemForm.vue';
import TransactionList from '@/components/user/transaction/TransactionList.vue';
import HistoryList from '@/components/user/history/HistoryList.vue';

export default {
  components: {
    ItemList,
    ItemForm,
    TransactionList,
    HistoryList,
  },
  props: {
    currentComponent: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showForm: false,
      selectedItem: null,
      isEdit: false
    }
  },
  methods: {
    showEditForm(item) {
      this.selectedItem = item
      this.isEdit = true
      this.showForm = true
    },
    handleSubmit(formData) {
      this.selectedItem = null
      this.isEdit = false
      this.showForm = false
    },
    cancelEditForm() {
      this.selectedItem = null
      this.isEdit = false
      this.showForm = false
    },
  }
}
</script>

<style scoped>
.user-view{
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 4vh;
  background-color: white;
  max-height: calc(100vh - 60px);
}

@media (max-width: 991px) {
    .scrollable-content {
        margin-top: 20vh;
    }
}
</style>