<script>
    import u from '#utils.js'
    import cgLogo from '#modules/assets/cg-logo-300.png?webp'

    import Accordion from './Accordion.svelte'
    import SlidingModal from "#modules/SlidingModal.svelte";
    import StepsLeft from "#modules/StepsLeft.svelte";
    import BackIcon from "svelte-material-icons/ChevronLeft.svelte"
    import HelpBoxIcon from "svelte-material-icons/HelpBox.svelte"

    let showModal = false; // This variable controls the visibility of the modal

    const contentMap = {
        default: ` <p>By opening an account, you are joining a partnership to create a Common Good Economy based on the Common Good Agreement.
               </p>`,
        member: `<p>A <b>Member</b> is any individual person who has signed this Agreement and has an active Common Good account.</p>`,
        memberOrganization: `<p>A <b>Member Organization</b> is any group, organization, or business that has signed this Agreement and has an active Common Good account.</p>`,
        cgc: `<p>A <b>Common Good Community</b> is a group of Members and Member Organizations in a particular geographic region, defined (by the Members there) by a set of zip codes. The purpose of the Common Good system is to create and fund community-centered participatory democracy. In a Common Good Community you decide together how much Common Good credit to issue (within safe limits) and what to fund with it.</p>
        <p>There are no specific requirements for a group of members to become a sovereign Common Good Community. But <a href="https://docs.google.com/document/d/1-lBTNHTxIPrTSrIK18ZdbcMeEPS5g5jFhST34VGkR8E" tabindex="-1" target="_blank" rel="noreferrer noopener">these Clearness Questions</a> will help you get ready for that responsibility.</p>`,
        dollarPoll: `<p><b>Dollar Pool.</b> A bank account, owned by your Common Good Community. When you buy Common Good credit by transferring funds from your bank account to your Common Good account, your Dollars go into the Dollar Pool and the system gives you that amount of Common Good credit. You can then use your credit to buy something from a participating business by presenting your member QR Code. You can also pay someone online by clicking a "Pay With Common Good" button on a website. Or sign in at CommonGood.earth and click "Pay" on the menu. Meanwhile, just as a bank can invest the money in your checking account, you and your Common Good Community can use the money in the Dollar Pool to invest in worthwhile projects for the community and the common good.</p>`,
        backed: `<p><b>Backed.</b> Backing [a Common Good Community] is a promise, made by supportive members and member organizations one year at a time, to buy additional Common Good credit in the event of a cash crunch or termination of the Common Good Community. These promises give you the security of knowing your Common Good credit is backed by Dollars held in the Dollar Pool and/or by promises, helping prevent the sort of panic that can lead to a cash crunch. Backing Promises are a key component of taking responsibility and control of our own local economy.</p>
        <p>The promise you make in the Common Good Agreement is also a sort of Backing Promise. When you pay someone more than is in your Common Good account balance, that extra Common Good credit is backed by your promise to bring your balance back up to zero or more within 30 days.</p>`,
        withoutLimit: `<p><b>Without limit or surcharge.</b> As part of the Common Good Agreement, you promise to accept Common Good payments "without limit or surcharge".</p>
    <p><i><span style="color: blue;">"Without limit"</span></i> means you will not tell a customer they have to use cash, credit card, or check to pay part of what they owe you. </p>
    <p><i><span style="color: blue;">"Without surcharge"</span></i> means you will charge the same amount as for other payment methods, unless you choose to give a discount for Common Good payments.</p>`,
        disputes: `<p><b>Disputes.</b> We expect Members will generally resolve disputes amicably, but in the event a more formal resolution is needed, you agree to follow <a href="https://new.commongood.earth/help/dispute-resolution-process" tabindex="-1">this process</a>.</p>`,
        participate: `<p>You will have the <b>opportunity to participate</b> in any decision to change the Common Good Agreement. This means you will receive an email invitation to attend discussions of any proposed change. And you will have an equal vote with all other Members on any such proposal that comes to a vote. You and other Members have a responsibility to all Members of your Common Good Community to encourage participation, to value the wisdom of each individual, and to be as inclusive as possible in all stages of the democratic process.</p>`,
    };

    let modalContent = contentMap.default;

    function toggleModal(key) {
        modalContent = contentMap[key]; // Set the HTML content using the key
        console.log(modalContent);
        showModal = !showModal;
    }

</script>

<svelte:head>
    <title>CGPay - Agreement</title>
</svelte:head>

