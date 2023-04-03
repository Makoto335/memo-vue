<template>
  <div class="AvatarUploader">
    <img class="AvatarUploader_Avatar" :src="preview" />
    <label class="AvatarUploader_CameraIcon">
      <input type="file" name="image" @change="selectedImage" />
    </label>
    
  </div>
  <div class="error AvatarUploader_Error">{{ avatarError }}</div>
</template>

<script>
export default {
    props: {
   preview: String,
    avatarError: String,
  },
  methods: {
    selectedImage(e) {
      e.preventDefault();
      this.$emit("imageSelected", e.target.files[0]);
    },
  },
};
</script>

<style scoped lang="scss">
.AvatarUploader {
  margin: 0 auto;
  height: 200px;
  width: 150px;
  position: relative;
  input {
    display: none;
  }
  &_Avatar {
    margin: 0 auto;
    display: block;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  &_CameraIcon {
    position: absolute;
    bottom: 25px;
    right: 0;
    z-index: 2;
    display: block;
    height: 54px;
    width: 54px;
    background-image: url("../../assets/images/add-camera_96.png");
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  &_Error {
    margin:0 auto;
    width:350px;
  }
}
</style>
