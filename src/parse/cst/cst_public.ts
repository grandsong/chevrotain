import {IToken} from "../../scan/tokens_public"
import {Parser} from "../parser_public"
import {values} from "../../utils/utils"

export type CstElement = IToken | CstNode
export type CstChildrenDictionary = { [identifier:string]:CstElement[] }

/**
 * A Concrete Syntax Tree Node.
 * This structure represents the whole parse tree of the grammar
 * This means that information on each and every Token is present.
 * This is unlike an AST (Abstract Syntax Tree) where some of the syntactic information is missing.
 *
 * For example given an ECMAScript grammar, an AST would normally not contain information on the location
 * of Commas, Semi colons, redundant parenthesis ect, however a CST would have that information.
 */
export interface CstNode {
    readonly name:string

    readonly children:CstChildrenDictionary

    readonly recoveredNode?:boolean
}

export interface ICstVisitor<IN, OUT> {
    visit(cstNode:IN):OUT
}

export class CstVisitor<IN, OUT> implements ICstVisitor {


    constructor(parser:Parser) {
        // TODO: create visitYYY methods
    }

    visit(node:CstNode, param:IN):OUT {
        let children = values(node)
        for(let i = 0; i < children.length; i++) {
            let currChild = children[i]
            // distinction between Tokens Children and CstNode children
            if (currChild.tokenType !== undefined) {
                // TODO: wrong case, need faster map too
                this["visit" + currChild.name](currChild.children)
            }
        }
    }
}



