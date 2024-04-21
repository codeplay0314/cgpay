<script>
  import st from'#store.js'
  import u from '#utils.js'
  import cgLogo from '#modules/assets/cg-logo-300.png?webp'
  import StepsLeft from "#modules/StepsLeft.svelte";

  import BackIcon from "svelte-material-icons/ChevronLeft.svelte"

  let personalCredentials = { fullName: '', email: '', phone: ''}
  let companyCredentials = { companyType: '', fullName: '', email: '', phone: ''}
  let statusMsg = ''
  let accountType = 'personal'; // Default to personal account

  function showEr(msg) { u.alert(msg); statusMsg = '' }

  const handleSubmit = () => {
        // Handle form submission logic here
        // console.log({routingNumber, bankAccount, refills, targetBalance, minTransfer, saveWeekly});
        u.go('sign-up-country');
    };

  // handle pop up hint
  let showNameHint = false;
  let showEmailHint = false;

  // Function to display the name hint
  function handleNameFocus() {
    showNameHint = true;
    showEmailHint = false; // Ensure the email hint is hidden
  }
  // Function to display the email hint
  function handleEmailFocus() {
    showNameHint = false; // Ensure the name hint is hidden
    showEmailHint = true;
  }

  // Function to hide all hints when input is not focused
  function handleBlur() {
    showNameHint = false;
    showEmailHint = false;
  }

</script>

<svelte:head>
  <title>CGPay - Sign Up</title>
</svelte:head>

<section class="page card" id="sign-up">

  <div class="progress-container">
    <div class="progress-bar" style="width: 11%"></div>
  </div>

  <header style=" align-items: left" >
    <button data-testid="btn-nav" class="back-button" aria-label="Go back" on:click={u.goBack} >
      <BackIcon width={'100%'} height={'100%'} color={'gray'}/>
    </button>
    <img src="{cgLogo}" alt="Common Good Logo" style="margin-top: -50px">
    <h1 style="margin-top: -50px">CGPay{u.realData() ? '' : ' DEMO'}</h1>
  </header>

  <div class='content'>

    <h2>Sign Up </h2>

  <div class="account-type-selector">
    <label>
      <input type="radio" name="accountType" value="personal" bind:group={accountType} checked />
      Personal Account
    </label>
    <label>
      <input type="radio" name="accountType" value="company" bind:group={accountType} />
      Company Account
    </label>
  </div>

  {#if accountType == 'personal'}
  <!-- Personal account form-->
    <form on:submit|preventDefault={handleSubmit}>
      <div class="input-container">
        <input data-testid="input-fullname" name="name" type="text" autocomplete="off" autocapitalize="off" bind:value={personalCredentials.fullName} required on:focus={handleNameFocus} on:blur={handleBlur}/>
        <span class="floating-label">Your full name</span>
        {#if showNameHint}
          <div class="floating-box">
            Your full name, properly capitalized, as you would like it to appear to other members and member companies.
          </div>
        {/if}
      </div>

      <div class="input-container">
        <input data-testid="input-phone" name="phone" type="text" autocomplete="off" autocapitalize="off" bind:value={personalCredentials.phone} required />
        <span class="floating-label">Phone number</span>
      </div>

      <div class="input-container">
        <input data-testid="input-email" name="email" type="text" autocomplete="off" autocapitalize="off" bind:value={personalCredentials.email} required on:focus={handleEmailFocus} on:blur={handleBlur}/>
        <span class="floating-label">Email</span>
        {#if showEmailHint}
          <div class="floating-box">
            Type carefully. All emails from the system will be sent to this address. It will not be made public, but will be viewable by accounts you transact with (you can choose greater privacy by clicking "Advanced" on the Preferences Settings page).
          </div>
        {/if}
      </div>
      <button data-testid="btn-signin" type="submit">Next</button>
    </form>
  {:else}
    <!-- Company account form -->
    <form on:submit|preventDefault={handleSubmit}>
      <!-- Company account form fields -->
      <h3>Company Type</h3>
        <label class='radio-label'>
          <input type="radio" name="companyType" value="sole proprietor" bind:group={companyCredentials.companyType} checked />
          Sole Proprietor
        </label>
        <label>
          <input type="radio" name="companyType" value="partnership" bind:group={companyCredentials.companyType} />
          Partnership
        </label>
        <label>
          <input type="radio" name="companyType" value="LLC" bind:group={companyCredentials.companyType} />
          LLC
        </label>
        <label>
          <input type="radio" name="companyType" value="private corporation" bind:group={companyCredentials.companyType} />
          Private Corporation
        </label>
        <label>
          <input type="radio" name="companyType" value="publicly-traded corporation" bind:group={companyCredentials.companyType} />
          Publicly-Traded Corporation
        </label>
        <label>
          <input type="radio" name="companyType" value="nonprofit" bind:group={companyCredentials.companyType} />
          Nonprofit
        </label>
        <label>
          <input type="radio" name="companyType" value="government" bind:group={companyCredentials.companyType} />
          Government
        </label>
        <label>
          <input type="radio" name="companyType" value="co-operative" bind:group={companyCredentials.companyType} />
          Co-operative
        </label>
        <label>
          <input type="radio" name="companyType" value="unincorporated association or club" bind:group={companyCredentials.companyType} />
          Unincorporated Association or Club
        </label>
        <label>
          <input type="radio" name="companyType" value="estate" bind:group={companyCredentials.companyType} />
          Estate
        </label>
        <label>
          <input type="radio" name="companyType" value="trust" bind:group={companyCredentials.companyType} />
          Trust
        </label>
        <label>
          <input type="radio" name="companyType" value="custodian" bind:group={companyCredentials.companyType} />
          Custodian
        </label>

    </form>
  {/if}

  <div class="left-align">
    If you already have a Common Good account,<a class="signup inline-link" data-testid="lnk-signup" href="/sign-in" target="_blank">Sign In.</a>
  </div>
  </div>

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

  .radio-input {
    display: none; /* Hide the default radio button */
  }

  /* Custom Radio Button Style */
  .radio-label {
    display: inline-block;
    padding: 5px 20px;
    margin: 5px;
    background: #f0f0f0;
    border: 2px solid transparent;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  /* Style for Checked State */
  .radio-input:checked + .radio-label {
    background: #6200ea;
    color: white;
    border-color: #6200ea;
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

  /* Container for the progress bar, stretching across the top */
  .progress-container {
    position: absolute;
    width: 100%;
    height: 4px; /* Adjust thickness of the progress bar */
    background-color: #ddd; /* Background color of the progress bar */
    top: 0;
    left: 0;
    z-index: 1000; /* Ensures it stays on top of other content */
  }

  /* The actual progress bar */
  .progress-bar {
    height: 100%;
    background-color: mediumblue; /* Color of the progress */
  }


</style>
