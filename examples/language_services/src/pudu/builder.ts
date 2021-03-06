import {ParseTree} from "./parse_tree"
import * as utils from "./utils"
import {Token, tokenMatcher, TokenConstructor} from "chevrotain"
import * as _ from "lodash"
import {} from "../../../../src/scan/lexer_public"

export interface IMatchCase {
    CASE:any, // a Token Constructor
    THEN:Function  // The Action to perform
}

export function MATCH_CHILDREN(root:ParseTree, ...cases:IMatchCase[]):void {

    _.forEach(root.children, (currChild) => {
        let matchingCase = _.find(cases,
            (currCase) => {
                return currChild.payload instanceof currCase.CASE ||
                    tokenMatcher(currChild.payload, currCase.CASE)
            })

        if (_.isUndefined(matchingCase)) {
            let childClassName = utils.getClassNameFromInstance(currChild)
            throw Error(`non exhaustive match, no case for <${childClassName}>`)
        }
        matchingCase.THEN.call(null, currChild)
    })
}

export function buildSyntaxBox(tree:ParseTree):Token[] {
    return _.map(tree.children, (subtree) => subtree.payload)
}
