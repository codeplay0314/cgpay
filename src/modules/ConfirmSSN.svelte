<script>
  import u from '#utils.js';
  import st from '#store.js';
  import cgLogo from '#modules/assets/cg-logo-300.png?webp';
  import BackIcon from "svelte-material-icons/ChevronLeft.svelte"

  let credentials = {
    ssn: ''
  };
  let statusMsg = '';

  async function signIn() {
    statusMsg = 'Finding your account(s)...';
    try {
      // replace with FUND url
      const res = await u.postRequest('fund', credentials);
      st.setAcctChoices(res.accounts);
      st.setCorrupt(null); // retry any failed (corrupt) transactions
      if (res.accounts.length > 1) {
        u.go('link-account');
      } else {
        // Skip /link-account and use individual account settings
        st.setMe(res.accounts[0]);
        st.setShowDash(true);
        st.setPayOk(true);
        st.setAllowShow(true);
        u.go('home');
      }
    } catch (er) {
      st.resetNetwork();
      if (u.isTimeout(er) || !$st.online) {
        showEr(
          'The server is unavailable. Check your internet connection and try again.',
        );
      } else if (er.message == 403) {
        // forbidden
        showEr(
          'That account is not completely set up. Sign back in at CommonGood.earth to complete it.',
        );
      } else {
        console.log(er);
        // consider better error handling strat here
        showEr(er);
      }
    }
  }

  function setCustomMessage(event) {
    event.target.setCustomValidity('Please enter your SSN using numbers only');
    // Reset the custom validation message after the input changes, to ensure it's re-evaluated
    event.target.oninput = () => event.target.setCustomValidity('');
  }

  const handleFundSubmit = () => {
    // Handle form submission logic here
    // console.log({routingNumber, bankAccount, refills, targetBalance, minTransfer, saveWeekly});
  };
</script>

<svelte:head>
  <title>CGPay - Fund</title>
</svelte:head>

<section class="page card" id="confirm-ssn">


  <div class="progress-container">
    <div class="progress-bar" style="width: 99%"></div>
  </div>

  <header style=" align-items: left" >
    <button data-testid="btn-nav" class="back-button" aria-label="Go back" on:click={u.goBack} >
      <BackIcon width={'100%'} height={'100%'} color={'gray'}/>
    </button>
    <img src="{cgLogo}" alt="Common Good Logo" style="margin-top: -50px">
    <h1 style="margin-top: -50px">CGPay{u.realData() ? '' : ' DEMO'}</h1>
  </header>

  <div class="content">
    <h2>Confirm Your SSN</h2>

    <div class="left-align">
      <p>
        Our 3rd party service was unable to verify your ssn automatically. Please type it again (carefully) in case there was a typo.
      </p>
    </div>
    <form on:submit|preventDefault={handleFundSubmit}>
      <input
        data-testid="input-identifier"
        name="account-id"
        type="text"
        placeholder="Your social security number"
        autocomplete="off"
        pattern="\d*"
        on:invalid={setCustomMessage}
        bind:value={credentials.ssn}
        required
      />

      <small>Required by the IRS if you accept more than $600 a year in Common Good payments.</small>


      <button data-testid="btn-connect" type="submit">Submit</button>
    </form>
  </div>
</section>

<style lang="stylus">
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
