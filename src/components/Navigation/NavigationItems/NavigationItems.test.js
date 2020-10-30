import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import Navigationitem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

//you will see this in console output
describe('<NavigationItems />', () => {
    it('should render two <Navigationitem/> elements if not authenticated', () => {
        //actual testing logic
        const wrapper = shallow(<NavigationItems />);

        //expectations:
        expect(wrapper.find(Navigationitem)).toHaveLength(2);
    });
});

