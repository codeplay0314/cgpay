<script>
  import st from'#store.js'
  import u from '#utils.js'
  import cgLogo from '#modules/assets/cg-logo-300.png?webp'
  import StepsLeft from "#modules/StepsLeft.svelte";

  import BackIcon from "svelte-material-icons/ChevronLeft.svelte"
  import { physicalAddress } from '#store.js';
  import Range from "./Range.svelte"

  let value = 42;
  let theme = "default";

  let formValues = $physicalAddress;

  // let physicalAddress = {
  //   streetAddress: '',
  //   city: '',
  //   state: '',
  //   country: '',
  //   postalCode: '',
  //   rentOrOwn: '',
  //   howLongYears: '',
  //   howLongMonths: '',
  // };
  let statusMsg = '';

  async function submitPhysicalAddress() {
    physicalAddress.set(formValues);
    u.go('mailing-address');
  }
</script>

<svelte:head>
  <title>CGPay - Contact Information</title>
</svelte:head>

<section class="page card" id="contact-info">

  <div class="progress-container">
    <div class="progress-bar" style="width: 49%"></div>
  </div>

  <header style=" align-items: left" >
    <button data-testid="btn-nav" class="back-button" aria-label="Go back" on:click={u.goBack} >
      <BackIcon width={'100%'} height={'100%'} color={'gray'}/>
    </button>
    <img src="{cgLogo}" alt="Common Good Logo" style="margin-top: -50px">
    <h1 style="margin-top: -50px">CGPay{u.realData() ? '' : ' DEMO'}</h1>
  </header>

  <div class='content'>
    <h2>Physical Address</h2>
    <form on:submit|preventDefault={submitPhysicalAddress}>
      <fieldset>
        <div class="input-container">
          <input type="text" id="street" bind:value={formValues.streetAddress} required />
          <span class="floating-label">Street Address</span>
        </div>
        <div class="input-container">
          <input type="text" id="city"bind:value={formValues.city} required />
          <span class="floating-label">City</span>
        </div>

        <div class="input-container">
          <input type="text" id="postal_code" bind:value={formValues.postalCode} required />
          <span class="floating-label">Postal Code</span>
        </div>

        <div class="input-container">
          <label>State</label>
          <select id="state" bind:value={formValues.state}>
            <option value="" disabled>Select state</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>

        </div>
        <label>Rent or Own</label>
        <select id="country" bind:value={formValues.rentOrOwn} required>
          <option value="RENT">Rent</option>
          <option value="OWN">Own</option>
        </select>


        <p class="address-duration"><b>How long have you been at your current address (roughly):</b></p>
        <div class:purple-theme={theme === "purple"}>
          <p>{formValues.howLongYears} Years</p>
          <Range bind:value={formValues.howLongYears} />
        </div>
        <span class="and-text"><b>and</b></span>
        <div class:purple-theme={theme === "purple"}>
          <p>{formValues.howLongMonths} Months</p>
          <Range bind:value={formValues.howLongMonths}
                 max={12} />
        </div>

<!--        <input type="number" id="years" name="years" placeholder="Years" bind:value={formValues.howLongYears} required />-->
<!--        <input type="number" id="months" name="months" placeholder="Months" bind:value={formValues.howLongMonths} required />-->
      </fieldset>
      <div class="slider-container">
        <button type="submit">Next</button>
      </div>
      <p class="status">{statusMsg}</p>
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

  input[type="range"] {
    width: 100%; /* Adjust based on your design */
  }

  output {
    margin-left: 10px;
  }

  .address-duration {
    margin-top: 20px
    margin-bottom: 15px;
  }

  .slider-container {
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .and-text {
    display: block;
    text-align: center;
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
