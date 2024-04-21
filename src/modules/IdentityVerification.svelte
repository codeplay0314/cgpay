<script>
    import u from "#utils.js";
    import st from'#store.js'
    import cgLogo from '#modules/assets/cg-logo-300.png?webp'
    import StepsLeft from './StepsLeft.svelte';

    import BackIcon from "svelte-material-icons/ChevronLeft.svelte"
    import HelpBoxIcon from "svelte-material-icons/HelpBox.svelte"
    import SlidingModal from "#modules/SlidingModal.svelte";

    let credentials = { legalName: '', ssn: '', birthday: ''}

    let showHint = false; // Controls the visibility of the hint image
    let showDetails = false;

    let showRoutingHint = false;
    let showAccountHint = false;

    let showModal = false; // This variable controls the visibility of the modal

    // This function toggles the visibility state of the modal
    function toggleModal() {
        showModal = !showModal;
    }

    // Function to display the routing number hint
    function handleRoutingFocus() {
        showRoutingHint = true;
        showAccountHint = false; // Ensure the account hint is hidden
    }

    // Function to display the account number hint
    function handleAccountFocus() {
        showAccountHint = true;
        showRoutingHint = false; // Ensure the routing hint is hidden
    }

    // Function to hide all hints when input is not focused
    function handleBlur() {
        showRoutingHint = false;
        showAccountHint = false;
    }

    function toggleDetails() {
        showDetails = !showDetails;
    }

    function handleDateChange(event) {
        credentials.birthday = event.target.value;
    }

    async function signIn() {
        statusMsg = 'Finding your account(s)...'
        try {
            // replace with FUND url
            const res = await u.postRequest('fund', credentials)
            st.setAcctChoices(res.accounts)
            st.setCorrupt(null) // retry any failed (corrupt) transactions
            if (res.accounts.length > 1) {
                u.go('link-account')
            } else {
                // Skip /link-account and use individual account settings
                st.setMe(res.accounts[0])
                st.setShowDash(true)
                st.setPayOk(true)
                st.setAllowShow(true)
                u.go('home')
            }
        } catch (er) {
            st.resetNetwork()
            if (u.isTimeout(er) || !$st.online) {
                showEr('The server is unavailable. Check your internet connection and try again.')
            } else if (er.message == 403) { // forbidden
                showEr('That account is not completely set up. Sign back in at CommonGood.earth to complete it.')
            } else {
                console.log(er)
                // consider better error handling strat here
                showEr(er)
            }
        }
    }

    const handleFormSubmit = () => {
        // Handle form submission logic here
        u.go('photo');
    };

    function setCustomMessage(event) {
        // Check which input field triggered the event and set a custom message accordingly
        event.target.setCustomValidity('Please enter your SSN  using numbers only');
        // Reset the custom validation message after the input changes, to ensure it's re-evaluated
        event.target.oninput = () => event.target.setCustomValidity('');
    }
    const toggleHint = () => {
        event.stopPropagation(); // Prevent the click from being detected by clickOutside
        showHint = !showHint;
    };

    const closeHint = () => {
        showHint = false;
    };

</script>

<svelte:head>
    <title>CGPay - Fund</title>
</svelte:head>

<section class="page card" id="fund">

    <div class="progress-container">
        <div class="progress-bar" style="width: 33%"></div>
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
                <span>Identity Verification</span>
                <span class="show-note-link" on:click="{toggleModal}">
                  <HelpBoxIcon />
                </span>
            </div>
        </h2>

        <div class="left-align">
        </div>

        <SlidingModal bind:showModal>
            <p>As a registered Money Services Business, we are required by law to verify your identity. Fortunately, we have top notch security.</p>
        </SlidingModal>

        <form on:submit|preventDefault={handleFormSubmit}>
            <div class="input-container">
                <input data-testid="input-identifier" name="routing-id" type="text" autocapitalize="off" bind:value={credentials.legalName} required on:focus={handleRoutingFocus} on:blur={handleBlur} />
                <span class="floating-label">Your Legal Name</span>
                {#if showRoutingHint}
                    <div class="floating-box">
                        If your legal name is different (or longer), correct it here.
                    </div>
                {/if}
            </div>

            <div class="input-container">
                <input data-testid="input-identifier" name="account-id" type="text" pattern="\d*" on:invalid={setCustomMessage} bind:value={credentials.ssn} required on:focus={handleAccountFocus} on:blur={handleBlur} />
                <span class="floating-label">Your SSN (Social Security Number)</span>
            </div>
            <div class="input-container">
                <input type="date" bind:value={credentials.birthday} on:change={handleDateChange} required>
                <span class="floating-label">Your Birthday</span>
            </div>
            <button data-testid="btn-connect" type="submit">Connect</button>
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

  .text-with-icon {
    display: flex;
    align-items: center; /* This ensures the icon and text are aligned at their centers */
    gap: 0.5rem; /* Optional: adds some space between the icon and the text */
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

  input[type="date"] ~ .floating-label {
      top: 0px;
      left: 12px;
      bottom: 0px;
      font-size: 10px;
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

  .progress-bar {
      height: 100%;
      background-color: mediumblue; /* Color of the progress */
  }

</style>
