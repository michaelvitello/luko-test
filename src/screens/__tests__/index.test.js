import React from 'react'
import renderer from 'react-test-renderer'
import AddItemScreen from '../AddItemScreen'

test('renders AddItemScreen correctly', () => {
    const tree = renderer.create(<AddItemScreen />).toJSON()
    expect(tree).toMatchSnapshot()
})


