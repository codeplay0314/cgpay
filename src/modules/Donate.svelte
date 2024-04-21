<script>
  import { onMount } from 'svelte';
  import u from '#utils.js'; // Utility functions for API calls and validations
  import StepsLeft from './StepsLeft.svelte';

  import BackIcon from "svelte-material-icons/ChevronLeft.svelte"
  import cgLogo from '#modules/assets/cg-logo-300.png?webp'
  import constants from "#constants.js";
  import SlidingModal from "#modules/SlidingModal.svelte";

  let donation = {
    giftLevel: '',
    period: '',
    honored: '',
    honoring: '',
  };
  let statusMsg = '';
  let donationOptions = []; // To be filled with available donation options

  let isCompany = false; // TODO
  let recurOnly = ': monthly, quarterly, or yearly';
  let replaces = ''; // TODO
  let amountTip = isCompany ? '' : 'The most common amounts chosen are $50 and $25.';
  let special = ''; // TODO

  let showModal = true; // This variable controls the visibility of the modal

  // This function toggles the visibility state of the modal
  function toggleModal() {
      showModal = !showModal;
  }

  const GIFT_LEVELS = [
      { value: 2500, label: 'Slate .... $2,500'},
      { value: 1000, label: 'Glass .... $1,000'},
      { value: 500, label: 'Iron ....... $500'},
      { value: 250, label: 'Oak ........ $250'},
      { value: 100, label: 'Two Bricks . $100'},
      { value: 50, label: 'One Brick ... $50'},
      { value: 25, label: 'Half Brick .. $25'},
      { value: -1, label: 'Water ... (other)'},
  ];

  const PERIODS = [
      'yearly',
      'quarterly',
      'monthly',
      'weekly',
      'daily',
  ]

  async function submitDonation() {
    statusMsg = 'Processing your donation...';
    try {
      const res = await u.postRequest('/donate', donation); // Simulate an API call to submit the donation
      statusMsg = 'Thank you for your donation!';
    } catch (err) {
      console.error(err);
      statusMsg = 'Failed to process your donation. Please try again.';
    }
  }

  // Fetch donation options on component mount
  onMount(async () => {
    try {
      // Simulate fetching donation options
      donationOptions = await u.getRequest('/donationOptions');
    } catch (err) {
      console.error(err);
      statusMsg = 'Failed to load donation options.';
    }
  });

  async function submitForm() {
      //   TODO
      u.go('fund');
  }
</script>

<svelte:head>
  <title>Donate</title>
</svelte:head>

<section class="page card" id="donate">


    <div class="progress-container">
        <div class="progress-bar" style="width: 77%"></div>
    </div>

    <header style=" align-items: left" >
        <button data-testid="btn-nav" class="back-button" aria-label="Go back" on:click={u.goBack} >
            <BackIcon width={'100%'} height={'100%'} color={'gray'}/>
        </button>
        <img src="{cgLogo}" alt="Common Good Logo" style="margin-top: -50px">
        <h1 style="margin-top: -50px">CGPay{u.realData() ? '' : ' DEMO'}</h1>
    </header>

  <div class='content'>
    <h2>Make a Donation</h2>
    <form on:submit|preventDefault={submitDonation}>
        <SlidingModal bind:showModal>
            <p>Thank you for considering partnering with us to create a {constants.PROJECT} Economy, by making a tax-deductible donation.</p>
            <br/>

            <p>Most members choose to donate{recurOnly}. {replaces} {amountTip}</p>
            {special}
            <p>To donate an amount not listed (including ZERO), choose "Water" (and fill in the amount).</p><p><b class="loud">            <br/>
            NOTE: This is a donation, not a deposit.</b> Thank you for your support!</p>

        </SlidingModal>

<!--        <p style="font-size: 12px">Hello, %name. Thank you for considering partnering with us to create a {constants.PROJECT} Economy, by making a tax-deductible donation.</p>-->
<!--        <p style="font-size: 12px">Most members choose to donate{recurOnly}. {replaces} {amountTip}</p>-->
<!--        {special}-->
<!--        <p style="font-size: 12px">To donate an amount not listed (including ZERO), choose "Water" (and fill in the amount).</p><p><b class="loud">NOTE: This is a donation, not a deposit.</b> Thank you for your support!</p>-->

        <a style="font-size: 12px" href="'/help/why-no-one-time-option">Why no option for a one-time donation?</a>

        <div class="input-container">
          <select bind:value={donation.giftLevel}>
            <option value="" disabled>Donation</option>
            {#each GIFT_LEVELS as {value, label}}
                <option value={value}>{label}</option>
            {/each}
          </select>
        </div>

        <div class="input-container">
            <select style="margin-top: 5px" bind:value={donation.period}>
                <option value="" disabled>When</option>
                {#each PERIODS as value}
                    <option value={value}>{value}</option>
                {/each}
            </select>
        </div>

        <div class="input-container">
            <select style="margin-top: 5px" bind:value={donation.honored}>
                <option value="">Honoring (Optional)</option>
                <option value="honor">In honor of</option>
                <option value="memory">In memory of</option>
            </select>
            {#if donation.honored}
                <input type="text" id="honoring" bind:value={donation.honoring} required />
            {/if}
        </div>
    </form>
  </div>
<button type="submit" on:click={submitForm}>Next</button>
<button type="button" on:click={submitForm} style="background-color: gray; border-color: gray">Skip for now</button>
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

  .loud
    background-color yellow

  .input-container
    position relative /* Establishes a positioning context */
    display inline-block /* Or 'block', depending on your layout */
    width 100% /* Ensures the container takes the full width */

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
