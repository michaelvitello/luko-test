import React from 'react'
import renderer from 'react-test-renderer'
import Tile from '../Tile'

test('renders Tile correctly', () => {
    const tree = renderer.create(<Tile />).toJSON()
    expect(tree).toMatchSnapshot()
})
