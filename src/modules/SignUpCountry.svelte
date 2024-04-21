<script>
  import st from'#store.js'
  import u from '#utils.js'
  import cgLogo from '#modules/assets/cg-logo-300.png?webp'

  import Accordion from './Accordion.svelte'
  import SlidingModal from "#modules/SlidingModal.svelte";
  import HelpBoxIcon from "svelte-material-icons/HelpBox.svelte"
  import StepsLeft from "#modules/StepsLeft.svelte";

  import BackIcon from "svelte-material-icons/ChevronLeft.svelte"
  let selectedCountry = 'US'; // To bind with select dropdown
  let postalCode = '';
  let referredBy = '';
  let showReferHint = false;

  let showModal = true; // This variable controls the visibility of the modal

  // This function toggles the visibility state of the modal
  function toggleModal() {
    showModal = !showModal;
  }

  // Function to display the refer hint
  function handleReferFocus() {
    showReferHint = true;
    // showEamilHint = false; // Ensure the email hint is hidden
  }

  // Function to hide all hints when input is not focused
    function handleBlur() {
    showReferHint = false;
    // showEmailHint = false;
  }

  // Function to dynamically load the reCAPTCHA API script
  function loadRecaptchaScript() {
    var script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true; // Load script asynchronously
    script.defer = true; // Defer script execution until the HTML document has been parsed

    // Append the script to the head of the document
    document.head.appendChild(script);
  }

  function handleFormSubmit() {
    u.go('agreement');
  }

  // Call the function to load the script
  loadRecaptchaScript();
</script>

  <svelte:head>
    <title>CGPay - Sign Up</title>
  </svelte:head>

  <section class="page card" id="country-select">

    <div class="progress-container">
      <div class="progress-bar" style="width: 22%"></div>
    </div>

    <header style=" align-items: left" >
      <button data-testid="btn-nav" class="back-button" aria-label="Go back" on:click={u.goBack} >
        <BackIcon width={'100%'} height={'100%'} color={'gray'}/>
      </button>
      <img src="{cgLogo}" alt="Common Good Logo" style="margin-top: -50px">
      <h1 style="margin-top: -50px">CGPay{u.realData() ? '' : ' DEMO'}</h1>
    </header>

    <div class='content'>
      <h2>
        <div class="text-with-icon">
          <span>Sign Up</span>
