import {TestHelper} from "./helper.test";

var helper = new TestHelper();
describe("Test cases for Share or Hear", () => {
    it("tests share page form UI validation", ()=> {
        cy.visit("http://localhost:4200/share")
        helper.testRequired('title')
        helper.testRequired('story')
        helper.testRequired('tags')
    })

    it("tests edit page form UI validation ", () => {
        cy.visit("http://localhost:4200/edit");
        helper.testRequired('storyID');
        helper.testRequired('storyCode');
    })
}) 