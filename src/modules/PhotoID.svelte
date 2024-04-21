<script>
  import st from '#store.js';
  import u from '#utils.js';
  import Cropper from 'cropperjs';
  import 'cropperjs/dist/cropper.min.css';
  import cgLogo from '#modules/assets/cg-logo-300.png?webp'
  import BackIcon from "svelte-material-icons/ChevronLeft.svelte"
  import SlidingModal from "#modules/SlidingModal.svelte";
  import HelpBoxIcon from "svelte-material-icons/HelpBox.svelte"
  import { fade } from 'svelte/transition';
  import StepsLeft from "#modules/StepsLeft.svelte";

  let selectedPhoto;
  let cropper;
  let croppedImageURL;

  let showModal = true;

  let uploadButtonText = 'Upload';
  function handlePhotoUpload(event) {
      const files = event.target.files;
      if (files.length > 0) {
          const file = files[0];
          selectedPhoto = URL.createObjectURL(file);
          uploadButtonText = 'Processing...'; // Change button text
          // Ensure Cropper is initialized when the image is loaded
          if (cropper) {
              cropper.destroy();
          }
      }
  }

  function onImageLoad() {
      const imageElement = document.getElementById('image-to-crop');
      cropper = new Cropper(imageElement, {
          aspectRatio: 1, // or any ratio you desire
          viewMode: 1,
          autoCropArea: 0.8,
      });
      uploadButtonText = 'Re-upload'; // Suggest the user can re-upload if needed
  }

  function toggleModal() {
      showModal = !showModal;
  }


  let showConfirmationDialogue = false; // State for managing confirmation dialogue visibility

  // Modified handleSubmit to just show the confirmation dialogue
  function handleSubmit() {
      if (!cropper) {
          return;
      }
      const croppedCanvas = cropper.getCroppedCanvas();
      croppedImageURL = croppedCanvas.toDataURL('image/jpeg');
      showConfirmationDialogue = true; // Show confirmation dialogue
  }

  // Function to proceed with the cropped image
  function confirmCroppedImage() {
      showConfirmationDialogue = false;
      // Code to handle the confirmed cropped image goes here
      // Proceed to the next step
      u.go('contact');
  }

  // Function to handle "No" response in confirmation dialogue, allowing the user to recrop
  function recropImage() {
      showConfirmationDialogue = false;
      // User can adjust the crop again
  }

</script>

<svelte:head>
    <title>CGPay - Photo ID</title>
</svelte:head>