<section class="page card" id="country-select">

    <div class="progress-container">
        <div class="progress-bar" style="width: 27%"></div>
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
                <span> Common Good Agreement</span>
                <span class="show-note-link" on:click={() => toggleModal('default')}>
                  <HelpBoxIcon />
                </span>
            </div>

        </h2>
        <strong><span style="color: red; font-size: 10px">Please actually read it, so you know what you're agreeing to. It's short.</span></strong>


        <div id="accordionContainer">
            <Accordion open="true">
                <span slot="head">1. Who</span>
                <div slot="details">
                    <p>I make this agreement with all Common Good <span on:click={() => toggleModal('member')} class="link">Members</span> and <span on:click={() => toggleModal('memberOrganization')} class="link">Member Organizations</span> everywhere — especially with Members and Member Organizations in my
                        <span on:click={() => toggleModal('cgc')} class="link">Common Good Community</span></p>
                </div>
            </Accordion>
            <Accordion open="true">
                <span slot="head">2. Community control</span>
                <div slot="details">
                    <p>I understand we can use the Common Good System, as a democratic community,
                        to reclaim control of our local economy for the common good. I am willing
                        to participate with other Members to do that, and to support other communities to do the same.</p>
                </div>
            </Accordion>

            <Accordion open="true">
                <span slot="head">3. Investing together</span>
                <div slot="details">
                    <p> I understand whenever I put money in my Common Good account, there is more money in
                        the <span on:click={() => toggleModal('dollarPoll')} class="link">Dollar Pool</span>,
                        so my community has more money to invest while I use my Common Good credit for purchases.</p>
                </div>
            </Accordion>

            <Accordion open="true">
                <span slot="head">4. Backing together</span>
                <div slot="details">
                    <p> I understand my Common Good credit is <span on:click={() => toggleModal('backed')} class="link">backed</span> 100% or more — partly by money in the Dollar Pool and partly by Members and Member Organizations.</p>
                </div>
            </Accordion>

            <Accordion open="true">
                <span slot="head">5. Accepting payments</span>
                <div slot="details">
                    <p>I will accept Common Good credit as payment, <span on:click={() => toggleModal('withoutLimit')} class="link">without limit or surcharge</span>.</p>
                </div>
            </Accordion>
            <Accordion open="true">
                <span slot="head">6. Account Balance</span>
                <div slot="details">
                    <p>If I spend more than the balance in my Common Good account, resulting in a negative balance, I will bring my balance up to zero or more within 30 days.</p>
                </div>
            </Accordion>
            <Accordion open="true">
                <span slot="head">6. Account Balance</span>
                <div slot="details">
                    <p>If I spend more than the balance in my Common Good account, resulting in a negative balance, I will bring my balance up to zero or more within 30 days.</p>
                </div>
            </Accordion>
            <Accordion open="true">
                <span slot="head">7. Disputes</span>
                <div slot="details">
                    <p>When there is a dispute, I will follow the <span on:click={() => toggleModal('disputes')} class="link">Common Good Dispute Resolution Process</span> and will honor its outcome.</p>
                </div>
            </Accordion>
            <Accordion open="true">
                <span slot="head">8. Changes</span>
                <div slot="details">
                    <p>I understand I will have the <span on:click={() => toggleModal('participate')} class="link">opportunity to participate</span> in any decision to change this Agreement, and if I use my account after changes have been approved, that means I agree to those changes.</p>
                </div>
            </Accordion>
        </div>
        <SlidingModal bind:showModal>
            <div>{@html modalContent}</div>
        </SlidingModal>

        <button type="button" on:click="{() => u.go('verify-identity')}">I Agree</button>

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
  .link {
    color: blue;
    cursor: pointer;
    text-decoration: underline;
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
    z-index: 100;
    padding: 10px;
    border-radius: 5px;
    margin-top: -16px; /* Adds a small space between the input and the box */
  }

  /* Basic styling for the accordion container */
  #accordionContainer {
    width: 100%; /* Full width on smaller screens */
    min-width: 300px; /* Prevents the container from becoming too narrow */
    margin: 5px; /* Centers the container if its width is less than the parent's width */
    padding: 20px;
  }

  /* Responsive adjustments */
  @media (min-width: 600px) {
    #accordionContainer {
      width: 80%; /* Adjusts width for medium screens */
    }
  }

  @media (min-width: 1024px) {
    #accordionContainer {
      width: 80%; /* Ideal width for large screens */
    }
  }

  /* Styling for each accordion header and details */
  #accordionContainer .header, #accordionContainer .details {
    padding: 15px;
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
