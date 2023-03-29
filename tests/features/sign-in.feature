@all @signin
Feature: Sign In
  As a vendor or individual
  I can sign in to the CGPay app
  So that I can use it to pay and charge other users.

Background:
  When I visit "sign-in"

Rule: Users have options to sign in, sign up, or reset password -- all on one page

Scenario: A user visits the Sign-in page
  Then ? I see "btn-signin"
  And ? I see "btn-signup"
  And ? I see "reset-pw"

Scenario: A user with one account signs in
  When I input "d" as "identifier"
  And I input "k" as "password"
  And I click "btn-signin"
  Then ? I am on page "home"
  And ? this "myAccount":
  | accountId | deviceId | name     | qr | isCo  | selling | lastTx |
  | K6VMDJL   | devD     | Dee Four | ?  | false | null    | null   |
