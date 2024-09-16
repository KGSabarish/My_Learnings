<template>
  <div
    class="modal fade"
    id="confirmModalDialog"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            {{ popup.title }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ popup.body }}</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            {{ popup.secondaryActionLabel }}
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="executePrimaryAction(this.popup.data)"
            data-bs-dismiss="modal"
          >
            {{ popup.actionLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "bootstrap";
// import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
export default {
  name: "ConfirmModal",
  props: {
    popup: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // popup:{
      //   title : 'delete',
      //   body : "are you are ",
      //   actionLabel : 'delete',
      //   secondaryActionLabel : 'Cancel',
      //   data : "actions"

      // }
    };
  },
  mounted(){
    console.log("Popup Props",this.props)
  },

  methods: {
    executePrimaryAction(data) {
      this.$emit("executePrimaryAction", data);
    },
    openModal() {
      
      const modal = document.getElementById("confirmModalDialog");
            document.body.appendChild(modal);

            // var myModal = new bootstrap.Modal(modal, {
            //     keyboard: false,
            // });


            // myModal.show();

      var myModal = new Modal(modal, {
        keyboard: false,
      });
      myModal.show();

    },
    // setModalValues(data) {
    //   console.log("Modal Setting")
    //   // this.popup = {...data};
    //   // this.popup.title = data.title
    //   // this.popup.actionLabel = data.actionLabel
    //   // this.popup.secondaryActionLabel  =data.secondaryActionLabel
    //   // this.popup.body = data.body
    //   // this.popup.data = data.data
       
    //   // console.log("Modal Data",data)
    //   // console.log("Popup",this.popup)
    // },
  },
};
</script>
<style scoped>

</style>