import React from '../core/React.js'
import {it, expect, describe} from 'vitest'

describe('createElement', () => {
  it('createElement', () => {
    const el = React.createElement('div', { id: 'createElement', class: 'text-red' }, 'mini-react', '!!!')
    expect(el).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "mini-react",
              },
              "type": "TEXT_ELEMENT",
            },
            {
              "props": {
                "children": [],
                "nodeValue": "!!!",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
          "class": "text-red",
          "id": "createElement",
        },
        "type": "div",
      }
    `)
  })
})
