<script>
  import st from'#store.js'
  import u from '#utils.js'
  import cgLogo from '#modules/assets/cg-logo-300.png?webp'
  import StepsLeft from './StepsLeft.svelte';

  import BackIcon from "svelte-material-icons/ChevronLeft.svelte"

  let contactInfo = {
    yourName: '',
    email: '',
    password: '',
    phone: '',
  };
  let statusMsg = '';

  let showNameHint = false;
  let showPasswordHint = false;

  // Function to display the name hint
  function handleNameFocus() {
    showNameHint = true;
    showPasswordHint = false;
  }
  // Function to display the password hint
  function handlePasswordFocus() {
    showPasswordHint = true;
    showNameHint = false;
  }

  // Function to hide all hints when input is not focused
  function handleBlur() {
    showPasswordHint = false;
    showNameHint = false;
  }

  async function submitContactInfo() {
  //   TODO
      u.go('physical-address');
  }
</script>

<svelte:head>
  <title>CGPay - Contact Information</title>
</svelte:head>

<section class="page card" id="contact-info">

  <div class="progress-container">
    <div class="progress-bar" style="width: 44%"></div>
  </div>

  <header style=" align-items: left" >
    <button data-testid="btn-nav" class="back-button" aria-label="Go back" on:click={u.goBack} >
      <BackIcon width={'100%'} height={'100%'} color={'gray'}/>
    </button>
    <img src="{cgLogo}" alt="Common Good Logo" style="margin-top: -50px">
    <h1 style="margin-top: -50px">CGPay{u.realData() ? '' : ' DEMO'}</h1>
  </header>




  <div class='content'>
    <h2>Contact Information</h2>
    <form on:submit|preventDefault={submitContactInfo}>
      <div class="input-container">
        <input type="text" bind:value={contactInfo.yourName} on:focus={handleNameFocus} on:blur={handleBlur} required />
        <span class="floating-label">Your Name</span>
        {#if showNameHint}
          <div class="floating-box">
            The <b>FULL NAME</b> you use most of the time, properly capitalized!
          </div>
        {/if}
      </div>

      <div class="input-container">
        <input type="email" bind:value={contactInfo.email}  required />
        <span class="floating-label">Email</span>
      </div>

      <div class="input-container">
        <input type="password" bind:value={contactInfo.password}  on:focus={handlePasswordFocus} on:blur={handleBlur} required />
        {#if showPasswordHint}
          <div class="floating-box">
            Required for changing email address
          </div>
        {/if}
        <span class="floating-label">Password</span>
      </div>

      <div class="input-container">
        <input type="tel" bind:value={contactInfo.phone} required />
        <span class="floating-label">Phone</span>
      </div>

      <div class="input-container">
      <button type="submit">Next</button>
      <p class="status">{statusMsg}</p>
      </div>
    </form>
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

  .btn {
    height 100px;
    width 100px;
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

  .input-container
    position relative /* Establishes a positioning context */
    display inline-block /* Or 'block', depending on your layout */
    width 100% /* Ensures the container takes the full width */

  .floating-box
    position absolute
    top 100% /* Positions the box right below the input */
    left 0
    width 100% /* Makes the box as wide as the container/input */
    background-color #f9f9f9
    border 1px solid #d3d3d3
    z-index 100
    padding 10px
    border-radius 5px
    box-shadow 0 2px 4px rgba(0, 0, 0, 0.1)
    margin-top -16px /* Adds a small space between the input and the box */


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
