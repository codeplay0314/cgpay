import { Given, When, Then } from '@cucumber/cucumber'
import t from '../support/support.js'
import w from '../support/world.js'
import { assert, expect } from 'chai'

Given('I use {string} on an {string} device', async function (browser, sys) { await t.setUA(browser, sys) })
Given('this {string}:', async function (k, rows) { await t.setThese(k, rows, 1) })
Given('these {string}:', async function (k, rows) { await t.setThese(k, rows) })

When('I run the app', async function () { await t.visit('') })
When('I visit {string}', async function (site) { await t.visit(site) })
When('I click {string}', async function(testId) { await w.page.click(t.sel(testId)) })
When('I scan {string}', async function (qr) { await t.putv('qr', qr); await t.visit('charge'); await t.visit('charge') })
When('I type {string} in the {string} field', async function (text, inputId) { await t.input(inputId, text)})

Then('? this {string}:', async function (k, rows) { await t.testThese(k, rows, 1) })
Then('? these {string}:', async function (k, rows) { await t.testThese(k, rows) })
Then('? I am on page {string}', async function (page) { await t.onPage(page) })
Then('? I see installation instructions for {string}', async function (testId) { await t.see(testId + '-instructions') })
Then('? I see {string}', async function (testId) { await t.see(testId) })
Then('? I see {string} is {string}', async function (testId, want) { await t.seeIs(testId, want) })
Then('? I see this error: {string}', async function (msg) { await t.seeIs('messageText', msg, 'part') }) // eventually handle differently: error/alert/confirmation
Then('? I see this confirmation: {string}', async function (msg) { await t.seeIs('messageText', msg, 'part') })
Then('? I see this alert: {string}', async function (msg) { await t.seeIs('messageText', msg, 'part') })