<section class="page card" id="photo-upload-module">

    <div class="progress-container">
        <div class="progress-bar" style="width: 38%"></div>
    </div>

    <header style=" align-items: left" >
        <button data-testid="btn-nav" class="back-button" aria-label="Go back" on:click={u.goBack} >
            <BackIcon width={'100%'} height={'100%'} color={'gray'}/>
        </button>
        <img src="{cgLogo}" alt="Common Good Logo" style="margin-top: -50px">
        <h1 style="margin-top: -50px">CGPay{u.realData() ? '' : ' DEMO'}</h1>
    </header>

    <SlidingModal bind:showModal>
        <p>Choose a recent color picture of yourself for the seller to see when they scan your member QR Code. Your photo will be encrypted, unseen by other members unless you transact with them.<br><br>
            <b>Requirements:</b>
        <ul class="requirements-list">
            <li>1. A color photo of you, and only you (you can crop other people out).</li>
            <li>2. It must show your full face clearly (no sunglasses, eyes open).</li>
            <li>3. It includes the top of your head and your chin, with just a little space above and below.</li>
        </ul>
    </SlidingModal>

    <div class="content">
        <h2>
            <div class="text-with-icon">
                <span>Upload and Crop Your Photo ID</span>
                <span class="show-note-link" on:click="{toggleModal}">
                  <HelpBoxIcon />
                </span>
            </div>
        </h2>

        <div class="photo-upload">
            <button class="submit-button" on:click={() => document.getElementById('photo-upload-input').click()}>{uploadButtonText}</button>
            <!--label for="photo-upload-input" class="photo-upload-label">Choose Photo</label-->
            <input id="photo-upload-input" type="file" accept="image/*" class="hidden"  on:change={handlePhotoUpload} />
            {#if selectedPhoto}
                <img id="image-to-crop" src={selectedPhoto} alt="Crop this image" on:load={onImageLoad} />
                <button class="submit-button" on:click={handleSubmit}>Confirm Crop</button>
            {/if}
        </div>
        <p class="prompt-text">
            Drag to reposition, adjust size and rotation, then click the button to upload. Please feel free to email a photo to us if that is easier for you.
        </p>
    </div>
    {#if showConfirmationDialogue}
        <div class="overlay">
            <div class="confirmation-dialogue">
                <div class="image-container"> <!-- Image container with fixed size -->
                    <img src={croppedImageURL} alt="Cropped Image" class="confirmation-image"/>
                </div>
                <p>Does this image look good?</p>
                <button on:click={confirmCroppedImage}>Looks Good</button>
                <button on:click={recropImage}>Adjust Again</button>
            </div>
        </div>
    {/if}
</section>

<style lang='stylus'>
      a
        padding 0 $s-1
        color $c-blue
        text-decoration underline
        text-underline-offset 1px
        margin-bottom $s-2
        width fit-content
        &.signup
          margin-bottom $s1

      button
        cgButton()
        margin-bottom $s2

      form
        display flex
        flex-direction column

      h2
        margin-bottom $s0

      header
        margin-top: 5rem;
        contentCentered()
        margin-bottom 3rem;

      .btn
        height 100px
        width 100px

      img
        width 75px
        margin 0 $s2 0 0

    .card {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: $c-blue-light;
      box-shadow: 2px 2px 4px $c-gray-dark;
      border-radius: 2%;
      padding: $s1;
      position: relative; /* Make this a positioning context for the button */
    }

    .content
        width 100%
        height 100%
        display flex
        flex-direction column
        align-items center

    .photo-upload {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1rem;
    }

    .photo-upload-label {
        background-color: var(--blue);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
        margin-bottom: 0.5rem;
        display: inline-block;
    }

    .uploaded-photo {
        max-width: 100%;
        margin-top: 0.5rem;
        border-radius: 0.25rem;
    }

  .btn.top-left {
    position: absolute;
    top: 2px;
    left: 0.5px;
    transform: scale(0.58);
  }
  .show-note-link {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050; /* Ensure this value is higher than Cropper's z-index */
  }

  .submit-button {
    margin-top: 20px; /* Adjust the value as needed */
  }

  .confirmation-dialogue {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1051; /* This ensures the dialogue is above the overlay */
  }

  .confirmation-image {
    max-width: 80%;
    margin-bottom: 20px;
  }

  .image-container {
    width: 300px; /* Fixed width */
    height: 300px; /* Fixed height */
    display: flex; /* Use flexbox to center the image */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    overflow: hidden; /* Hide parts of the image that exceed the container */
  }

  .confirmation-image {
    width: 300px; /* Fixed width */
    height: auto;
    object-fit: cover;
  }

  .image-container, .confirmation-image {
    margin: 0;
    padding: 0;
  }
    .hidden {
      display: none;
    }

  @keyframes scaleIn {
      from {
        transform: scale(0.8);
        opacity: 0;
      }
      to {
          transform: scale(1);
          opacity: 1;
      }
  }

  .confirmation-dialogue {
    animation: scaleIn 0.3s ease-out forwards;
  }

  .text-with-icon {
    display: flex;
    align-items: center; /* This ensures the icon and text are aligned at their centers */
    gap: 0.5rem; /* Optional: adds some space between the icon and the text */
  }

      .back-button {
          position: absolute;
          cursor: pointer; /* Makes it clear the icon is clickable */
          padding: 5px 10px; /* Padding around the text or icon for better touch */
          width: 10%;
          top: 55px;
          left: 15px;
          border: none; /* No border for a cleaner look */
          background-color: transparent; /* Transparent background */
          font-size: 10px; /* Larger font size for visibility */
          transform: scale(0.8);
          color: green;
      }
      .progress-container {
          position: absolute;
          width: 100%;
          height: 4px; /* Adjust thickness of the progress bar */
          background-color: #ddd; /* Background color of the progress bar */
          top: 0;
          left: 0;
          z-index: 1000; /* Ensures it stays on top of other content */
      }

      .progress-bar {
          height: 100%;
          background-color: mediumblue; /* Color of the progress */
      }

</style>