<!--          <span class="show-note-link" on:click="{toggleModal}">-->
<!--                  <HelpBoxIcon />-->
<!--                </span>-->
        </div>
      </h2>

      <form id='demo-form' on:submit|preventDefault={handleFormSubmit}>
        <div class="dropdown-container"> 
        <label for="country">Country: </label>
        <select id="country" bind:value={selectedCountry}>
          <option value="US">United States</option>
        </select>
        <p style="color: gray; font-size:10px; margin-top: -10px">* We currently offer support exclusively to customers based in the U.S.</p>
        </div>
        <div class="input-container">
          <input
            data-testid="input-postal-code"
            id="postal-code"
            name="postalCode"
            type="text"
            autocomplete="off"
            autocapitalize="off"
            bind:value={postalCode}
            required
          />
          <span class="floating-label">Physical location postal code</span>
        </div>

        <label for="referred-by">Where did you hear about us? (optional)</label>
        <div class="input-container">
          <input 
            data-testid="input-referred-by" 
            id="referred-by" 
            name="referredBy" 
            type="text"
            autocomplete="off" 
            autocapitalize="off" 
            bind:value={referredBy} 
            required 
            on:focus={handleReferFocus}
            on:blur={handleBlur}
          />
          <span class="floating-label">Referred by</span>
          {#if showReferHint}
            <div class="floating-box">
              Name of company or person, web address, publication name, radio station name, or whatever
            </div>
          {/if}
        </div>

<!--      <button class="g-recaptcha"-->
<!--        data-sitekey="6Lc3bLMpAAAAAFf9LbFHkx23HxPKURmm1gc828Jh"-->
<!--        data-callback='onSubmit'-->
<!--        data-action='submit'>Submit-->
<!--      </button>-->
      <form action="?" method="POST">
        <div class="g-recaptcha" data-sitekey="6Le5QrMpAAAAAJxr4dE-6Kph7rwvKS--nC4fn65q"></div>
        <br/>
        <!--input type="submit" value="Submit"-->
      </form>

<!--        <Accordion>-->
<!--          <span slot="head">Read Common Good Agreement</span>-->
<!--          <div slot="details">-->
<!--            <li><b>Who.</b> I make this agreement with all Common Good <a href="https://new.commongood.earth/help/agreement#Members" tabindex="-1">Members</a> and <a href="https://new.commongood.earth/help/agreement#Member-Organizations" tabindex="-1">Member Organizations</a> everywhere — especially with Members and Member Organizations in my <a href="https://new.commongood.earth/help/agreement#CGC" tabindex="-1">Common Good Community</a>.</li>-->
<!--            <li><b>Community control.</b> I understand we can use the Common Good System, as a democratic community, to reclaim control of our local economy for the common good. I am willing to participate with other Members to do that, and to support other communities to do the same.</li>-->
<!--            <li><b>Investing together.</b> I understand whenever I put money in my Common Good account, there is more money in the <a href="https://new.commongood.earth/help/agreement#Dollar-Pool" tabindex="-1">Dollar Pool</a>, so my community has more money to invest while I use my Common Good credit for purchases.</li>-->
<!--            <li><b>Backing together.</b> I understand my Common Good credit is <a href="https://new.commongood.earth/help/agreement#Backing" tabindex="-1">backed</a> 100% or more — partly by money in the Dollar Pool and partly by Members and Member Organizations.</li>-->
<!--            <li><b>Accepting payments.</b> I will accept Common Good credit as payment, <a href="https://new.commongood.earth/help/agreement#Without-Limit" tabindex="-1">without limit or surcharge</a>.</li>-->
<!--            <li><b>Account Balance.</b> If I spend more than the balance in my Common Good account, resulting in a negative balance, I will bring my balance up to zero or more within 30 days.</li>-->
<!--            <li><b>Disputes.</b> When there is a dispute, I will follow the <a href="https://new.commongood.earth/help/agreement#Disputes" tabindex="-1">Common Good Dispute Resolution Process</a> and will honor its outcome.</li>-->
<!--            <li><b>Changes.</b> I understand I will have the <a href="https://new.commongood.earth/help/agreement#Participation" tabindex="-1">opportunity to participate</a> in any decision to change this Agreement, and if I use my account after changes have been approved, that means I agree to those changes.</li>-->
<!--          </div>-->
<!--        </Accordion>-->

<!--        <SlidingModal bind:showModal>-->
<!--          <p>By opening an account, you are joining a partnership to create a Common Good Economy based on the Common Good Agreement.-->
<!--            <strong><span style="color: red;">Please actually read it, so you know what you're agreeing to. It's short.</span></strong></p>-->
<!--        </SlidingModal>-->

        <button type="submit">Next</button>
    </form>

    </div>
  </section>


<style lang='stylus'>

  .dropdown-container
    margin-bottom: 10px; /* Adjust the value as needed */

  /* If you want to add space using the select itself */
  select
    margin-bottom: 10px; /* Adjust the value as needed */

  a
    padding 0 $s-1
    color $c-blue
    text-decoration underline
    text-underline-offset 1px
    margin-bottom $s-2
    width fit-content
    &.signup
      margin-bottom $s1

  .btn
    height 100px
    width 100px

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
    justify-content: space-between; /* Positions children at start and end of container */
  }

  .btn.top-left {
    position: absolute;
    top: 2px;
    left: 0.5px;
    transform: scale(0.58);
  }

  .content
      width 100%
      height 100%
      display flex
      flex-direction column
      align-items center

  .status
      height 24px
      font-style italic
      letter-spacing 0.0125rem
      text-align center
  
  .left-align p {
      margin-bottom: 1rem; /* Adds space between paragraphs */
  }

  button[data-testid="btn-connect"] {
      margin-top: 20px;
  }

  .overlay {
    position: fixed; /* Use fixed positioning to cover the whole screen */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
    display: flex;
    align-items: center; /* Center the image vertically */
    justify-content: center; /* Center the image horizontally */
    z-index: 1000; /* Ensure the overlay is above other content */
  }

  .hint-image {
    max-width: 90%; /* Increase the max width to allow the image to be larger */
    max-height: 90%; /* Increase the max height to allow the image to be larger */
    margin: auto; /* Center the image */
    object-fit: contain; /* This will ensure that the image's aspect ratio is preserved */
  }

  @media (min-width: 768px) {
    .hint-image {
      width: 80vw; /* Use viewport width for size */
      height: 80vh; /* Use viewport height for size */
      max-width: none; /* Remove max width limit */
      max-height: none; /* Remove max height limit */
    }
  }

  .show-note-link {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }

  .text-with-icon {
    display: flex;
    align-items: center; /* This ensures the icon and text are aligned at their centers */
    gap: 0.5rem; /* Optional: adds some space between the icon and the text */
  }

  .why-link {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
    margin-left: 5px;
  }

  .details {
    margin-top: 10px;
  }

  .input-container {
    position: relative; /* Establishes a positioning context */
    display: inline-block; /* Or 'block', depending on your layout */
    width: 100%; /* Ensures the container takes the full width */
  }

  .floating-box {
    position: absolute;
    top: 100%; /* Positions the box right below the input */
    left: 0;
    width: 100%; /* Makes the box as wide as the container/input */
    background-color: #f9f9f9;
    border: 1px solid #d3d3d3;
    z-index: 100;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: -16px; /* Adds a small space between the input and the box */
  }

  input {
    padding-top: 1rem;
    padding-bottom: 0.25rem;
  }

  input:focus ~ .floating-label,
  input:not(:focus):valid ~ .floating-label{
    top: 0px;
    left: 12px;
    bottom: 0px;
    font-size: 10px;
  }

  .floating-label {
    position: absolute;
    pointer-events: none;
    left: 12px;
    top: 12px;
    color: gray;
    transition: 0.2s ease all;
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
