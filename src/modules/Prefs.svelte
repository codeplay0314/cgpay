<script>
  import {onMount} from 'svelte';
  import u from '#utils.js'; // Assuming utility functions for frontend operations are available
  import constants from "#constants.js";
  import StepsLeft from './StepsLeft.svelte';
  import Accordion from "./Accordion.svelte";

  import BackIcon from "svelte-material-icons/ChevronLeft.svelte"
  import cgLogo from '#modules/assets/cg-logo-300.png?webp'
  import SlidingModal from "#modules/SlidingModal.svelte";

  let preferences = {
    isCompany: false,
    roundup: false,
    foodAssistance: false,
    statements: true, // Assuming true for electronic, false for paper
    secretBal: false,
    noSearch: false,
    debtOk: false,
  };

  let list = 'CHIP, CNP, EAEDC, EITC, Fuel Assistance, Medicaid, LIHEAP, Section 8, SNAP, SSP, TAFDC, TANF, WIC';

  let showModal = true;
  let showAdvancedOptions = false;
  let statusMsg = '';

  async function updatePreferences() {
    statusMsg = 'Updating preferences...';
    try {
      const res = await u.postRequest('updatePreferences', preferences); // Simulating an API call
      // Handle success response
      statusMsg = 'Preferences updated successfully!';
      // Maybe navigate to a different route or reset form
    } catch (err) {
      // Handle error
      console.error(err);
      statusMsg = 'Failed to update preferences. Please try again.';
    }
  }

  // Populate preferences with existing user preferences on component mount
  onMount(async () => {
    try {
      const res = await u.getRequest('getPreferences'); // Simulating an API call to fetch preferences
      Object.assign(preferences, res.preferences);
    } catch (err) {
      console.error(err);
      statusMsg = 'Failed to load preferences.';
    }
  });
</script>

<svelte:head>
  <title>Account Preferences</title>
</svelte:head>

<section class="page card" id="preferences">

    <div class="progress-container">
        <div class="progress-bar" style="width: 66%"></div>
    </div>

    <header style=" align-items: left" >
        <button data-testid="btn-nav" class="back-button" aria-label="Go back" on:click={u.goBack} >
            <BackIcon width={'100%'} height={'100%'} color={'gray'}/>
        </button>
        <img src="{cgLogo}" alt="Common Good Logo" style="margin-top: -50px">
        <h1 style="margin-top: -50px">CGPay{u.realData() ? '' : ' DEMO'}</h1>
    </header>

  <SlidingModal bind:showModal>
    <h2>Disclaimers required by the IRS:</h2>
    <p>Your choice of how to receive statements applies to all statements you receive from now on. You can change your preference at any time by returning to this Preferences page (on the Settings menu) or by notifying the Regional Administrator by mail:  {constants.CGF_LEGALNAME}, {constants.CGF_POSTALADDR}. Any change will be confirmed in writing (electronically if you accept electronic statements, otherwise by US Mail). You may also ask the Regional Administrator for a paper copy without changing your preference for electronic statements in the future.</p>
    <p>To view your electronic statements, you need a typical computer or mobile device connected to the internet, including an email program and a web browser. To print the statements, you need a printer.</p>
    <p>Your annual tax statements will be accessible online from January through December.</p>
  </SlidingModal>

  <div class='content'>
    <h2>Account Preferences</h2>
    <a on:click={function (){showModal=true;}} style="font-size:12px">**Disclaimers required by the IRS</a>
    <div class="form-container">
      <form on:submit|preventDefault={updatePreferences}>
          <Accordion>
            <span slot="head"><input type="checkbox" bind:checked={preferences.roundup}>
                Round Up!</span>
            <div slot="details">
              <p style="color:gray;font-size:12px">Round all your payments up to a whole dollar amount and donate the cents toward building the {constants.PROJECT} Economy in your area.</p>
            </div>
          </Accordion>

          <Accordion>
            <span slot="head"><input type="checkbox" bind:checked={preferences.foodAssistance}>
              Food Assistance?</span>
            <div slot="details">
              <p style="color:gray;font-size:12px">If you struggle to afford healthy food, consider answering "Yes" here. This is a request for financial assistance from other {constants.PROJECT} members in your community. Your answer is private &mdash; only program administrators can tell who is receiving this assistance. Typically answer "Yes" if you are eligible for any of the following (whether or not you have actually applied): {list}. (Food assistance may not yet be available in your area.)</p>
            </div>
          </Accordion>
          <Accordion>
              <span slot="head"><input type="checkbox" bind:checked={preferences.statements}>
              Electronic Statements?</span>
            <div slot="details">
              <p style="color:gray;font-size:12px">If you do not select this, you agree to pay ${constants.R_STATEMENT_COST} per month to cover the postage and handling costs for this service.</p>
            </div>
          </Accordion>

          <Accordion>
            <span slot="head"><input type="checkbox" bind:checked={preferences.debtOk} on:change={function (){preferences.debtOk=false;}}>
              Debt Okay?</span>
            <div slot="details">
              <p style="color:gray;font-size:12px">Use your {constants.PROJECT} card as a <i>credit</i> card, allowing your account balance to go negative, limited by your credit limit (currently {constants.CREDITLIMIT}), based on your average monthly account activity. When you use your credit line  (that is, when your balance goes negative) it is a short-term loan from your {constants.PROJECT} community. <span class="loud">In choosing this option, you agree to bring your balance back up above zero within 30 days.</span></p>
              <p style="color:gray;font-size:12px"><b style="color:maroon">NOTE:</b> This setting is disabled unless you <a href="/settings/fund">choose automatic refills from a bank account</a>, with a target balance.</p>

            </div>
          </Accordion>
          <Accordion>
            <span slot="head"><input type="checkbox" bind:checked={preferences.secretBal}>
              Secret Balance</span>
            <div slot="details">
              <p style="color:gray;font-size:12px">Don't let merchants see my balance, even if I ask.</p>
            </div>
          </Accordion>
          <Accordion>
            <span slot="head"><input type="checkbox" bind:checked={preferences.noSearch}>
              No Search</span>
            <div slot="details">
              <p style="color:gray;font-size:12px">Let members identify my account only by phone, email, or account ID &mdash; not by name.</p>
            </div>
          </Accordion>
      </form>
    </div>
    <div class="button-container">
      <button type="submit" onclick="location.href='donate'">Next</button>
      <button type="button" onclick="location.href='donate'" style="background-color: gray; border-color: gray">Skip for now</button>
    </div>
  </div>
  <!--{#if !showAdvancedOptions}-->
  <!--<a on:click={function (){showAdvancedOptions=true;}} style="margin-top: 10px">Show advanced options</a>-->
  <!--{/if}-->
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

  .form-container {
    flex-grow: 1;
  }

  .accordion-container {
    margin-bottom: 30px; /* Ensures space between accordions and buttons */
  }

  .button-container {
    padding-top: 10px; /* Additional padding to prevent overlap */
  }

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
