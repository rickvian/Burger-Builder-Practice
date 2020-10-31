import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

//you will see this in console output
describe('<NavigationItems />', () => {
    let wrapper;

    //will execute berfore each test
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })

    //it is alias of test()
    it('should render two <Navigationitem/> elements if NOT authenticated', () => {
        //expectations:
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render two <Navigationitem/> elements if authenticated', () => {
        //actual testing logic
        wrapper.setProps({ isAuthenticated: true });
        //expectations:
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    //it is alias of test()
    it('should an exact logout button', () => {
        //actual testing logic
        wrapper.setProps({ isAuthenticated: true });
        //bug,... need solution
        const testcomponent = (<NavigationItem link="/logout">Logout</NavigationItem>);
        expect(wrapper.contains(testcomponent)).toEqual(true);
    });
});

